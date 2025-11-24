"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { getUser } from "@/helpers/getUser";

const UserContext = createContext<any>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Evitamos ejecutar getUser si estamos en la página de login o registro
    if (window.location.pathname === "/login" || window.location.pathname === "/signup") {
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const data = await getUser();
        setUser(data);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
