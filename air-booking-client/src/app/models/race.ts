import { Destination } from './destination';

export class Race {
  _id: string;
  from: Destination;
  to: Destination;
  places: any[];

  constructor(_id: string, from: Destination, to: Destination, days: any[]){}
}
