import { Sprite as PixiSprite, Texture } from 'pixi.js'
import { getTexture } from '../Helpers'
import { NodeProps } from './Node';

export class Sprite extends PixiSprite {
	private props!: NodeProps;

	private currentAsset = ''

	public get asset() {
		return this.currentAsset
	}
	public set asset(val: string) {
		this.currentAsset = val

		if (val) {
			this.texture = getTexture(val)
		}
	}

	public override set texture(val: Texture) {
		super.texture = val
	}
	public override get texture() {
		return super.texture
	}

	public set anchorX(val: number) {
		this.anchor.x = val
	}
	public get anchorX() {
		return this.anchor.x
	}
	public set anchorY(val: number) {
		this.anchor.y = val
	}
	public get anchorY() {
		return this.anchor.y
	}

	public set scaleX(val: number) {
		this.scale.x = val
	}
	public get scaleX() {
		return this.scale.x
	}
	public set scaleY(val: number) {
		this.scale.y = val
	}
	public get scaleY() {
		return this.scale.y
	}

	constructor() {
		super(Texture.EMPTY)
		this.anchor.set(0.5, 0.5)
	}
}
