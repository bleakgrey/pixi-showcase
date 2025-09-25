import { AssetAlias } from "../../Assets";
import { Background } from "../../components/Background";
import { UiLayer } from "../../components/UiLayer";
import { jsx } from "../../core/components";
import { Node } from "../../core/components/Node";
import { Viewfinder } from "../../core/components/Viewfinder";
import { ParticleEmitter } from "./components/ParticleEmitter";

export const View = () => {
	return (
		<Node>
			<Background
				asset={AssetAlias.PATTERN_WAVE}
				color={0x000000}
				opacity={0}
			/>
			<UiLayer dimensions={{ x: 600, y: 600 }} centerOnStage={true}>
				<Viewfinder />
				<ParticleEmitter alignment={{ x: 0.5, y: 0.5 }} />
			</UiLayer>
		</Node>
	);
};
