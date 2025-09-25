import gsap from "gsap";
import { jsx, Sprite } from "../../../core/components";
import { Node } from "../../../core/components/Node";

export class Avatar extends Node {
	private _asset = "";

	private _avatar: Sprite;

	private _active = false;

	public set asset(val: string) {
		this._asset = val;
		this._avatar.asset = val;
	}
	public get asset() {
		return this._asset;
	}

	public set active(val) {
		this._active = val;

		if (val) {
			gsap.timeline()
				.to(this, { alpha: 1 }, "<")
				.to(this.scale, { x: 1, y: 1, duration: 0.25 }, "<");
		} else {
			gsap.timeline()
				.to(this, { alpha: 0.5 }, "<")
				.to(this.scale, { x: 0.8, y: 0.8, duration: 0.25 }, "<");
		}
	}
	public get active() {
		return this._active;
	}

	public constructor() {
		super();

		this._avatar = this.addChild(
			<Sprite
				width={180}
				height={180}
				anchor={{ x: 0.5, y: 1 }}
			/>,
		) as Sprite;
	}
}
