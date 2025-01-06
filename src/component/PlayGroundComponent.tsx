import { useEffect, useState } from 'react'
import { fetchEvents } from '../service/DataService';
// import EventCardComponent from './EventCardComponent';
import { Event } from '../models/Event';
// import { Player } from '../models/Player';
import { CurrentPlayerHandComponent } from './CurrentPlayerHandComponent';
import { useAppDispatch, useAppSelector } from '../config/hook';
import { drawCard, setEvents } from './eventSlice';
import { addCardToHand, endTurn, removeCardFromHand } from './playerSlice';
import EventCardComponent from './EventCardComponent';
import styles from "../style/PlayGround.module.css";

export const PlayGroundComponent = () => {
    const [playedEvents, setPlayedEvents] = useState<Event[]>([]);
    const [revealingEvent, setRevealingEvent] = useState<Event | null>(null);
    const [isTryMode, setIsTryMode] = useState(false);
        
    const stock = useAppSelector(state => state.event.eventsStock);
    const players = useAppSelector(state => state.player.players);
    const currentPlayerIndex = useAppSelector(state => state.player.currentPlayerIndex);
    const dispatch = useAppDispatch();


    useEffect(() => {
        fetchEvents()
            .then((res: Event[]) => {
                for (let i = 0; i < 4; i++) {
                    for (let j = 0; j < players.length; j++) {
                        const drawnEvent = res.splice(0, 1)[0];
                        dispatch(addCardToHand({ playerIndex: j, event: drawnEvent }));
                    }
                }
                setPlayedEvents([...playedEvents, res.splice(0, 1)[0]]);
                dispatch(setEvents(res));
            });
    }, []);

    const triggerTryMode = (event: Event) : void => {
        const newEvents = [];
        for (const playedEvent of playedEvents) {
            newEvents.push(event);
            newEvents.push(playedEvent);
        }
        newEvents.push(event);
        setIsTryMode(true);
        setPlayedEvents(newEvents);
    }

    const tryEvent = (index: number) : void => {
        let newEvents: Event[] = [];
        let isCorrect = false;

        setRevealingEvent(playedEvents[index]);
        setTimeout(() => {
            setRevealingEvent(null);
        }, 1500);

        if (index == 0) {
            isCorrect = playedEvents[index].year <= playedEvents[index + 1].year;
        } else if (index == playedEvents.length - 1) {
            isCorrect = playedEvents[index - 1].year <= playedEvents[index].year;
        } else {
            isCorrect = (playedEvents[index - 1].year <= playedEvents[index].year)
                &&
                (playedEvents[index].year <= playedEvents[index + 1].year);
        }
        if (isCorrect) {
            console.log("Réussite !");
            isCorrect = true;
            newEvents = playedEvents.filter((event: Event, indexBis: number) => {
                if (indexBis % 2 != 0 || indexBis == index) {
                    return event;
                }
            });
        } else {
            console.log("Raté");
            newEvents = playedEvents.filter((event: Event, indexBis: number) => {
                if (indexBis % 2 != 0) {
                    return event;
                }
            });
        }
        setIsTryMode(false);
        
        if (!isCorrect) {
            dispatch(addCardToHand({ playerIndex: currentPlayerIndex, event: stock[0] }));
            dispatch(drawCard());
        }
        dispatch(removeCardFromHand({id:playedEvents[index].id}));

        setPlayedEvents(newEvents);
        dispatch(endTurn());
    };

    return (
        <>
            <CurrentPlayerHandComponent player={players[currentPlayerIndex]} playEvent={triggerTryMode} />
            <div>
                <ul className={styles.list}>
                    {playedEvents.map((event: Event, index: number) =>
                        isTryMode ?
                            (index % 2 == 0 ?
                                <li key={index} onClick={() => tryEvent(index)}>
                                    <EventCardComponent event={event} isFaceUp={false} isSelection={true} />
                                </li>
                                :
                                <li key={index}>
                                    <EventCardComponent event={event} isFaceUp={true} isSelection={false} />
                                </li>
                            )
                            :
                            <li key={index}>
                                <EventCardComponent event={event} isFaceUp={true} isSelection={false} />
                            </li>
                    )}
                </ul>
                {revealingEvent &&
                    <>
                        <div className={styles.revealing}>
                            <EventCardComponent event={revealingEvent} isFaceUp={false} isSelection={false} />
                        </div>
                        <div className={styles.revealed}>
                            <EventCardComponent event={revealingEvent} isFaceUp={false} isSelection={false} />
                        </div>
                    </>
                }
            </div>
        </>
    )
}