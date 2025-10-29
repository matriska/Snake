interface GameOverProps {
 score:number 
 setGameStarted: (started: boolean) => void;
}
export const GameOver =(props:GameOverProps) => {
    return (
        <div className="flex flex-1 items-center justify-center border-red-100 border-4 relative p-3">
           <div>
            <p className="text-3xl font-bold text-center">Si najebal!!!!!!!!!</p>
            <p className="text-2xl text-center"> Tvoje skóre je {props.score}</p>
            <button
            onClick={() => props.setGameStarted(false)}
            className="p-4 pt-2 pb-2 bg-black border rounded text-white"
          >
            Go to main page
          </button>
            </div>
        </div>
      
    )
}