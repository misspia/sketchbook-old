uniform sampler2D tDiffuse;
uniform sampler2D tShadow;
uniform vec2 iResolution;

varying vec2 vUv;

// Edge detection pass
#define Sensitivity (vec2 (0.3, 1.5) * iResolution.y / 400.0)
float checkSame (vec4 center, vec4 samplef)
{
    vec2 centerNormal = center.xy;
    float centerDepth = center.z;
    vec2 sampleNormal = samplef.xy;
    float sampleDepth = samplef.z;
    vec2 diffNormal = abs (centerNormal - sampleNormal) * Sensitivity.x;
    bool isSameNormal = (diffNormal.x + diffNormal.y) <0.1;
    float diffDepth = abs (centerDepth - sampleDepth) * Sensitivity.y;
    bool isSameDepth = diffDepth <0.1;
    return (isSameNormal && isSameDepth)? 1.0: 0.0;
}
void main () {
    vec4 sample0 = texture2D(tDiffuse, vUv);
    vec4 sample1 = texture2D(tDiffuse, vUv + ( vec2 ( 1.0 , 1.0 ) / iResolution.xy));
    vec4 sample2 = texture2D(tDiffuse, vUv + ( vec2 ( - 1.0 , - 1.0 ) / iResolution.xy));
    vec4 sample3 = texture2D(tDiffuse, vUv + ( vec2 ( - 1.0 , 1.0 ) / iResolution.xy));
    vec4 sample4 = texture2D(tDiffuse, vUv + ( vec2 ( 1.0 , - 1.0 ) / iResolution.xy));

    float shadow = texture2D(tShadow, vUv).x;
    float edge = checkSame(sample1, sample2) * checkSame (sample3, sample4);
    gl_FragColor = vec4 (edge, shadow, 1.0, 1.0);
}
