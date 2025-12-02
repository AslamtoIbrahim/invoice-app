import { createContext } from "react";

type StatusContextType = {
  status: string;
  setStatus: (value: string) => void;
};

export const StatusContext = createContext<StatusContextType>({
    status: "",
    setStatus: () => {}
})