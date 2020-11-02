import { createContext } from "react";

const userContext = createContext({ accessCode: "", setAccessCode: () => {} }); // Create a context object

export {
  userContext, // Export it so it can be used by other Components
};
