import { Player } from '../models/Player'
import { Event } from '../models/Event'
import EventCardComponent from './EventCardComponent';
import styles from '../style/CurrentPlayer.module.css';

type Props = {
  player: Player;
  playEvent : (event:Event) => void;
}

export const CurrentPlayerHandComponent = (props: Props) => {

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