import { User } from "firebase/auth";

export const getLoggedInUser = (): User | null => {
  console.log("typeof window", typeof window);
  if (typeof window !== "undefined") {
    const stringifiedUser = localStorage.getItem("loggedInUser");
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
