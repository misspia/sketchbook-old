/**
 * @author sunag / http://www.sunag.com.br/
 * https://github.com/mrdoob/three.js/blob/a22ddd6561be7afe9e6bbfd7ced56337a1bf73c0/examples/jsm/nodes/effects/LuminanceNode.js
 */

import { TempNode } from './TempNode.js';
import { ConstNode } from './ConstNode.js';
import { FunctionNode } from './FunctionNode.js';

export function LuminanceNode( rgb ) {

	TempNode.call( this, 'f' );

	this.rgb = rgb;

}

LuminanceNode.Nodes = ( function () {

	var LUMA = new ConstNode( "vec3 LUMA vec3( 0.2125, 0.7154, 0.0721 )" );

	var luminance = new FunctionNode( [
		// Algorithm from Chapter 10 of Graphics Shaders
		"float luminance( vec3 rgb ) {",

		"	return dot( rgb, LUMA );",

		"}"
	].join( "\n" ), [ LUMA ] );

	return {
		LUMA: LUMA,
		luminance: luminance
	};

} )();

LuminanceNode.prototype = Object.create( TempNode.prototype );
LuminanceNode.prototype.constructor = LuminanceNode;
LuminanceNode.prototype.nodeType = "Luminance";

LuminanceNode.prototype.generate = function ( builder, output ) {

	var luminance = builder.include( LuminanceNode.Nodes.luminance );

	return builder.format( luminance + '( ' + this.rgb.build( builder, 'v3' ) + ' )', this.getType( builder ), output );

};

LuminanceNode.prototype.copy = function ( source ) {

	TempNode.prototype.copy.call( this, source );

	this.rgb = source.rgb;

	return this;

};

LuminanceNode.prototype.toJSON = function ( meta ) {

	var data = this.getJSONNode( meta );

	if ( ! data ) {

		data = this.createJSONNode( meta );

		data.rgb = this.rgb.toJSON( meta ).uuid;

	}

	return data;

};
