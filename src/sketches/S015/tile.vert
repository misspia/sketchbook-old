precision highp float;

attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;

uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;

uniform float u_freq;
uniform float u_radius;
uniform float u_angle;
uniform float u_time;

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

  pos += translate();


  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
