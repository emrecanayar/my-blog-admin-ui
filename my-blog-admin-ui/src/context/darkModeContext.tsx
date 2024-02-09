// DarkModeContext.tsx
import React, { createContext, useReducer, ReactNode, Dispatch } from 'react';
import DarkModeReducer, { State, Action } from './darkModeReducer';

const INITIAL_STATE: State = {
  darkMode: false,
};

type DarkModeContextType = {
  state: State;
  dispatch: Dispatch<Action>;
};

export const DarkModeContext = createContext<DarkModeContextType | undefined>(undefined);

interface DarkModeContextProviderProps {
  children: ReactNode;
}

export const DarkModeContextProvider: React.FC<DarkModeContextProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(DarkModeReducer, INITIAL_STATE);

  return <DarkModeContext.Provider value={{ state, dispatch }}>{children}</DarkModeContext.Provider>;
};
