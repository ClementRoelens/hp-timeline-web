import { Event } from '../models/Event'
import styles from '../style/EventCard.module.css';

type Props = {
    event: Event;
    isFaceUp: boolean;
    isSelection:boolean;
}

const EventCardComponent = (props: Props) => {
    return (
        <div className={`${styles.card} ${props.isSelection ? "styles.selection" : ""}`}>
            <h2 className={styles.name}>{props.event.name}</h2>
            {props.isFaceUp && <p>{props.event.year}</p>}
        </div>
    )
}

export default EventCardComponent