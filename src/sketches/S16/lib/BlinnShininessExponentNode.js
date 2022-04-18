/**
 * @author sunag / http://www.sunag.com.br/
 * https://github.com/mrdoob/three.js/blob/a22ddd6561be7afe9e6bbfd7ced56337a1bf73c0/examples/jsm/nodes/bsdfs/BlinnShininessExponentNode.js
 */

import { TempNode } from './TempNode.js';

export function BlinnShininessExponentNode() {

	TempNode.call( this, 'f' );

}

BlinnShininessExponentNode.prototype = Object.create( TempNode.prototype );
BlinnShininessExponentNode.prototype.constructor = BlinnShininessExponentNode;
BlinnShininessExponentNode.prototype.nodeType = "BlinnShininessExponent";

BlinnShininessExponentNode.prototype.generate = function ( builder, output ) {

	if ( builder.isCache( 'clearCoat' ) ) {

		return builder.format( 'Material_ClearCoat_BlinnShininessExponent( material )', this.type, output );

	} else {

		return builder.format( 'Material_BlinnShininessExponent( material )', this.type, output );

	}

};
