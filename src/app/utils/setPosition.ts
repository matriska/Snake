import { Dispatch, RefObject, SetStateAction } from "react";
import { Position } from "../types";

const OPPOSITE_DIRECTIONS: { [key: string]: string } = {
  ArrowUp: "ArrowDown",
  ArrowDown: "ArrowUp",
  ArrowLeft: "ArrowRight",
  ArrowRight: "ArrowLeft",
};

export const setPosition = (
  direction: RefObject<string>,
  setSnakePosition: Dispatch<SetStateAction<Position>>,
  directionPrev: RefObject<string>
) => {
  if (OPPOSITE_DIRECTIONS[direction.current] === directionPrev.current) {
    direction.current = directionPrev.current;
  }

  switch (direction.current) {
    case "ArrowUp":
      setSnakePosition((prevState) => ({
        x: Math.max(0, prevState.x - 1),
        y: prevState.y,
      }));
      break;
    case "ArrowDown":
      setSnakePosition((prevState) => ({
        x: Math.min(19, prevState.x + 1),
        y: prevState.y,
      }));
      break;
    case "ArrowLeft":
      setSnakePosition((prevState) => ({
        x: prevState.x,
        y: Math.max(0, prevState.y - 1),
      }));
      break;
    case "ArrowRight":
      setSnakePosition((prevState) => ({
        x: prevState.x,
        y: Math.min(19, prevState.y + 1),
      }));
      break;
  }
};
