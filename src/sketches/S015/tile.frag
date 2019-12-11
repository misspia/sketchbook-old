precision highp float;

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
    float colorFactor = 0.7;
    vec3 color = vec3(0.0, 0.0, 1.0);

    float alpha = 1.0;

    if(u_freq > 230.0) {
        color.r = remapFreq(0.4, 0.8);
        color.g = remapFreq(0.4, 0.8);
        color.b = remapFreq(0.5, 1.0);
        alpha = reverseRemapFreq(0.4, 1.0);

    } else if(u_freq > 190.0) {
        color.r = remapFreq(0.4, 0.9);
        color.g = remapFreq(0.4, 0.9);
        color.b = remapFreq(0.5, 1.0);
        alpha = reverseRemapFreq(0.3, 0.8);
    } else {
        color.r = reverseRemapFreq(0.4, 1.0) ;
        color.g = reverseRemapFreq(0.4, 1.0) ;
        color.b = reverseRemapFreq(0.4, 1.0);
        alpha = remapFreq(0.1, 1.0);
    }

    gl_FragColor = vec4(color, alpha);
}
