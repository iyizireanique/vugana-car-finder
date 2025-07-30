-- Make sure cars can be posted as active by default
ALTER TABLE public.cars ALTER COLUMN status SET DEFAULT 'active';

-- Create a function to handle direct posting without payment requirement
CREATE OR REPLACE FUNCTION public.activate_car_after_payment()
RETURNS TRIGGER AS $$
BEGIN
  -- If payment is completed, activate the car
  IF NEW.payment_status = 'completed' AND OLD.payment_status != 'completed' THEN
    UPDATE public.cars
    SET status = 'active'
    WHERE user_id = NEW.user_id
    AND status = 'pending'
    AND created_at >= (NEW.created_at - INTERVAL '1 hour');
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to activate cars when payment is completed
DROP TRIGGER IF EXISTS activate_car_after_payment_trigger ON public.payments;
CREATE TRIGGER activate_car_after_payment_trigger
  AFTER UPDATE ON public.payments
  FOR EACH ROW
  EXECUTE FUNCTION public.activate_car_after_payment();