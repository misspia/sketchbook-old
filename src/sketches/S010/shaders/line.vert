precision highp float;

attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;

uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;

uniform vec3 uNoise;
uniform float uTime;
uniform float uAmp;

#pragma glslify: noise = require('glsl-noise/simplex/3d')

void main () {
  float displacement = uAmp * noise(vec3(position * uNoise * 0.06) + uTime );
  vec3 newPosition = position;
  if(uv.x > 0.001 && uv.x < 0.999) {
    newPosition = position + normal * displacement;
  }

  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
