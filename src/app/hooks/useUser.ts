import { useEffect, useState } from "react";
import { getLoggedInUser } from "../utils/getLoggedInUser";
import { User } from "firebase/auth";

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const getPersistedUser = () => {
    const user = getLoggedInUser();
    console.log("🚀 ~ file: useUser.ts:7 ~ useEffect ~ user:", user);
    setUser(user);
  };
  useEffect(() => {
    getPersistedUser();
  }, []);
  return { user, getPersistedUser };
};
