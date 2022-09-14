precision highp float;

attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;

uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;

uniform float u_time;
uniform float u_freq;
uniform vec3 u_translate_speed;
uniform float u_max_screen_dimension;
uniform float u_min_size;
uniform float u_max_size;

const float DEG_TO_RAD = 3.141592653589793 / 180.0;

float remap(float min1, float max1, float min2, float max2, float value) {
    return min2 + (max2 - min2) * (value - min1) / (max1 - min1);
}

float remapFreq(float min, float max) {
    return remap(0.0, 255.0, min, max, u_freq);
}

float reverseRemapFreq(float min, float max) {
    return remap(0.0, 255.0, min, max, 255.0 - u_freq);
}

vec3 translate() {
  return vec3(
    position.x + sin(u_time) * u_translate_speed.x,
    position.y + sin(u_time) * u_translate_speed.y,
    position.z + sin(u_time) * u_translate_speed.z
  );
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

mat3 rotate() {
  vec3 u_rotate_speed = vec3(10.0, 0.1, 2.0);
    float rad = u_time * DEG_TO_RAD;
    return rotateX(rad * u_rotate_speed.x) *
            rotateY(rad * u_rotate_speed.y) *
            rotateZ(rad * u_rotate_speed.z);
}

void main () {
  vec3 pos = position;
  pos *= rotate();
  pos += translate();

  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  float size = remapFreq(u_min_size, u_max_size);
  gl_PointSize = size * (300.0 / -mvPosition.z);
  gl_Position = projectionMatrix * mvPosition;
}
