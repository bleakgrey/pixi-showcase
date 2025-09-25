import Styles from "./Styles";
import { AssetAlias } from "../../Assets";
import { UiLayer } from "../../components/UiLayer";
import { jsx, Sprite } from "../../core/components";
import { Viewfinder } from "../../core/components/Viewfinder";
import { Node } from "../../core/components/Node";
import { SceneButton } from "./components/SceneButton";
import { Background } from "../../components/Background";

export const View = () => {
	return (
		<Node>
			<Background asset={AssetAlias.PATTERN_STRIPE} />
			<UiLayer
				style={Styles.CONTAINER}
			>
				<Viewfinder />
				<Sprite
					style={Styles.LOGO}
					asset={AssetAlias.LOGO}
				/>
				<Node style={Styles.LIST}>
					<SceneButton
						sceneName={"cards"}
						text={"Ace of Shadows"}
						y={-100}
					/>
					<SceneButton
						sceneName={"dialogue"}
						text={"Magic Words"}
						y={0}
					/>
					<SceneButton
						sceneName={"fire"}
						text={"Phoenix Flame"}
						y={100}
					/>
				</Node>
			</UiLayer>
		</Node>
	);
};
