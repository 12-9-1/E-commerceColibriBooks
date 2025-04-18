import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userLoaded, setUserLoaded] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      console.log("Usuario cargado desde localStorage:", JSON.parse(storedUser));  // Verificar que el usuario está cargado
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
