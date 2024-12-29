import { Event } from "./Event";

export class Player{
    constructor (private _id:number, private _name:string, private _hand:Event[]){}

    public get id() : number {
        return this._id;
    }

    public get name() : string {
        return this._name;
    }
    
    public get hand() : Event[] {
        return this._hand;
    }
}