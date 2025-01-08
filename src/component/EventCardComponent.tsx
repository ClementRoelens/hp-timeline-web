import { useEffect, useState } from 'react';
import { Event } from '../models/Event'
import styles from '../style/EventCard.module.css';

type Props = {
    event: Event;
    isFaceUp: boolean;
    isSelection:boolean;
    isRevealing:boolean;
}

const EventCardComponent = (props: Props) => {
    const [isRevealed, setIsRevealed] = useState(false);

    useEffect(() => {
        if (props.isRevealing){
            setTimeout(() => {
                setIsRevealed(true);
            }, 50);
        }
    }, []);

    return (
        <div className={`${styles.card} ${props.isSelection ? styles.selection : ""}`}>
            <h2 className={styles.name}>{props.event.name}</h2>
            {props.isFaceUp && 
            <p className={`${styles.year} ${props.isRevealing ? styles.toBeRevealed : ""} ${isRevealed ? styles.revealing : ""}`}>
                {props.event.year}
            </p>}
            
        </div>
    )
}

export default EventCardComponent