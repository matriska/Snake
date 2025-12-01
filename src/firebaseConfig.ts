// src/firebaseConfig.js
import { getAuth } from "firebase/auth";
import { firebasApp } from "./app/firebase";

// Inicializácia
// Export Auth služby
export const auth = getAuth(firebasApp);
