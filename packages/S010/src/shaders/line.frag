precision highp float;

varying vec3 vNormal;
varying vec3 vPosition;
varying vec2 vUv;

uniform vec3 uColor;

float remap(float value, float oldMin, float oldMax, float newMin, float newMax) {
    return newMin + (value - oldMin) * (newMax - newMin) / (oldMax - oldMin);
}

void main() {
    float zDistance = 1.0 - vPosition.z;
    vec3 shadow = uColor * 0.4;
    vec3 white = vec3(
        remap(zDistance, -1.0, 1.0, shadow.r, uColor.r),
        remap(zDistance, -1.0, 1.0, shadow.g, uColor.g),
        remap(zDistance, -1.0, 1.0, shadow.b, uColor.b)
    );

    // gl_FragColor = vec4(1.0, 0.75, 0.8, 1.0);
    gl_FragColor = vec4(white, 1.0);
}
