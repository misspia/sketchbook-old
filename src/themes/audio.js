import testAudio from "./audio.test"

export const BASE_URL = 'https://raw.githubusercontent.com/misspia/assets/master/audio/';

const testers = testAudio || {} 

const Audio = {
  elemId: 'audio',
  
  ...testers,
  
  S008: `${BASE_URL}nurko-right-now.mp3`,
  S014: `${BASE_URL}coven-theme-riot.mp3`,
  S015: `${BASE_URL}blue-d-nobody.mp3`,
  S016: `${BASE_URL}max-wrong.mp3`,
  S017: `${BASE_URL}il-vento-doro.mp3`,

}

export default Audio;
