/**
 * @author sunag / http://www.sunag.com.br/
 * https://github.com/mrdoob/three.js/blob/a22ddd6561be7afe9e6bbfd7ced56337a1bf73c0/examples/jsm/nodes/accessors/UVNode.js
 */

 import { TempNode } from './TempNode.js';
 import { NodeLib } from './NodeLib.js';
 
 var vertexDict = [ 'uv', 'uv2' ],
   fragmentDict = [ 'vUv', 'vUv2' ];
 
export function UVNode( index ) {
 
   TempNode.call( this, 'v2', { shared: false } );
 
   this.index = index || 0;
 
 }
 
 UVNode.prototype = Object.create( TempNode.prototype );
 UVNode.prototype.constructor = UVNode;
 UVNode.prototype.nodeType = "UV";
 
 UVNode.prototype.generate = function ( builder, output ) {
 
   builder.requires.uv[ this.index ] = true;
 
   var result = builder.isShader( 'vertex' ) ? vertexDict[ this.index ] : fragmentDict[ this.index ];
 
   return builder.format( result, this.getType( builder ), output );
 
 };
 
 UVNode.prototype.copy = function ( source ) {
 
   TempNode.prototype.copy.call( this, source );
 
   this.index = source.index;
 
   return this;
 
 };
 
 UVNode.prototype.toJSON = function ( meta ) {
 
   var data = this.getJSONNode( meta );
 
   if ( ! data ) {
 
     data = this.createJSONNode( meta );
 
     data.index = this.index;
 
   }
 
   return data;
 
 };
 
 NodeLib.addKeyword( 'uv', function () {
 
   return new UVNode();
 
 } );
 
 NodeLib.addKeyword( 'uv2', function () {
 
   return new UVNode( 1 );
 
 } );
