/**
 * Three.js Afterimage pass using a custom shader. Original class found here:
 * https://github.com/mrdoob/three.js/blob/dev/examples/jsm/postprocessing/AfterimagePass.js
 */

import {
	LinearFilter,
	MeshBasicMaterial,
	NearestFilter,
	RGBAFormat,
	ShaderMaterial,
	UniformsUtils,
	WebGLRenderTarget,
} from 'three';
import { Pass } from 'three/examples/jsm/postprocessing/Pass';
// import { AfterimageShader } from 'three/examples/jsm/shaders/AfterimageShader';

import { FullScreenQuad } from "./fullScreenQuad"

import vertexShader from "./shaders/afterimage.vert"
import fragmentShader from "./shaders/afterimage.frag"

const AfterimageShader = {
	uniforms: {
		'damp': { value: 0.96 },
		'tOld': { value: null },
		'tNew': { value: null }
	},
	vertexShader,
	fragmentShader,
}

export class AfterimagePass extends Pass {

	constructor( damp = 0.96 ) {

		super();

		if ( AfterimageShader === undefined ) console.error( 'THREE.AfterimagePass relies on AfterimageShader' );

		this.shader = AfterimageShader;

		this.uniforms = UniformsUtils.clone( this.shader.uniforms );

		this.uniforms[ 'damp' ].value = damp;

		this.textureComp = new WebGLRenderTarget( window.innerWidth, window.innerHeight, {

			minFilter: LinearFilter,
			magFilter: NearestFilter,
			format: RGBAFormat

		} );

		this.textureOld = new WebGLRenderTarget( window.innerWidth, window.innerHeight, {

			minFilter: LinearFilter,
			magFilter: NearestFilter,
			format: RGBAFormat

		} );

		this.shaderMaterial = new ShaderMaterial( {

			uniforms: this.uniforms,
			vertexShader: this.shader.vertexShader,
			fragmentShader: this.shader.fragmentShader

		} );

		this.compFsQuad = new FullScreenQuad( this.shaderMaterial );

		const material = new MeshBasicMaterial();
		this.copyFsQuad = new FullScreenQuad( material );

	}

	render( renderer, writeBuffer, readBuffer/*, deltaTime, maskActive*/ ) {

		this.uniforms[ 'tOld' ].value = this.textureOld.texture;
		this.uniforms[ 'tNew' ].value = readBuffer.texture;

		renderer.setRenderTarget( this.textureComp );
		this.compFsQuad.render( renderer );

		this.copyFsQuad.material.map = this.textureComp.texture;

		if ( this.renderToScreen ) {

			renderer.setRenderTarget( null );
			this.copyFsQuad.render( renderer );

		} else {

			renderer.setRenderTarget( writeBuffer );

			if ( this.clear ) renderer.clear();

			this.copyFsQuad.render( renderer );

		}

		// Swap buffers.
		const temp = this.textureOld;
		this.textureOld = this.textureComp;
		this.textureComp = temp;
		// Now textureOld contains the latest image, ready for the next frame.

	}

	setSize( width, height ) {

		this.textureComp.setSize( width, height );
		this.textureOld.setSize( width, height );

	}

}
