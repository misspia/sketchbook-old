precision highp float;

uniform float uFreq;
uniform vec2 uResolution;

varying vec4 vColor;
varying float vAlpha;

float remap(float min1, float max1, float min2, float max2, float value) {
    return min2 + (max2 - min2) * (value - min1) / (max1 - min1);
}

float remapFreq(float min, float max) {
    return remap(0.0, 255.0, min, max, uFreq);
}

float reverseRemapFreq(float min, float max) {
    return remap(0.0, 255.0, min, max, 255.0 - uFreq);
}

// https://thebookofshaders.com/07/
void main() {
    float alpha = vAlpha;
    float len = distance(vec2(0.5, 0.5), gl_PointCoord.xy);
    vec3 color = vColor.xyz;

    if(len > 0.1) {
        alpha = 0.0;
    }

    gl_FragColor = vec4(color, alpha);
}
