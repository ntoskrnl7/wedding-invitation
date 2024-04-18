
const musics = [
    "Ed Sheeran - One Life",
    "Justin Bieber - Off My Face",
    "Lukas Graham - Love Someone",
    "Ramzi - It's You",
] as const;

export type Music = typeof musics[number];

export default musics;