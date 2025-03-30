"use client";
import { createContext, useState, useContext } from "react";
import { ReactNode } from "react";
// Create Context
interface MessageContextType {
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
}

const MessageContext = createContext<MessageContextType>({
  message: "",
  setMessage: () => {},
});

// Provider Component

export const GeminiOutputContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [message, setMessage] = useState("");

  return (
    <MessageContext.Provider value={{ message, setMessage }}>
      {children}
    </MessageContext.Provider>
  );
};

export const useMessage = (p0: string) => useContext(MessageContext);
