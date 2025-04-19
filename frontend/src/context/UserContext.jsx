import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userLoaded, setUserLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        console.log("Usuario cargado desde localStorage:", parsedUser);
      }
    } catch (error) {
      console.error("Error al parsear el usuario del localStorage:", error);
      localStorage.removeItem("user"); // limpia si estaba corrupto
    }

    setUserLoaded(true);
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, userLoaded }}>
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => useContext(UserContext);
export { useUser };
