import { Images } from '../themes';

// import S000 from './S000';
// import S001 from './S001';
// import S002 from './S002';
// import S003 from './S003';
// import S004 from './S004';
// import S005 from './S005';
// import S006 from './S006';
// import S007 from './S007';
// import S008 from './S008';
// import S009 from './S009';
// import S010 from './S010';
// import S011 from './S011';
// import S012 from './S012';
// import S013 from './S013';
// import S014 from './S014';
// import S015 from './S015';
// import S016 from './S016';
// import S017 from './S017';


/**
 * Sketch fields
 * title: string
 * image: Image Object
 * sketch: Sketch
 * instructions: string (optional)
 * isAudio: bool (optional)
 * isWebcam: bool (optional)
 */


const Sketches = [
  {
    title: 'Metaballs',
    image: Images.S000,
    // component: S000
  },
  {
    title: 'Playing with oscillators',
    image: Images.S001,
    // component: S001
  },
  {
    title: 'SDFs',
    image: Images.S002,
    // component: S002
  },
  {
    title: 'Ray marching',
    image: Images.S003,
    // component: S003
  },
  {
    title: 'Toon shading',
    image: Images.S004,
    // component: S004
  },
  {
    title: 'Basic texture mapping',
    image: Images.S005,
    // component: S005
  },
  {
    title: 'Mesh explosion',
    instructions: 'Press & hold to make the sphere explode',
    image: Images.S006,
    // component: S006
  },
  {
    title: 'Tunnel',
    image: Images.S007,
    // component: S007
  },
  {
    title: '',
    instructions: `Right Now - Nurko & Misdom`,
    isAudio: true,
    image: Images.S008,
    // component: S008
  },
  {
    title: 'Light Tunnel',
    image: Images.S009,
    // component: S009,
  },
  {
    title: 'Noise',
    instructions: 'Hover to activate the ribbons',
    image: Images.S010,
    // component: S010,
  },
  {
    title: 'Bloom',
    image: Images.S011,
    // component: S011,
  },
  {
    title: 'Noisey plane & texture mixing',
    instructions: 'Press & hold to reach level 9000',
    image: Images.S012,
    // component: S012,
  },
  {
    title: 'God rays',
    image: Images.S013,
    // component: S013,
  },
  {
    title: '',
    instructions: `Coven theme - Riot Games x Andrea Bellucci`,
    isAudio: true,
    image: Images.S014,
    // component: S014,
  },
  {
    title: '',
    instructions: `Nobody (ft. MINO) - Blue.D`,
    isAudio: true,
    image: Images.S015,
    // component: S015,
  },
  {
    title: '',
    instructions: `Wrong (ft. Lil Uzi Vert) - MAX`,
    isAudio: true,
    image: Images.S016,
    // component: S016,
  },
  {
    title: '',
    instructions: `Il vento d'oro - Yugo Kanno`,
    isAudio: true,
    image: Images.S017,
    // component: S017,
  },

  // // {
  // //   title: '',
  // //   image: Images.S,
  // //   component: S,
  // //   instructions: ``,
  // //   isAudio: false,
  // //   isWebcam: false,
  // // },
];

export default Sketches;
