import Hud from "./components/hud/Hud";
import { jsx } from "./core/components";
import { Node } from "./core/components/Node";
import { SceneManager } from "./core/scenes/SceneManager";
import { StyleManager } from "./core/scenes/StyleManager";
import { SceneManagerConfig } from "./scenes";
import { TransitionOverlay } from "./components/transition/TransitionOverlay";

export const GameTree = () => (
	<Node name="GameTree">
		<StyleManager name="StyleManager" />
		<SceneManager
			name="SceneManager"
			config={SceneManagerConfig}
		/>

		<TransitionOverlay />
		<Hud />
	</Node>
);
