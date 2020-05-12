import { Property } from "./Property";

export interface DisplayPlayer {
  name: string,
  properties: Property[],
  cash: number,
  jail: boolean,
}