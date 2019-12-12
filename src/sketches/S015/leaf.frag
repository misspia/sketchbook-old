precision highp float;

uniform float u_time;
uniform float u_freq;

float remap(float min1, float max1, float min2, float max2, float value) {
    return min2 + (max2 - min2) * (value - min1) / (max1 - min1);
}

float remapFreq(float min, float max) {
    return remap(0.0, 255.0, min, max, u_freq);
}

float reverseRemapFreq(float min, float max) {
    return remap(0.0, 255.0, min, max, 255.0 - u_freq);
}

void main() {
    vec3 color = vec3(0.0, 0.0, 0.0);

    if(u_freq > 200.0) {
        color.r = remapFreq(0.5, 0.7);
        color.g = remapFreq(0.5, 0.7);
        color.b = remapFreq(0.5, 1.0);
    } else {
        color.r = remapFreq(0.0, 0.6);
        color.g = remapFreq(0.0, 0.6);
        color.b = remapFreq(0.0, 0.6);
    }

    float alpha = remapFreq(0.0, 1.0);
    gl_FragColor = vec4(color, alpha);
}
