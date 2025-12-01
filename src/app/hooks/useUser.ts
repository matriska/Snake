import { useEffect, useState } from "react";
import { getLoggedInUser } from "../utils/getLoggedInUser";
import { User } from "firebase/auth";

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const user = getLoggedInUser();
    setUser(user);
  }, []);
  return user;
};
