import Papa from 'papaparse';
import { Event } from '../models/Event';

interface CsvData {
        [key: string]: string;
}

export const fetchEvents = async (): Promise<Event[]> => {
        try {
                const response = await fetch('src/assets/data.csv');
                const blob = await response.blob(); 
                const arrayBuffer = await blob.arrayBuffer();
                const csvContent = new TextDecoder("UTF-8").decode(arrayBuffer);

                return new Promise<Event[]>((resolve, reject) => {
                        Papa.parse<CsvData>(csvContent, {
                                header: false,
                                skipEmptyLines: true,
                                complete: (result) => {
                                        try {
                                                const events: Event[] = result.data.map(line => ({
                                                        name: line[0],
                                                        year: +line[1],
                                                }));
                                                resolve(randomizeEvents(events));
                                        } catch (error) {
                                                reject(error);
                                        }
                                },
                                error: (error: Error) => {
                                        reject(error);
                                },
                        });
                });
        } catch (error:unknown) {
                console.error(error);
                throw new Error(`Erreur lors de la récupération du fichier CSV`);
        }
};

const randomizeEvents = (array: Event[]): Event[] => {
        const newArray: Event[] = [];
        while (array.length > 0) {
                const randomIndex = Math.floor(Math.random() * array.length);
                newArray.push(array.splice(randomIndex, 1)[0]);
        }
        return newArray;
}
