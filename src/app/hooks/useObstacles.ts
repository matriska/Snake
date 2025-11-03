import { RefObject, useEffect, useState } from "react";
import { Obstacle, Position } from "@/app/types";
import { createRandomPosition } from "@/app/utils/createRandomPosition";

export const useObstacles = (snakePosition: RefObject<Position>) => {
  const [obstacles, setObstacles] = useState<Obstacle[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newObstacle = {
        position: createPositionNotTooClose(snakePosition),
        timestamp: new Date().toISOString(),
      };
      setObstacles((prevObstacles) => [
        ...filterOldObstacles(prevObstacles),
        newObstacle,
      ]);
    }, 5000); // Add a new obstacle every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return { obstacles };
};

const MAX_AGE_LIMIT = 10000; // Obstacles older than 30 seconds will be removed

const filterOldObstacles = (obstacles: Obstacle[]) => {
  const now = new Date().getTime();
  return obstacles.filter((obstacle) => {
    const obstacleTime = new Date(obstacle.timestamp).getTime();
    return now - obstacleTime <= MAX_AGE_LIMIT;
  });
};

const createPositionNotTooClose = (snakePosition: RefObject<Position>) => {
  const newObstaclePosition = createRandomPosition();
  if (
    Math.abs(newObstaclePosition.x - snakePosition.current!.x) < 3 &&
    Math.abs(newObstaclePosition.y - snakePosition.current!.y) < 3
  ) {
    return createPositionNotTooClose(snakePosition);
  }
  return newObstaclePosition;
};
