precision highp float;

varying vec3 vNormal;
varying vec3 vPosition;
varying vec2 vUv;

float remap(float value, float oldMin, float oldMax, float newMin, float newMax) {
    return newMin + (value - oldMin) * (newMax - newMin) / (oldMax - oldMin);
}

void main() {
    float zDistance = 1.0 - vPosition.z;
    vec3 white = vec3(
        remap(zDistance, -1.0, 1.0, 0.7, 0.9),
        remap(zDistance, -1.0, 1.0, 0.7, 0.9),
        remap(zDistance, -1.0, 1.0, 0.7, 0.9)
    );

    // gl_FragColor = vec4(1.0, 0.75, 0.8, 1.0);
    gl_FragColor = vec4(white, 1.0);
}
