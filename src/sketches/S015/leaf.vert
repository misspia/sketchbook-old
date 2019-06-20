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
uniform vec3 u_rotate_speed;
uniform vec3 u_translate_speed;

const float DEG_TO_RAD = 3.141592653589793 / 180.0;

vec2 rotate(vec2 p, float angle) {
    float c = cos(angle), s = sin(angle);
    return vec2(p.x * c - p.y * s, p.x * s + p.y * c);
}

mat3 rotateX(float rad) {
    float c = cos(rad);
    float s = sin(rad);
    return mat3(
        1.0, 0.0, 0.0,
        0.0, c, s,
        0.0, -s, c
    );
}

mat3 rotateY(float rad) {
    float c = cos(rad);
    float s = sin(rad);
    return mat3(
        c, 0.0, -s,
        0.0, 1.0, 0.0,
        s, 0.0, c
    );
}

mat3 rotateZ(float rad) {
    float c = cos(rad);
    float s = sin(rad);
    return mat3(
        c, s, 0.0,
        -s, c, 0.0,
        0.0, 0.0, 1.0
    );
}

vec3 translate() {
    return vec3(
        sin(u_time) * u_translate_speed.z,
        sin(u_time) * u_translate_speed.y,
        sin(u_time) * u_translate_speed.z
    );
}

float remap(float min1, float max1, float min2, float max2, float value) {
    return min2 + (max2 - min2) * (value - min1) / (max1 - min1);
}

void main () {
    vec3 pos = position;
    pos *= rotateX(u_time * DEG_TO_RAD * u_rotate_speed.x);
    pos *= rotateY(u_time * DEG_TO_RAD * u_rotate_speed.y);
    pos *= rotateZ(u_time * DEG_TO_RAD * u_rotate_speed.z);
    pos += translate();

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
