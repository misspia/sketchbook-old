import React from 'react'
import { Images } from './assets';

const S000 = React.lazy(() => import('S000/Page'))
const S001 = React.lazy(() => import('S001/Page'))
const S002 = React.lazy(() => import('S002/Page'))
const S003 = React.lazy(() => import('S003/Page'))
const S004 = React.lazy(() => import('S004/Page'))
const S005 = React.lazy(() => import('S005/Page'))
const S006 = React.lazy(() => import('S006/Page'))
const S007 = React.lazy(() => import('S007/Page'))
const S008 = React.lazy(() => import('S008/Page'))
const S009 = React.lazy(() => import('S009/Page'))
const S010 = React.lazy(() => import('S010/Page'))
const S011 = React.lazy(() => import('S011/Page'))
const S012 = React.lazy(() => import('S012/Page'))
const S013 = React.lazy(() => import('S013/Page'))
const S014 = React.lazy(() => import('S014/Page'))
const S015 = React.lazy(() => import('S015/Page'))
const S016 = React.lazy(() => import('S016/Page'))
const S017 = React.lazy(() => import('S017/Page'))


/**
 * Sketch fields
 * title: string
 * image: Image Object
 * sketch: Sketch
 * instructions: string (optional)
 * isAudio: bool (optional)
 * isWebcam: bool (optional)
 */


export const Sketches = [
  {
    image: Images.S000,
    component: S000
  },
  {
    image: Images.S001,
    component: S001
  },
  {
    image: Images.S002,
    component: S002
  },
  {
    image: Images.S003,
    component: S003
  },
  {
    image: Images.S004,
    component: S004
  },
  {
    image: Images.S005,
    component: S005
  },
  {
    instructions: 'Press & hold to make the sphere explode',
    image: Images.S006,
    component: S006
  },
  {
    image: Images.S007,
    component: S007
  },
  {
    instructions: `Right Now - Nurko & Misdom`,
    image: Images.S008,
    component: S008
  },
  {
    image: Images.S009,
    component: S009,
  },
  {
    instructions: 'Hover to activate the ribbons',
    image: Images.S010,
    component: S010,
  },
  {
    image: Images.S011,
    component: S011,
  },
  {
    instructions: 'Press & hold to reach level 9000',
    image: Images.S012,
    component: S012,
  },
  {
    image: Images.S013,
    component: S013,
  },
  {
    instructions: `Coven theme - Riot Games x Andrea Bellucci`,
    isAudio: true,
    image: Images.S014,
    component: S014,
  },
  {
    instructions: `Nobody (ft. MINO) - Blue.D`,
    isAudio: true,
    image: Images.S015,
    component: S015,
  },
  {
    instructions: `Wrong (ft. Lil Uzi Vert) - MAX`,
    isAudio: true,
    image: Images.S016,
    component: S016,
  },
  {
    instructions: `Il vento d'oro - Yugo Kanno`,
    isAudio: true,
    image: Images.S017,
    component: S017,
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
