-- Fix the function search path security issue
CREATE OR REPLACE FUNCTION public.activate_car_after_payment()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
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
$$;