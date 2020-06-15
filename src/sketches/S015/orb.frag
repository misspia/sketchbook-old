precision highp float;

uniform float u_freq;
uniform sampler2D u_texture;

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
    vec4 texture = texture2D(u_texture, gl_PointCoord);
    vec4 color = vec4(0.0, 1.0, 1.0, 1.0);
    color.r = reverseRemapFreq(0.0, 0.7);
    color.g = remapFreq(0.0, 0.7);
    color.b = remapFreq(0.0, 0.7);
    color.a = 0.0;

    gl_FragColor = vec4(color.rgb * texture.rgb, color.a);
    if(texture.a < 0.1) discard;
}
