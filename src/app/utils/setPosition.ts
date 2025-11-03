import { Dispatch, RefObject, SetStateAction } from "react";
import { Position } from "../types";

const OPPOSITE_DIRECTIONS: { [key: string]: string } = {
  ArrowUp: "ArrowDown",
  ArrowDown: "ArrowUp",
  ArrowLeft: "ArrowRight",
  ArrowRight: "ArrowLeft",
};
export const workingKeys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
export const setPosition = (
  direction: RefObject<string>,
  setSnakePosition: Dispatch<SetStateAction<Position>>,
  directionPrev: RefObject<string>,
  snakePositionRef: RefObject<Position>
) => {
  if (OPPOSITE_DIRECTIONS[direction.current] === directionPrev.current) {
    direction.current = directionPrev.current;
  }

  switch (direction.current) {
    case "ArrowUp":
      setSnakePosition((prevState) => {
        const newState = {
          x: Math.max(0, prevState.x - 1),
          y: prevState.y,
        };
        snakePositionRef.current = newState;
        return newState;
      });
      break;
    case "ArrowDown":
      setSnakePosition((prevState) => {
        const newState = {
          x: Math.min(19, prevState.x + 1),
          y: prevState.y,
        };
        snakePositionRef.current = newState;
        return newState;
      });
      break;
    case "ArrowLeft":
      setSnakePosition((prevState) => {
        const newState = {
          x: prevState.x,
          y: Math.max(0, prevState.y - 1),
        };
        snakePositionRef.current = newState;
        return newState;
      });
      break;
    case "ArrowRight":
      setSnakePosition((prevState) => {
        const newState = {
          x: prevState.x,
          y: Math.min(19, prevState.y + 1),
        };
        snakePositionRef.current = newState;
        return newState;
      });
      break;
  }
};
