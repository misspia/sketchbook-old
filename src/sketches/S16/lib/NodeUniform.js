/**
 * @author sunag / http://www.sunag.com.br/
 * https://github.com/mrdoob/three.js/blob/a22ddd6561be7afe9e6bbfd7ced56337a1bf73c0/examples/jsm/nodes/core/NodeUniform.js
 */

 export function NodeUniform( params ) {

	params = params || {};

	this.name = params.name;
	this.type = params.type;
	this.node = params.node;
	this.needsUpdate = params.needsUpdate;

}

Object.defineProperties( NodeUniform.prototype, {

	value: {

		get: function () {

			return this.node.value;

		},

		set: function ( val ) {

			this.node.value = val;

		}

	}

} );
