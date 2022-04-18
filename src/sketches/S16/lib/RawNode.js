/**
 * @author sunag / http://www.sunag.com.br/
 * https://github.com/mrdoob/three.js/blob/a22ddd6561be7afe9e6bbfd7ced56337a1bf73c0/examples/jsm/nodes/materials/nodes/RawNode.js
 */

 import { Node } from './Node.js';

export function RawNode( value ) {
 
   Node.call( this, 'v4' );
 
   this.value = value;
 
 }
 
 RawNode.prototype = Object.create( Node.prototype );
 RawNode.prototype.constructor = RawNode;
 RawNode.prototype.nodeType = "Raw";
 
 RawNode.prototype.generate = function ( builder ) {
 
   var data = this.value.analyzeAndFlow( builder, this.type ),
     code = data.code + '\n';
 
   if ( builder.isShader( 'vertex' ) ) {
 
     code += 'gl_Position = ' + data.result + ';';
 
   } else {
 
     code += 'gl_FragColor = ' + data.result + ';';
 
   }
 
   return code;
 
 };
 
 RawNode.prototype.copy = function ( source ) {
 
   Node.prototype.copy.call( this, source );
 
   this.value = source.value;
 
   return this;
 
 };
 
 RawNode.prototype.toJSON = function ( meta ) {
 
   var data = this.getJSONNode( meta );
 
   if ( ! data ) {
 
     data = this.createJSONNode( meta );
 
     data.value = this.value.toJSON( meta ).uuid;
 
   }
 
   return data;
 
 };
