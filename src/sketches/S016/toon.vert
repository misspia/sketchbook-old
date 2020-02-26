precision highp float;

varying vec3 vNormal;
// attribute vec2 uv;

// uniform mat4 projectionMatrix;
// uniform mat4 modelViewMatrix;

varying vec2 vUv;
varying vec3 vRefract;

void main () {
    vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
	vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
	vec3 worldNormal = normalize ( mat3( modelMatrix[0].xyz, modelMatrix[1].xyz, modelMatrix[2].xyz ) * normal );

    vNormal = normalize( normalMatrix * normal );
    vUv = uv;

    vec3 I = worldPosition.xyz - cameraPosition;
    vRefract = refract( normalize( I ), worldNormal, 1.02 );

    gl_Position = projectionMatrix * mvPosition;
}
