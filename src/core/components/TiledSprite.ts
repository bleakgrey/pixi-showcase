import { Texture, TilingSprite } from 'pixi.js'
import { getTexture } from '../Helpers'
import { NodeProps } from './Node';

export class TiledSprite extends TilingSprite {
	private props!: NodeProps;

	private _asset = ''

	public get asset() {
		return this._asset
	}
	public set asset(val: string) {
		this._asset = val

		if (val) {
			this.texture = getTexture(val)
		}
	}

	constructor() {
		super(Texture.WHITE, 1, 1)
		this.tileScale.set(1, 1)
	}
}
