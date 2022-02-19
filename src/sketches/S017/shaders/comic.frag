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

// https://stackoverflow.com/questions/12293466/render-texture-with-the-right-ratio-in-opengl
// https://stackoverflow.com/questions/35317674/opengl-maintain-texture-width-to-height-ratio
void main() {

    vec2 textureCoords = vUv * 1.0;
    // if(screenRatio > textureRatio) {
    //     // scale down width
    //     textureCoords.x *= textureRatio;
    // } else {
    //     // scale down height
    //     textureCoords.y *= screenRatio;
    // }
    if(screenRatio > textureRatio) {
        // scale down width
        textureCoords.x *= screenRatio;
    } else {
        // scale down height
        textureCoords.y *= screenRatio;
    }
    // textureCoords.x -= 1.0;


    float alpha = 1.0;
    vec4 texture = texture2D(image1, textureCoords);

    gl_FragColor = vec4(texture.rgb, alpha);

    float colorStrength = texture.r + texture.g + texture.b;
    // if(colorStrength > 1.0) {
    //     discard;
    // }
}
