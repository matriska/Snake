import { HIGH_SCORE_KEY } from "@/app/constants/index";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "@/app/firebase";
import { HighScoreEntry } from "../types";

export const getHighscore = async () => {
  try {
    const scoresRef = collection(db, HIGH_SCORE_KEY);
    const q = query(scoresRef, orderBy("score", "desc"), limit(5));
    const querySnapshot = await getDocs(q);
    const fetchedData = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    console.log("fetchedData", fetchedData);
    return fetchedData as unknown as HighScoreEntry[];
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
};
