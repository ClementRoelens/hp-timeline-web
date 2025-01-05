import { Player } from '../models/Player'
import { Event } from '../models/Event'
import EventCardComponent from './EventCardComponent';
import styles from '../style/CurrentPlayer.module.css';
// import { selectEvent } from './eventSlice';
// import { useAppDispatch } from '../config/hook';
// import { endTurn } from './playerSlice';

type Props = {
  player: Player;
  playEvent : (event:Event) => void;
}

export const CurrentPlayerHandComponent = (props: Props) => {
  // const dispatch = useAppDispatch();

  // const playEvent = (event: Event): void => {
  //   dispatch(selectEvent(event));
  //   dispatch(endTurn());
  // };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Au tour de {props.player.name}</h1>
      <ul className={styles.hand}>
        {props.player.hand.map((event: Event, index: number) =>
          <li className={styles.event} key={index} onClick={() => props.playEvent(event)}>
            <EventCardComponent event={event} isFaceUp={false} isSelection={false} />
          </li>
        )}
      </ul>
    </div>
  )
}