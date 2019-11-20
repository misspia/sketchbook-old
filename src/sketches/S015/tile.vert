precision highp float;

attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;

uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;

varying vec3 vNormal;
varying vec3 vPosition;
varying vec2 vUv;

uniform float u_freq;
uniform float u_radius;
uniform float u_angle;



vec3 translate() {
    vec3 centerCoord = vec3(0.0, 0.0, 0.0);
    return vec3(
        centerCoord.x + u_radius * sin(u_angle),
        centerCoord.y,
        centerCoord.z + u_radius * cos(u_angle)
    );
}

void main () {

  vec3 pos = position;
  // pos *= rotate();
  pos += translate();

  
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
