precision highp float;

// attribute vec2 uv;

// uniform mat4 projectionMatrix;
// uniform mat4 modelViewMatrix;

varying vec2 vUv;

void main () {
    vUv = uv;
    gl_Position = projectionMatrix *  modelViewMatrix * vec4 (position, 1.0);
}
