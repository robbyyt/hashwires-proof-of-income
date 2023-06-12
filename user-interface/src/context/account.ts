import { createContext, useContext, Dispatch } from 'react';

export const POSSIBLE_ACCOUNTS = [
  'Alice',
  'Bob',
] as const;

export type TAccount = typeof POSSIBLE_ACCOUNTS[number]

type TAccountContext = {
  account: TAccount;
  setAccount: Dispatch<TAccount>
}; 

export const AccountContext = createContext<TAccountContext>({
  account: 'Bob',
  setAccount: (value) => { console.log(`setAccount called with ${value}`) }
});

export const useAccountContext = () => useContext(AccountContext);
