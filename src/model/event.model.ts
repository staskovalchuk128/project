export class Event {
  constructor(public id?: number,
    public name?: string,
    public date?: Date,
    public year?: number,
    public month?: number,
    public day?: number,
    public time?: string,
    public players?: Array<any>
    ) {}
  }
