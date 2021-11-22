import testAudio from "./audio.test"

export const BASE_URL = 'https://raw.githubusercontent.com/misspia/assets/master/audio/';

const testers = testAudio || {} 

const Audio = {
  elemId: 'audio',
  
  ...testers,
  
  S008: `${BASE_URL}nurko-right-now.mp3`,
  S014: `${BASE_URL}kda-popstars.mp3`,
  S015: `${BASE_URL}blue-d-nobody.mp3`,
  S016: `${BASE_URL}max-wrong.mp3`,

}

export default Audio;
