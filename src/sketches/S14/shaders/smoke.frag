precision highp float;

uniform sampler2D diffuseTexture;
varying vec2 vAngle;
varying float vAlpha;
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

// https://youtu.be/a8h1BTe45AU?t=88
void main() {
    vec2 coords = (gl_PointCoord - 0.5) * mat2(vAngle.x, vAngle.y, -vAngle.y, vAngle.x) + 0.5;
    // blue
    vec3 color = vec3(
        reverseRemapFreq(0.1, 0.3),
        0.25, 
        reverseRemapFreq(0.6, 1.0)
    ); 
    
    // gl_FragColor = texture2D(diffuseTexture, coords) * vec4(color, vAlpha);
    float alpha = vAlpha * (1.0 - length(gl_PointCoord.xy)) * 1.3;
    gl_FragColor = texture2D(diffuseTexture, coords) * vec4(color, alpha);
}
