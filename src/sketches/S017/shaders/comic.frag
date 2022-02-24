precision highp float;

uniform sampler2D image1;
uniform float screenRatio;
uniform float textureRatio;
uniform float freq;

varying vec2 vUv;

float remap(float min1, float max1, float min2, float max2, float value) {
    return min2 + (max2 - min2) * (value - min1) / (max1 - min1);
}

float remapFreq(float min, float max) {
    return remap(0.0, 255.0, min, max, freq);
}

float reverseRemapFreq(float min, float max) {
    return remap(0.0, 255.0, min, max, 255.0 - freq);
}


// https://stackoverflow.com/a/62821532
void main() {
    vec2 textureCoords = vUv * 1.0;

    if(screenRatio > textureRatio) {
        // textureCoords.x *= textureRatio;
    } else {
        // textureCoords.y *= screenRatio;
        
    }

    float alpha = 1.0;
    vec4 texture = texture2D(image1, textureCoords);

    gl_FragColor = vec4(texture.rgb, alpha);

    float colorStrength = length(texture.xyz);
    // float maxColorStrength = reverseRemapFreq(0.0, 2.0);
    float maxColorStrength = reverseRemapFreq(0.0, 2.3);
    
    if(
        colorStrength > maxColorStrength
    ) {
        discard;
    }
}
