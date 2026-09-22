export interface Course {
  name: string;
  id: number;
  holes: Hole[];
  par: number;
}

export interface Hole {
  number: number;
  handicap: number;
  par: number;
}
