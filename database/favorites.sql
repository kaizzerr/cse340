CREATE TABLE public.favorites (
  favorite_id SERIAL PRIMARY KEY,
  account_id INTEGER NOT NULL REFERENCES public.account(account_id) ON DELETE CASCADE,
  inv_id INTEGER NOT NULL REFERENCES public.inventory(inv_id) ON DELETE CASCADE,
  CONSTRAINT unique_account_vehicle UNIQUE (account_id, inv_id)
);