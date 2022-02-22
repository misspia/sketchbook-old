precision highp float;

varying float vFreq;
varying vec2 vUv;
varying vec3 vPosition;

uniform float minZ; 

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
    float alpha = 1.0;
        
    if(vFreq < 20.0) {
      alpha = remap(0.0, 20.0, 0.0, 1.0, vFreq);
    }

    gl_FragColor = vec4(0.0, 0.0, 0.0, alpha);
    
    if(
        gl_PointCoord.x < 0.495 ||
        gl_PointCoord.x > 0.505 ||
        gl_PointCoord.y < 0.495 ||
        gl_PointCoord.y > 0.50
      ) {
      discard;
    }

}
