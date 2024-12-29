export class Event {
    constructor (
        // private _id:number, 
        private _name:string, private _year:number){}

    // public get id() : number {
    //     return this._id;
    // }

    public get name() : string {
        return this._name;
    }

    public get year() : number {
        return this._year;
    }
}