import React, { FC } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  User, // Typ pre Firebase User
} from "firebase/auth";
// Predpokladáme, že auth exportujete s typom Auth z firebaseConfig.ts
import { auth } from "../../firebaseConfig";
import { PERSIST_USER_KEY } from "@/app/constants/index";

// -----------------------------------------------------
// Definícia props pre komponent
// -----------------------------------------------------
interface GoogleSignInButtonProps {
  // Očakávame, že užívateľ bude buď objekt User z Firebase, alebo null
  user: User | null;
  getPersistedUser: () => void;
}

// -----------------------------------------------------
// 1. Prihlasovacia funkcia
// -----------------------------------------------------

// -----------------------------------------------------
// 3. React Funkčný Komponent s typmi
// -----------------------------------------------------
export const GoogleSignInButton: FC<GoogleSignInButtonProps> = ({
  user,
  getPersistedUser,
}) => {
  const signInWithGoogle = async (): Promise<User | null> => {
    const provider = new GoogleAuthProvider();

    try {
      // Vďaka TypeScriptu vieme, že 'auth' má typ Auth
      const result = await signInWithPopup(auth, provider);

      // Result má typ UserCredential
      const user = result.user;

      const userDataString = JSON.stringify(user);

      // 2. Uloženie do Local Storage
      await localStorage.setItem(PERSIST_USER_KEY, userDataString);
      getPersistedUser();
      console.log("✅ Úspešné prihlásenie s Google!", user.displayName);
      return user;
    } catch (error) {
      // TypeScript nám pomáha identifikovať typ chyby
      if (error instanceof Error) {
        console.error("❌ Chyba pri Google prihlásení:", error.message);
      } else {
        console.error("❌ Neznáma chyba pri Google prihlásení:", error);
      }
      return null;
    }
  };

  // -----------------------------------------------------
  // 2. Odhlasovacia funkcia
  // -----------------------------------------------------
  const handleSignOut = async (): Promise<void> => {
    try {
      await signOut(auth); // Vráti Promise<void>
      await localStorage.removeItem(PERSIST_USER_KEY);

      getPersistedUser();
    } catch (error) {
      if (error instanceof Error) {
        console.error("❌ Chyba pri odhlásení:", error.message);
      }
    }
  };

  if (user) {
    // Zobrazenie pre prihláseného používateľa
    return (
      <div>
        {/* Vďaka TS vieme, že user.displayName existuje, alebo je null/undefined */}
        <p>Prihlásený ako: **{user.displayName || user.email}**</p>
        <button
          onClick={handleSignOut}
          style={{
            padding: "10px",
            backgroundColor: "#f44336",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Odhlásiť sa
        </button>
      </div>
    );
  }

  // Zobrazenie pre odhláseného používateľa
  return (
    <button
      onClick={signInWithGoogle}
      style={{
        padding: "10px 15px",
        backgroundColor: "#4285F4",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
      }}
    >
      Prihlásiť sa cez Google
    </button>
  );
};
