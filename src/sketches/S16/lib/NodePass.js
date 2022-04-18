/**
 * @author sunag / http://www.sunag.com.br/
 * https://github.com/mrdoob/three.js/blob/a22ddd6561be7afe9e6bbfd7ced56337a1bf73c0/examples/jsm/nodes/postprocessing/NodePass.js
 */

import { MathUtils } from 'three';

import { ShaderPass } from './ShaderPass.js';
import { NodeMaterial } from './NodeMaterial.js';
import { ScreenNode } from './ScreenNode.js';

export function NodePass() {

	ShaderPass.call( this );

	this.name = "";
	this.uuid = MathUtils.generateUUID();

	this.userData = {};

	this.textureID = 'renderTexture';

	this.input = new ScreenNode();

	this.material = new NodeMaterial();

	this.needsUpdate = true;

}

NodePass.prototype = Object.create( ShaderPass.prototype );
NodePass.prototype.constructor = NodePass;

NodePass.prototype.render = function () {

	if ( this.needsUpdate ) {

		this.material.dispose();

		this.material.fragment.value = this.input;

		this.needsUpdate = false;

	}

	this.uniforms = this.material.uniforms;

	ShaderPass.prototype.render.apply( this, arguments );

};

NodePass.prototype.copy = function ( source ) {

	this.input = source.input;

	return this;

};

NodePass.prototype.toJSON = function ( meta ) {

	var isRootObject = ( meta === undefined || typeof meta === 'string' );

	if ( isRootObject ) {

		meta = {
			nodes: {}
		};

	}

	if ( meta && ! meta.passes ) meta.passes = {};

	if ( ! meta.passes[ this.uuid ] ) {

		var data = {};

		data.uuid = this.uuid;
		data.type = "NodePass";

		meta.passes[ this.uuid ] = data;

		if ( this.name !== "" ) data.name = this.name;

		if ( JSON.stringify( this.userData ) !== '{}' ) data.userData = this.userData;

		data.input = this.input.toJSON( meta ).uuid;

	}

	meta.pass = this.uuid;

	return meta;

};
