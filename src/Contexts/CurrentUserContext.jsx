import React, { createContext, useState } from "react";

export const CurrentUserContext = createContext();

export const CurrentUserProvider = ({ children, currentUserProps }) => {
  return (
    <CurrentUserContext.Provider value={currentUserProps}>
      {children}
    </CurrentUserContext.Provider>
  );
};
