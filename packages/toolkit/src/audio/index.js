import { testAudio } from "./audio.test"

export const BASE_URL = 'https://raw.githubusercontent.com/misspia/assets/master/audio/';

const testers = testAudio || {} 

const Audio = {
  elemId: 'audio',
  
  ...testers,
  
  S008: {
    url: `${BASE_URL}nurko-right-now.mp3`,
    title: `Right Now - Nurko & Misdom` 
   },
   S014: {
     url: `${BASE_URL}coven-theme-riot.mp3`,
     title: `Coven theme - Riot Games x Andrea Bellucci`,
   },
   S015: {
     url: `${BASE_URL}blue-d-nobody.mp3`,
     title: `Nobody (ft. MINO) - Blue.D`,
   },
   S016: {
     url: `${BASE_URL}max-wrong.mp3`,
     title: `Wrong (ft. Lil Uzi Vert) - MAX`,
   },
  
   S017: {
     url: `${BASE_URL}il-vento-doro.mp3`,
     title: `Il vento d'oro - Yugo Kanno`,
   },

}

export default Audio;
