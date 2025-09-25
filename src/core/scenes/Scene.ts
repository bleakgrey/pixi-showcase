import { Container, DisplayObject } from "pixi.js";

export class Scene extends Container {
	public readonly view: () => DisplayObject

	public async onEnter() { }

	public async onLeave() { }

	public constructor(view: () => DisplayObject) {
		super()
		this.view = view;
	}
}