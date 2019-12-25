import * as THREE from 'three';
import noiseShader from './noise';

export const vertexShader = `
  precision highp float;

  attribute vec3 position;
  attribute vec3 normal;
  attribute vec2 uv;

  uniform mat4 projectionMatrix;
  uniform mat4 modelViewMatrix;

  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec2 vUv;

  uniform  float u_freq;
  uniform float u_time;

  float remap(float min1, float max1, float min2, float max2, float value) {
      return min2 + (max2 - min2) * (value - min1) / (max1 - min1);
  }

  float remapFreq(float min, float max) {
      return remap(0.0, 255.0, min, max, u_freq);
  }

  ${THREE.ShaderChunk.shadowmap_pars_vertex}

  ${noiseShader}

  void main () {
    float amp = remapFreq(1.0, 3.5);
    vec3 fnoise = vec3(1.0, 1.0, 1.0);
    fnoise.x = remapFreq(0.0, 1.0);
    fnoise.y = remapFreq(0.0, 2.0);
    fnoise.z = remapFreq(-1.0, 3.0);

    float displacement = amp * noise(vec3(position * fnoise * 0.06) + u_time );
    vec3 newPosition = position + normal * displacement;

    vPosition = newPosition;

    ${THREE.ShaderChunk.shadowmap_vertex}

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);

  }
`;


export const fragmentShader = `
  precision highp float;

  varying vec3 vPosition;
  uniform float u_freq;

  float remap(float min1, float max1, float min2, float max2, float value) {
      return min2 + (max2 - min2) * (value - min1) / (max1 - min1);
  }

  float remapFreq(float min, float max) {
      return remap(0.0, 255.0, min, max, u_freq);
  }

  float reverseRemapFreq(float min, float max) {
      return remap(0.0, 255.0, min, max, 255.0 - u_freq);
  }

  ${THREE.ShaderChunk.shadowmap_pars_fragment}

  void main() {
      vec3 color = vec3(1.0, 0.6, 0.2);
      color.r = remapFreq(0.5, 0.6);
      color.g = remapFreq(0.1, 0.6);
      color.b = remapFreq(0.2, 1.0);

      gl_FragColor = vec4(color, 1.0);
  }

  ${THREE.ShaderChunk.tonemapping_fragment}
  ${THREE.ShaderChunk.shadowmap_fragment}
`;
