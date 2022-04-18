/**
 * @author sunag / http://www.sunag.com.br/
 * https://github.com/mrdoob/three.js/blob/a22ddd6561be7afe9e6bbfd7ced56337a1bf73c0/examples/jsm/nodes/core/ExpressionNode.js
 */

import { FunctionNode } from './FunctionNode.js';

export function ExpressionNode( src, type, keywords, extensions, includes ) {

	FunctionNode.call( this, src, includes, extensions, keywords, type );

}

ExpressionNode.prototype = Object.create( FunctionNode.prototype );
ExpressionNode.prototype.constructor = ExpressionNode;
ExpressionNode.prototype.nodeType = "Expression";
