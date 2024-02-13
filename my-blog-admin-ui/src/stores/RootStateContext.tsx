import React from "react";
import { AuthStore } from "./auth/authStore";
import { CategoryStore } from "./category/categoryStore";

type RootStateContextValue = {
  authStore: AuthStore;
  categoryStore: CategoryStore;
};

const RootStateContext = React.createContext<RootStateContextValue>(
  {} as RootStateContextValue
);
const authStore = new AuthStore();
const categoryStore = new CategoryStore();

export const RootStateProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  return (
    <RootStateContext.Provider value={{ authStore, categoryStore }}>
      {children}
    </RootStateContext.Provider>
  );
};

export const useRootStore = () => React.useContext(RootStateContext);
