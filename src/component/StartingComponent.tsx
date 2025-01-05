import { Player } from "../models/Player";
import { useAppDispatch } from "../config/hook";
import { initiatePlayers } from "./playerSlice";
import { useState } from "react";

type Props = {
  start: React.Dispatch<React.SetStateAction<boolean>>
};

export const StartingComponent = (props: Props) => {
  const dispatch = useAppDispatch();
  const [players, setPlayers] = useState<Player[]>([{ id: 0, name: "", hand: [] }]);

  const updatePlayersNames = (e:  React.FormEvent<HTMLInputElement>, index: number) => {
    if (e.currentTarget.value == "Enter") {
      addPlayer(index);
    } else {
      const updatedPlayers = players.map((player: Player) =>
        player.id === index ?
          { id: index, name: e.currentTarget.value, hand: [] } :
          player
      );
      setPlayers(updatedPlayers);
    }
  };

  const addPlayer = (index: number) => {
    setPlayers([...players, { id: index, name: "", hand: [] }]);
  };

  const startGame = (): void => {
    dispatch(initiatePlayers(players));
    props.start(true);
  };

  return (
    <section>
      <h2>Placez les différents événements sur la frise chronologique</h2>
      <p>Qui sont les joueurs ?</p>
      { players.map((_player: Player, index: number) =>
        <div key={index}>
          <label htmlFor={`name-${index}`}>Nom du joueur {index}</label>
          <span>
            <input type="text" name={`name-${index}`} onChange={e => updatePlayersNames(e, index)} 
              onKeyDown={e => {
                if (e.code === "Enter"){
                  e.preventDefault();
                  addPlayer(index);
                }
              }} />
            <button onClick={() => addPlayer(index)}>+</button>
          </span>
        </div>
      )}
      <button onClick={startGame}>Commencer la partie</button>
    </section>
  )
}