/**
 * @author sunag / http://www.sunag.com.br/
 * https://github.com/mrdoob/three.js/blob/a22ddd6561be7afe9e6bbfd7ced56337a1bf73c0/examples/jsm/nodes/inputs/Vector2Node.js
 */

import { Vector2 } from 'three';

import { InputNode } from './InputNode.js';
import { NodeUtils } from './NodeUtils.js';

export function Vector2Node( x, y ) {

	InputNode.call( this, 'v2' );

	this.value = x instanceof Vector2 ? x : new Vector2( x, y );

}

Vector2Node.prototype = Object.create( InputNode.prototype );
Vector2Node.prototype.constructor = Vector2Node;
Vector2Node.prototype.nodeType = "Vector2";

NodeUtils.addShortcuts( Vector2Node.prototype, 'value', [ 'x', 'y' ] );

Vector2Node.prototype.generateReadonly = function ( builder, output, uuid, type/*, ns, needsUpdate*/ ) {

	return builder.format( "vec2( " + this.x + ", " + this.y + " )", type, output );

};

Vector2Node.prototype.copy = function ( source ) {

	InputNode.prototype.copy.call( this, source );

	this.value.copy( source );

	return this;

};

Vector2Node.prototype.toJSON = function ( meta ) {

	var data = this.getJSONNode( meta );

	if ( ! data ) {

		data = this.createJSONNode( meta );

		data.x = this.x;
		data.y = this.y;

		if ( this.readonly === true ) data.readonly = true;

	}

	return data;

};
