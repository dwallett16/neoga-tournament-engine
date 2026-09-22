import { type Course, type Hole } from "../../src/models/course";

const courseData: Course[] = [
  {
    name: "Deer Ridge Golf Club",
    id: 1,
    holes: [
      { number: 1, handicap: 11, par: 4 },
      { number: 2, handicap: 7, par: 4 },
      { number: 3, handicap: 15, par: 3 },
      { number: 4, handicap: 1, par: 5 },
      { number: 5, handicap: 13, par: 4 },
      { number: 6, handicap: 3, par: 4 },
      { number: 7, handicap: 17, par: 3 },
      { number: 8, handicap: 5, par: 5 },
      { number: 9, handicap: 9, par: 4 },
      { number: 10, handicap: 12, par: 4 },
      { number: 11, handicap: 2, par: 5 },
      { number: 12, handicap: 16, par: 3 },
      { number: 13, handicap: 6, par: 4 },
      { number: 14, handicap: 10, par: 4 },
      { number: 15, handicap: 18, par: 3 },
      { number: 16, handicap: 4, par: 5 },
      { number: 17, handicap: 8, par: 4 },
      { number: 18, handicap: 14, par: 4 },
    ],
    par: 72,
  },
];

export = courseData;
