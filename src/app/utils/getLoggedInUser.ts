import { User } from "firebase/auth";
import { PERSIST_USER_KEY } from "@/app/constants/index";

export const getLoggedInUser = (): User | null => {
  console.log("typeof window", typeof window);
  if (typeof window !== "undefined") {
    const stringifiedUser = localStorage.getItem(PERSIST_USER_KEY);
    console.log("stringifiedUser", stringifiedUser);
    if (stringifiedUser) {
      const user: User = JSON.parse(stringifiedUser);
      console.log(
        "✅ Načítaný prihlásený používateľ z Local Storage:",
        user.displayName
      );
      return user;
    }
    return null;
  }
  return null;
};
