import { Texture } from "pixi.js";
import { Sprite } from "./Sprite";
import { jsx } from ".";

export function Pivot() {
	return (
		<Sprite
			visible={import.meta.env.DEV}
			texture={Texture.WHITE}
			width={16}
			height={16}
			tint={0xff0000}
			anchor={{ x: 0.5, y: 0.5 }}
		/>
	)
}
