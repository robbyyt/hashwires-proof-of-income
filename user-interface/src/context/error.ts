import { Dispatch, createContext, useContext } from 'react';

type ErrorContext = { 
  error: Error | null;
  setError: Dispatch<Error | null>
};

export const ErrorContext = createContext<ErrorContext>({error: null, setError: () => { console.log('Tried to set errors') }});

export const useError = () => useContext(ErrorContext);