
-- 1. Profiles: restrict SELECT
DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON public.profiles;
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all profiles"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));

-- 2. Wallet transactions: require wallet ownership on INSERT
DROP POLICY IF EXISTS "Users insert own wallet txns" ON public.wallet_transactions;
CREATE POLICY "Users insert own wallet txns"
  ON public.wallet_transactions FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = user_id
    AND EXISTS (
      SELECT 1 FROM public.wallets w
      WHERE w.id = wallet_id AND w.user_id = auth.uid()
    )
  );

-- 3. Wallets: prevent users from editing sensitive columns directly
REVOKE UPDATE ON public.wallets FROM authenticated, anon, PUBLIC;
GRANT UPDATE (bank_holder_name, bank_account_last4, bank_name, is_connected, connected_at, updated_at)
  ON public.wallets TO authenticated;

-- 4. Restrict SECURITY DEFINER has_role execution
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO authenticated, service_role;
