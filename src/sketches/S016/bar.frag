precision highp float;

float remap(float min1, float max1, float min2, float max2, float value) {
    return min2 + (max2 - min2) * (value - min1) / (max1 - min1);
}

void main() {
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}