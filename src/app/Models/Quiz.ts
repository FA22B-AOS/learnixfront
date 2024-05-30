import {Chapter} from "./Chapter";

export class Quiz {
  constructor(
    public id: number,
    public question: string,
    public options: string[],
    public correctAwnser: number,
    public lectionId: number
  ) {}
}
