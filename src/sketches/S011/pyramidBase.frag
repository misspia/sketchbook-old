precision highp float;

uniform vec3 fogColor;
uniform float fogDensity;

varying vec3 vNormal;

void main() {
    const vec4 blue = vec4(0.0, 0.0, 1.0, 1.0); 
    gl_FragColor = mix(blue, vec4(vNormal, 1.0), 0.45);

    // add fog
    float depth = gl_FragCoord.z / gl_FragCoord.w;
    const float LOG2 = 1.442695;
    float fogFactor = exp2( - fogDensity * fogDensity * depth * depth * LOG2 );
    fogFactor = 1.0 - clamp( fogFactor, 0.0, 1.0 );
    gl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );
}
