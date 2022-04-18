/**
 * @author sunag / http://www.sunag.com.br/
 * https://github.com/mrdoob/three.js/blob/a22ddd6561be7afe9e6bbfd7ced56337a1bf73c0/examples/jsm/nodes/inputs/ColorNode.js
 */

import { Color } from 'three';

import { InputNode } from './InputNode.js';
import { NodeUtils } from './NodeUtils.js';

export function ColorNode( color, g, b ) {

	InputNode.call( this, 'c' );

	this.value = color instanceof Color ? color : new Color( color || 0, g, b );

}

ColorNode.prototype = Object.create( InputNode.prototype );
ColorNode.prototype.constructor = ColorNode;
ColorNode.prototype.nodeType = "Color";

NodeUtils.addShortcuts( ColorNode.prototype, 'value', [ 'r', 'g', 'b' ] );

ColorNode.prototype.generateReadonly = function ( builder, output, uuid, type/*, ns, needsUpdate */ ) {

	return builder.format( "vec3( " + this.r + ", " + this.g + ", " + this.b + " )", type, output );

};

ColorNode.prototype.copy = function ( source ) {

	InputNode.prototype.copy.call( this, source );

	this.value.copy( source );

	return this;

};

ColorNode.prototype.toJSON = function ( meta ) {

	var data = this.getJSONNode( meta );

	if ( ! data ) {

		data = this.createJSONNode( meta );

		data.r = this.r;
		data.g = this.g;
		data.b = this.b;

		if ( this.readonly === true ) data.readonly = true;

	}

	return data;

};
