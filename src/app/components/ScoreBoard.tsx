import { useEffect, useState } from "react";
import { getHighscore } from "@/app/api/getHighscore";

export const ScoreBoard = () => {
  const [highScore, setHighScore] = useState<
    { username: string; score: number }[]
  >([]);
  useEffect(() => {
    getHighscore().then((data) => {
      if (data) {
        setHighScore(data);
      }
    });
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold">High Scores</h2>
      <div className="flex flex-col gap-2">
        {highScore.map((el, ind) => (
          <div className="flex-row" key={ind}>
            {el.username} - {el.score}
          </div>
        ))}
      </div>
    </div>
  );
};
