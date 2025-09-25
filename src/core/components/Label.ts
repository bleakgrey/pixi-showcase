import { BitmapText } from 'pixi.js'
import { NodeProps } from './Node';
import { AssetAlias } from '../../Assets';

export class Label extends BitmapText {
	private props!: NodeProps;

	constructor() {
		super('', {
			fontName: AssetAlias.TOBYGREEK,
			fontSize: 42,
			align: 'left',
		})
		this.anchor.set(0.5, 0.5)
	}
}
