import React, { createContext, useState } from "react";

export const CommonContext = createContext();

export const CommonContextProvider = ({ children }) => {
  const [type, setType] = useState("income");
  const [data, setData] = useState(null);
  const [open, setOpen] = useState(false);
  const [isFormEdit, setIsFormEdit] = useState(false);

  return (
    <CommonContext.Provider
      value={{
        type,
        setType,
        data,
        setData,
        open,
        setOpen,
        isFormEdit,
        setIsFormEdit,
      }}
    >
      {children}
    </CommonContext.Provider>
  );
};
