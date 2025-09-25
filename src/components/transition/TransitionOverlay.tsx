import { jsx, Sprite, Texture } from "../../core/components";
import { UiLayer } from "../UiLayer";

export let transitionOverlayInstance: UiLayer;

export const TransitionOverlay = () => {
	return (
		<UiLayer
			ref={(self: UiLayer) => transitionOverlayInstance = self}
			name="TransitionOverlay"
			alpha={0}
		>
			<Sprite
				texture={Texture.WHITE}
				tint={0xffffff}
				filling={{ x: 1, y: 1 }}
				anchor={{ x: 0, y: 0 }}
			/>
		</UiLayer>
	);
};
