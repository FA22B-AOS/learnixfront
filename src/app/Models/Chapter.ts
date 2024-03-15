import {Lection} from "./Lection";

export class Chapter {
  constructor(
    public chapterId: number,
    public chapterName: string,
    public lectionId: number
  ) {}
}
