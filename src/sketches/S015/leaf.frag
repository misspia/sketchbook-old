precision highp float;

uniform float u_time;

float remap(float min1, float max1, float min2, float max2, float value) {
    return min2 + (max2 - min2) * (value - min1) / (max1 - min1);
}

void main() {
    vec3 color = vec3(1.0, 1.0, 1.0);
    color.r = remap(-1.0, 1.0, 0.2, 0.6, cos(u_time));
    color.g = remap(-1.0, 1.0, 0.2, 0.6, cos(u_time));
    color.b = remap(-1.0, 1.0, 0.2, 0.6, cos(u_time));
    gl_FragColor = vec4(color, 1.0);
}