import { NineSlicePlane, Texture, Point } from "pixi.js"
import { getTexture } from "../Helpers"
import { Node } from "./Node"

export class Frame extends Node {
	private _asset: string = ''
	private _nineSlice: NineSlicePlane
	private _anchor: Point = new Point(0, 0)

	public constructor() {
		super()
		this._nineSlice = new NineSlicePlane(Texture.WHITE)
		this.addChild(this._nineSlice)
	}

	public get width() {
		return this._nineSlice.width;
	}
	public set width(val) {
		this._nineSlice.width = val;
	}
	public get height() {
		return this._nineSlice.height;
	}
	public set height(val) {
		this._nineSlice.height = val;
	}

	public get asset() {
		return this._asset
	}
	public set asset(val: string) {
		this._asset = val

		if (val) {
			this._nineSlice.texture = getTexture(val)
		}
	}

	public get texture() {
		return this._nineSlice.texture
	}
	public set texture(val: Texture) {
		this._nineSlice.texture = val
	}

	public get anchor() {
		return this._anchor
	}
	public set anchor(val: Point) {
		this._anchor = val
		this.updatePosition()
	}

	public get tint() {
		return this._nineSlice.tint;
	}
	public set tint(val) {
		this._nineSlice.tint = val;
	}

	private updatePosition() {
		this._nineSlice.x = -this._nineSlice.width * this._anchor.x
		this._nineSlice.y = -this._nineSlice.height * this._anchor.y
	}

	public set padding(val: number) {
		this._nineSlice.topHeight = val
		this._nineSlice.rightWidth = val
		this._nineSlice.bottomHeight = val
		this._nineSlice.leftWidth = val
		this.updatePosition()
	}

	public set paddings(val: number[]) {
		this._nineSlice.topHeight = val[0]
		this._nineSlice.rightWidth = val[1]
		this._nineSlice.bottomHeight = val[2]
		this._nineSlice.leftWidth = val[3]
		this.updatePosition()
	}
}
