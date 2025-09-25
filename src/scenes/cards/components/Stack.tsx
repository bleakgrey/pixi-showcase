import { DisplayObject, Point } from "pixi.js";
import { jsx, Sprite } from "../../../core/components";
import { Node } from "../../../core/components/Node";
import { AssetAlias } from "../../../Assets";

export class Stack extends Node {
	public padding = 1;

	public constructor() {
		super();
		this.addChild(<Sprite asset={AssetAlias.CARD_PLACEHOLDER} />);
	}

	public getCardPosition() {
		const childrenCount = this.children.length;

		return new Point(0, childrenCount * this.padding);
	}

	public pushCard(card: DisplayObject) {
		card.position.copyFrom(this.getCardPosition());
		this.addChild(card);
	}

	public popCard() {
		if (this.children.length <= 1) { // Accounts for the placeholder
			return;
		}

		const card = this.children.pop();
		if (card) {
			const globalPos = card.getGlobalPosition();
			this.parent.addChild(card);
			card.position.copyFrom(this.parent.toLocal(globalPos));
		}

		return card;
	}
}
