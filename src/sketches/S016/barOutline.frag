precision highp float;

uniform float u_freq;

float remap(float min1, float max1, float min2, float max2, float value) {
    return min2 + (max2 - min2) * (value - min1) / (max1 - min1);
}

float remapFreq(float min, float max) {
    return remap(0.0, 255.0, min, max, u_freq);
}

void main() {
    gl_FragColor = vec4(
        0.3,
        0.3,
        remapFreq(0.4, 0.8),
        remapFreq(0.0, 1.0)
        // 0.0
    );
}