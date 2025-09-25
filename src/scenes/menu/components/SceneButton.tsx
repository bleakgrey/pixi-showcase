import { AssetAlias } from "../../../Assets";
import { FeedbackNode } from "../../../components/FeedbackNode";
import { overlaySceneTransition } from "../../../components/transition/OverlaySceneTransition";
import { CoreEvents, EventBus, Services } from "../../../core";
import { jsx } from "../../../core/components";
import { Frame } from "../../../core/components/Frame";
import { Label } from "../../../core/components/Label";

export const SceneButton = (props: any) => {
	const eventBus = Services.get(EventBus);

	return (
		<FeedbackNode
			onClick={() => {
				eventBus.emit(
					CoreEvents.SWITCH_SCENE,
					props.sceneName,
					overlaySceneTransition(),
				);
			}}
		>
			<Frame
				asset={AssetAlias.BG_A}
				width={500}
				height={100}
				anchor={{ x: 0.5, y: 0.5 }}
				padding={40}
				tint={0x392f68}
			/>
			<Label text={props.text} />
		</FeedbackNode>
	);
};
