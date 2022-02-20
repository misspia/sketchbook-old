precision highp float;

uniform sampler2D image1;
uniform float screenRatio;
uniform float textureRatio;

varying float vFreq;
varying vec2 vUv;

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
    float xOffset = 0.4;
    vec2 textureMin = vec2(xOffset * 0.5, 0.0);
    vec2 textureMax = vec2(1.0, 1.0);
    vec2 textureCoords = vUv * 1.0;
    if(screenRatio > textureRatio) {
        // scale down width
        textureCoords.x *= textureRatio;
        textureMax.x = 1.0 / textureRatio + xOffset * 0.5;
    } else {
        // scale down height
        textureCoords.y *= screenRatio;
        textureMax.y = 1.0 / screenRatio;
        
    }
    textureCoords.x -= xOffset;

    float alpha = 1.0;
    vec4 texture = texture2D(image1, textureCoords);

    gl_FragColor = vec4(texture.rgb, alpha);

    float colorStrength = length(texture.xyz);
    // float maxColorStrength = remapFreq(0.0, 3.0);
    float maxColorStrength = 1.5;
    if(
        vUv.x <= textureMin.x  || 
        vUv.y <= textureMin.y  || 
        vUv.x >= textureMax.x  || 
        vUv.y >= textureMax.y ||
        colorStrength > maxColorStrength
    ) {
        discard;
    }
}
