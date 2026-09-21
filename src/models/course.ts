export interface Course {
  name: string;
  holes: Hole[];
  par: number;
}

export interface Hole {
  number: number;
  handicap: number;
  par: number;
}
