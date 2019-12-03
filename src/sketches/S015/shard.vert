precision highp float;

attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;

uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;

varying vec3 vNormal;
varying vec3 vPosition;
varying vec2 vUv;
varying vec3 vColor;

uniform float u_freq;
uniform float u_time;
uniform vec3 u_rotation;


float remap(float min1, float max1, float min2, float max2, float value) {
    return min2 + (max2 - min2) * (value - min1) / (max1 - min1);
}

float remapFreq(float min, float max) {
    return remap(0.0, 255.0, min, max, u_freq);
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
    return rotateX(u_rotation.x) * 
            rotateY(u_rotation.y) * 
            rotateZ(u_rotation.z);
}

mat3 scale() {
    float scale = remapFreq(0.1, 1.0);
    return mat3(
        scale, 0.0, 0.0,
        0.0, scale, 0.0,
        0.0, 0.0, scale    
    );
}

void main () {
    vec3 pos = position;
    pos *= 1.0 + rotate();
    pos *= scale();

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
