precision highp float;

uniform float u_freq;

float remap(float min1, float max1, float min2, float max2, float value) {
    return min2 + (max2 - min2) * (value - min1) / (max1 - min1);
}

float remapFreq(float min, float max) {
    return remap(0.0, 255.0, min, max, u_freq);
}

void main() {
    vec3 color = vec3(0.4, 0.9, 0.6); 
    color.r = remapFreq(0.5, 0.9);
    // color.g = remapFreq(0.3, 0.6);
    // color.b = remapFreq(0.6, 1.0);

    float alpha = remapFreq(0.6, 1.0);

    gl_FragColor = vec4(color, alpha);
}