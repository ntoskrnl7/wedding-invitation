
const songs = [
    "Ed Sheeran - One Life",
    "Justin Bieber - Off My Face",
    "Lukas Graham - Love Someone",
    "Ramzi - It's You",
] as const;

export type Song = typeof songs[number];

export default songs;