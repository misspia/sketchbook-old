import vertexShader from './toon.vert';
import fragmentShader from './toon.frag';

const createToonShader = {
  uniforms: {
    tDiffuse: { type: 't', value: null },
    tShadow: { type: 't', value: null },
    iResolution: { type: 'v2', value: null },
  },
  vertexShader,
  fragmentShader,
};

export default createToonShader;
