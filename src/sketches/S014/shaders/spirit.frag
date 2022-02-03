precision highp float;

varying float vFreq;

float remap(float min1, float max1, float min2, float max2, float value) {
    return min2 + (max2 - min2) * (value - min1) / (max1 - min1);
}

float remapFreq(float min, float max) {
    return remap(0.0, 255.0, min, max, vFreq);
}

float reverseRemapFreq(float min, float max) {
    return remap(0.0, 255.0, min, max, 255.0 - vFreq);
}

void main() {
    vec3 color = vec3(
        remapFreq(0.1, 1.0), 
        reverseRemapFreq(0.3, 0.4), 
        reverseRemapFreq(0.1, 1.0)
    );

    float alpha = remapFreq(0.0, 1.0);
    float len = distance(vec2(0.5, 0.5), gl_PointCoord.xy);
    if(len > 0.1) {
        alpha = 0.0;
    }
    if(len > 0.08) {
        color *= 1.2;
    }

    gl_FragColor = vec4(color, alpha);
}
