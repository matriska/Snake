"use client";
import { Game } from "@/app/components/Game";
import { useState } from "react";
import { ScoreBoard } from "@/app/components/ScoreBoard";
import { GoogleSignInButton } from "@/app/components/GoogleSignInButton";
import { useUser } from "@/app/hooks/useUser";

export default function Home() {
  const [gameStarted, setGameStarted] = useState(false);
  const [username, setUsername] = useState("");
  const { user, getPersistedUser } = useUser();

  return (
    <div className="flex flex-col w-full h-screen">
      <h1 className="text-3xl font-bold underline text-center">SNAKE</h1>
      {gameStarted ? (
        <Game
          setGameStarted={setGameStarted}
          username={user?.displayName ?? username}
        />
      ) : (
        <div className="flex-1 flex m-4 justify-center items-center flex-col gap-4">
          <ScoreBoard />
          <input
            placeholder="username"
            className="border rounded p-4 pt-2 pb-2"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></input>
          <GoogleSignInButton {...{ user, getPersistedUser }} />
          <button
            onClick={() => setGameStarted(true)}
            className="p-4 pt-2 pb-2 bg-black border rounded text-white"
          >
            Start Game
          </button>
        </div>
      )}
    </div>
  );
}
