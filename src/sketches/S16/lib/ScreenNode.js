/**
 * @author sunag / http://www.sunag.com.br/
 * https://github.com/mrdoob/three.js/blob/a22ddd6561be7afe9e6bbfd7ced56337a1bf73c0/examples/jsm/nodes/inputs/ScreenNode.js
 */

 import { InputNode } from './InputNode.js';
 import { TextureNode } from './TextureNode.js';
 
export function ScreenNode( uv ) {
 
   TextureNode.call( this, undefined, uv );
 
 }
 
 ScreenNode.prototype = Object.create( TextureNode.prototype );
 ScreenNode.prototype.constructor = ScreenNode;
 ScreenNode.prototype.nodeType = "Screen";
 
 ScreenNode.prototype.getUnique = function () {
 
   return true;
 
 };
 
 ScreenNode.prototype.getTexture = function ( builder, output ) {
 
   return InputNode.prototype.generate.call( this, builder, output, this.getUuid(), 't', 'renderTexture' );
 
 };
 