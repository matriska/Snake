import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import { HighScoreEntry } from "../types";
import { HIGH_SCORE_KEY } from "@/app/constants/index";

export const setHighScore = async (newData: HighScoreEntry) => {
  try {
    await addDoc(collection(db, HIGH_SCORE_KEY), newData);
    return true;
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};
