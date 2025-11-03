import { useRef, useState, useEffect } from "react";
import { Position } from "../types";
import { setPosition, workingKeys } from "@/app/utils/setPosition";
import { setHighScore } from "@/app/api/setHighscore";
import { GameOver } from "./GameOver";
import { useObstacles } from "../hooks";
import { createRandomPosition } from "@/app/utils/createRandomPosition";

interface GameProps {
  setGameStarted: (started: boolean) => void;
  username: string;
}

export const Game = ({ setGameStarted, username }: GameProps) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState(0);
  const [candies, setCandies] = useState<Position[]>([]);
  const pixel = (size - 2 * 4) / 20;
  const [snakePosition, setSnakePosition] = useState<Position>({ x: 0, y: 0 });
  const snakePositionRef = useRef<Position>(snakePosition);
  const [snakeTail, setSnakeTail] = useState<Position[]>([]);
  const direction = useRef<KeyboardEvent["key"]>("ArrowRight");
  const directionPrev = useRef<KeyboardEvent["key"]>("ArrowRight");
  const [isGameOver, setGameOvere] = useState(false);
  const { obstacles } = useObstacles(snakePositionRef);

  const onKeyDown = (event: KeyboardEvent) => {
    if (workingKeys.includes(event.key)) {
      directionPrev.current = direction.current;
      direction.current = event.key;
    }
  };

  useEffect(() => {
    const eatenCandyIndex = candies.findIndex(
      (candy) => candy.x === snakePosition.x && candy.y === snakePosition.y
    );
    if (eatenCandyIndex !== -1) {
      setCandies((prevState) =>
        prevState.filter((_, index) => index !== eatenCandyIndex)
      );
      setSnakeTail((prevState) => [
        ...prevState,
        { x: snakePosition.x, y: snakePosition.y },
      ]);
    } else {
      setSnakeTail((prevState) => [...prevState.slice(1), snakePosition]);
    }
    if (
      snakeTail.some(
        (tail) => tail.x === snakePosition.x && tail.y === snakePosition.y
      ) ||
      obstacles.some(
        (obstacle) =>
          obstacle.position.x === snakePosition.x &&
          obstacle.position.y === snakePosition.y
      )
    ) {
      setHighScore({ username, score: snakeTail.length * 100 });
      setGameOvere(true);
    }
  }, [snakePosition]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition(direction, setSnakePosition, directionPrev, snakePositionRef);
    }, 200 - snakeTail.length * 2);

    const intervalCandies = setInterval(() => {
      setCandies((prevState) => [...prevState, createRandomPosition()]);
    }, 500 + snakeTail.length * 10);
    return () => {
      clearInterval(interval);
      clearInterval(intervalCandies);
    };
  }, [pixel, snakeTail.length]);

  useEffect(() => {
    if (divRef.current) {
      // Access the DOM node and get its clientHeight
      const shouldUseHeight =
        divRef.current.clientWidth > divRef.current.clientHeight;

      setSize(
        shouldUseHeight
          ? divRef.current.clientHeight
          : divRef.current.clientWidth
      );
    }
    window.addEventListener("keydown", onKeyDown);

    // Clean up the listeners when the component unmounts
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []); // The empty dependency array ensures this runs once after the initial render

  if (isGameOver) {
    return (
      <GameOver
        setGameStarted={setGameStarted}
        score={snakeTail.length * 100}
      />
    );
  }

  return (
    <div className="flex-1 flex m-4" ref={divRef}>
      <div
        className="items-center justify-center border-red-100 border-4 ml-auto mr-auto relative"
        style={{ width: size, height: size }}
      >
        {candies.map((candy, index) => (
          <div
            className="bg-green-300 absolute"
            key={"candy" + index}
            style={{
              height: pixel,
              width: pixel,
              top: candy.x * pixel,
              left: candy.y * pixel,
            }}
          />
        ))}

        {obstacles.map((obstacle, index) => (
          <div
            className="bg-red-300 absolute"
            key={"obstacle" + index}
            style={{
              height: pixel,
              width: pixel,
              top: obstacle.position.x * pixel,
              left: obstacle.position.y * pixel,
            }}
          />
        ))}

        <div
          className="bg-black absolute"
          style={{
            height: pixel,
            width: pixel,
            top: snakePosition.x * pixel,
            left: snakePosition.y * pixel,
          }}
        />
        {snakeTail.map((tail, index) => (
          <div
            className="bg-black absolute"
            key={"tail" + index}
            style={{
              height: pixel,
              width: pixel,
              top: tail.x * pixel,
              left: tail.y * pixel,
            }}
          />
        ))}
      </div>
    </div>
  );
};
