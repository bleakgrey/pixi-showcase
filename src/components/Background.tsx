import { Point, Texture, Ticker } from "pixi.js";
import { TiledSprite } from "../core/components/TiledSprite";
import { UiLayer } from "./UiLayer";
import { jsx, Sprite } from "../core/components";

const textureOffset = new Point();

export const Background = (props: any) => {
	let Bg!: TiledSprite;

	const root = (
		<UiLayer dimensions={{ x: 800, y: 800 }}>
			<Sprite
				texture={Texture.WHITE}
				filling={{ x: 1, y: 1 }}
				anchor={{ x: 0, y: 0 }}
				tint={props.color ?? 0xfafafa}
			/>
			<TiledSprite
				ref={(self: TiledSprite) => Bg = self}
				asset={props.asset}
				filling={{ x: 1, y: 1 }}
				alpha={props.opacity ?? 0.05}
			/>
		</UiLayer>
	);

	const tick = (delta: number) => {
		textureOffset.x += 0.1 * delta;
		textureOffset.y += 0.1 * delta;
		Bg.tilePosition.copyFrom(textureOffset);
	};

	root.on("added", () => Ticker.shared.add(tick));
	root.on("removed", () => Ticker.shared.remove(tick));

	return root;
};
