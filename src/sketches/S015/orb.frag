precision highp float;

varying vec3 vColor;
uniform float u_time;
uniform float u_amp;

float remap(float min1, float max1, float min2, float max2, float value) {
    return min2 + (max2 - min2) * (value - min1) / (max1 - min1);
}

float remapFreq(float min, float max) {
    return remap(0.0, 255.0, min, max, u_amp);
}

float reverseRemapFreq(float min, float max) {
    return remap(0.0, 255.0, min, max, 255.0 - u_amp);
}

// void main() {
//     vec3 color = vec3(0.0, 0.0, 1.0);
//     color.r = remapFreq(0.2, 0.3);
//     color.g = remapFreq(0.2, 0.5);
//     color.b = remapFreq(0.4, 0.9);
    
//     float alpha = remapFreq(0.5, 1.0); 
//     gl_FragColor = vec4(vColor, alpha);
// }

void main() {
    vec3 color = vec3(0.0, 0.0, 1.0);
    color.r = remapFreq(0.5, 1.0);
    color.g = remapFreq(0.0, 0.1);
    color.b = remapFreq(0.0, 0.1);
    
    float alpha = remapFreq(0.5, 1.0); 
    gl_FragColor = vec4(color, alpha);
}