/*
  # Fix CSRF Token Generation Function

  1. Problem
    - The `generate_csrf_token()` function fails with error:
      "function gen_random_bytes(integer) does not exist"
    - Root cause: Function uses `SET search_path TO 'public'` which prevents
      accessing `gen_random_bytes()` from the `extensions` schema where
      `pgcrypto` extension is installed

  2. Solution
    - Use fully qualified function name: `extensions.gen_random_bytes()`
    - This explicitly references the function from the correct schema

  3. Impact
    - Fixes Free Score form CSRF token generation
    - No data changes - only function definition updated
*/

-- Drop and recreate the function with correct pgcrypto reference
CREATE OR REPLACE FUNCTION public.generate_csrf_token(p_ip inet DEFAULT NULL)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_token text;
BEGIN
  -- Use fully qualified function name from extensions schema
  v_token := encode(extensions.gen_random_bytes(32), 'hex');
  
  INSERT INTO csrf_tokens (token, ip_address)
  VALUES (v_token, p_ip);
  
  RETURN v_token;
END;
$$;