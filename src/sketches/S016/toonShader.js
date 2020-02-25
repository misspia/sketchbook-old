import vertexShader from './toon.vert';
import fragmentShader from './toon.frag';

const createToonShader = (resolution) => ({
  uniforms: {
    tDiffuse: { type: 't', value: null },
    tShadow: { type: 't', value: null },
    iResolution: { type: 'v2', value: resolution },
    // iTime: { type: 'f', value: 0.0 },
    // tNoise: { type: 't', value: new THREE.Te}
  },
  vertexShader,
  fragmentShader,
})

export default createToonShader;
