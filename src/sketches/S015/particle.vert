precision highp float;

attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;

uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;

varying vec3 vNormal;
varying vec3 vPosition;
varying vec2 vUv;

uniform float u_time;
uniform float u_freq;
uniform vec3 u_translate_speed;

// https://github.com/misspia/sketchbook/commit/3a8220da4c57e9cd09190a3d8f77525d6aa25ae9

vec3 translate() {
  // return vec3(
  //   sin(u_time) * u_translate_speed.x,
  //   sin(u_time) * u_translate_speed.y,
  //   sin(u_time) * u_translate_speed.z
  // );

  return vec3(
    sin(u_time),
    sin(u_time),
    sin(u_time)
  );
}


void main () {
  vec3 pos = position;
  pos += translate();

  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  gl_PointSize = 50.0 * (300.0 / -mvPosition.z);
  gl_Position = projectionMatrix * mvPosition;
}
