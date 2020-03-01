precision highp float;

uniform float u_freq;

float remap(float min1, float max1, float min2, float max2, float value) {
    return min2 + (max2 - min2) * (value - min1) / (max1 - min1);
}

float remapFreq(float min, float max) {
    return remap(0.0, 255.0, min, max, u_freq);
}

void main() {
    vec3 color = vec3(
        remapFreq(0.5, 1.0),
        remapFreq(0.3, 0.5),
        remapFreq(0.3, 0.5)
    );
    gl_FragColor = vec4(color, 1.0);
}