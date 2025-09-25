import { AssetAlias } from "../../Assets";
import { jsx, Sprite } from "../../core/components";
import { Frame } from "../../core/components/Frame";
import { Pivot } from "../../core/components/Pivot";
import { FeedbackNode } from "../FeedbackNode";

export class HudToggleButton extends FeedbackNode {
	private _iconSprite!: Sprite;

	private _value = false;

	public onAsset: string = "";

	public offAsset: string = "";

	public onValueChanged = (value: boolean, self: HudToggleButton) => {};

	public onReady = (self: HudToggleButton) => {};

	public get value() {
		return this._value;
	}
	public set value(val) {
		this._value = val;
		this._iconSprite.asset = val ? this.onAsset : this.offAsset;
	}

	public constructor() {
		super();
		this.addChild(
			<Frame
				asset={AssetAlias.BG_A}
				width={120}
				height={120}
				anchor={{ x: 0.5, y: 0.5 }}
				padding={40}
				tint={0x392f68}
			/>,
		);
		this._iconSprite = this.addChild(
			<Sprite scale={{ x: 0.6, y: 0.6 }} />,
		) as Sprite;

		this.onClick = () => this.onValueChanged(!this.value, this);
	}

	protected onAdded() {
		this.onReady(this);
	}
}
