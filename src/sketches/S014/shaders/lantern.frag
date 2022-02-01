precision highp float;

varying float vAlpha;
varying float vFreq;
varying vec3 vPosition;

float remap(float min1, float max1, float min2, float max2, float value) {
    return min2 + (max2 - min2) * (value - min1) / (max1 - min1);
}

float remapFreq(float min, float max) {
    return remap(0.0, 255.0, min, max, vFreq);
}

float reverseRemapFreq(float min, float max) {
    return remap(0.0, 255.0, min, max, 255.0 - vFreq);
}


// https://www.pinterest.ca/pin/516295544791990773/
void main() {
    // red
    vec3 color = vec3(
        remap(0.0, 1.0, 0.4, 1.0, 1.0 - gl_PointCoord.y),
        remap(0.0, 1.0, 0.4, 1.0, gl_PointCoord.y),
        remap(0.0, 1.0, 0.4, 1.0, gl_PointCoord.y)
    ); 

    float alpha = remapFreq(0.0, 1.0);
    float xMin = remap(0.0, 1.0, 0.8, 1.0, gl_PointCoord.y); 
    float xMax = remap(0.0, 1.0, 0.0, 0.2, gl_PointCoord.y);

    if(gl_PointCoord.x < 0.5 || gl_PointCoord.x > xMax) {
      alpha = 0.0;
    }
    

    gl_FragColor = vec4(color, 1.0);
}
