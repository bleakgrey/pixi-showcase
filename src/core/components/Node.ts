import { Container } from "pixi.js";

export type NodeProps = {
	[key: string]: any;
};

export class Node extends Container {
	private props!: NodeProps;

	public constructor() {
		super()
		this.on('added', this.onAdded, this)
		this.on('removed', this.onRemoved, this)
	}

	protected onAdded(): void { }

	protected onRemoved(): void { }

	protected log(message: string): void {
		console.log(`[${this.name}] ${message}`)
	}
}