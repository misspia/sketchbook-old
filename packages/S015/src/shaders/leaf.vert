precision highp float;

attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;

uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;

uniform float u_time;
uniform vec3 u_rotate_speed;
uniform vec3 u_translate_speed;
uniform float u_angle;
uniform float u_radius;

const float DEG_TO_RAD = 3.141592653589793 / 180.0;

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
    float rad = u_time * DEG_TO_RAD;
    return rotateX(rad * u_rotate_speed.x) *
            rotateY(rad * u_rotate_speed.y) *
            rotateZ(rad * u_rotate_speed.z);
}

vec3 translate() {
    vec3 centerCoord = vec3(0.0, 0.0, 0.0);
    return vec3(
        centerCoord.x + u_radius * sin(u_angle),
        centerCoord.y + u_radius * cos(u_angle),
        centerCoord.z

    );
}

float remap(float min1, float max1, float min2, float max2, float value) {
    return min2 + (max2 - min2) * (value - min1) / (max1 - min1);
}

bool isInBounds(vec3 pos) {
    vec3 bounds = vec3(100.0, 100.0, 100.0);
    return abs(pos.x) < bounds.x &&
            abs(pos.y) < bounds.y &&
            abs(pos.z) < bounds.z;
}

void main () {
    vec3 pos = position;
    pos *= rotate();
    pos += translate();

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
