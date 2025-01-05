import { useEffect, useState } from 'react'
import { fetchEvents } from '../service/DataService';
// import EventCardComponent from './EventCardComponent';
import { Event } from '../models/Event';
// import { Player } from '../models/Player';
import { CurrentPlayerHandComponent } from './CurrentPlayerHandComponent';
import { useAppDispatch, useAppSelector } from '../config/hook';
import { setEvents } from './eventSlice';
import { addCardToHand } from './playerSlice';
import EventCardComponent from './EventCardComponent';
import styles from "../style/PlayGround.module.css";

export const PlayGroundComponent = () => {
    // const stock = useAppSelector(state => state.event.eventsStock);
    // const selectedEvent = useAppSelector(state => state.event.selectedEvent);
    const [playedEvents, setPlayedEvents] = useState<Event[]>([]);
    const players = useAppSelector(state => state.player.players);
    const currentPlayerIndex = useAppSelector(state => state.player.currentPlayerIndex);
    const dispatch = useAppDispatch();


    useEffect(() => {
        fetchEvents()
            .then((res:Event[]) => {
                for (let i = 0; i < 4; i++) {
                    for (let j = 0; j < players.length; j++) {
                        const drawnEvent = res.splice(0,1)[0];
                        dispatch(addCardToHand({index:j, event:drawnEvent}));
                    }
                }
                setPlayedEvents([...playedEvents, res.splice(0,1)[0]]);
                dispatch(setEvents(res));
            });
    }, []);

    const triggerTryMode = (event:Event) => {
        const newEvents = [];
        for (const playedEvent of playedEvents){
            newEvents.push(event);
            newEvents.push(playedEvent);
        }
        newEvents.push(event);
        setPlayedEvents(newEvents);
    }

    const tryEvent = (index:number) => {
        if (playedEvents[index-1].year <= playedEvents[index].year
            &&
            playedEvents[index].year <= playedEvents[index+1].year
        ){
            console.log("Réussite !");
            const newEvents = playedEvents.filter((event:Event, indexBis:number) => {
                if (indexBis % 2 != 0 && indexBis != index){
                    return event;
                }
            });
            setPlayedEvents(newEvents);
        } else {
            console.log("Raté");
        }
    };

    // useEffect(() => {

    // }, [selectedEvent])

    return (
        <>
            <CurrentPlayerHandComponent player={players[currentPlayerIndex]} playEvent={triggerTryMode} />
            <ul className={styles.list}>
                {playedEvents.map((event:Event, index:number) =>
                <li key={index} onClick={() => tryEvent(index)}>
                    {index % 2 == 0 ?
                     <EventCardComponent event={event} isFaceUp={true} isSelection={false}/> :
                     <EventCardComponent event={event} isFaceUp={false} isSelection={true} />
                     }
                </li>
                )}
            </ul>
        </>
    )
}