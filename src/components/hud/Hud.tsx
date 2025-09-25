import Styles from "./Styles";
import { jsx } from "../../core/components";
import { UiLayer } from "../UiLayer";
import { AssetAlias } from "../../Assets";
import { Node } from "../../core/components/Node";
import { Viewfinder } from "../../core/components/Viewfinder";
import { Label } from "../../core/components/Label";
import { HudToggleButton } from "./HudToggleButton";
import { CoreEvents, EventBus, GameModel, Services, Ticker } from "../../core";
import { overlaySceneTransition } from "../transition/OverlaySceneTransition";

export default () => {
	const gameModel = Services.get(GameModel);
	const eventBus = Services.get(EventBus);

	let FpsLabel!: Label;
	let BackButton: Node;

	Ticker.shared.add(() => {
		FpsLabel.text = `FPS: ${Math.floor(Ticker.shared.FPS)}`;
	});

	const onSceneSwitched = (sceneName: String) => {
		if (sceneName === "menu") {
			BackButton.alpha = 0.5;
			BackButton.eventMode = "none";
		} else {
			BackButton.alpha = 1;
			BackButton.eventMode = "static";
		}
	};

	eventBus.on(CoreEvents.SWITCH_SCENE, onSceneSwitched);
	eventBus.on(CoreEvents.SCENE_READY, onSceneSwitched);

	return (
		<UiLayer name="Hud" style={Styles.CONTAINER}>
			<Viewfinder
				asset={AssetAlias.DEBUG_FRAME}
				padding={64}
				filling={{ x: 1, y: 1 }}
			/>

			<Node alignment={{ x: 0, y: 0 }} pivot={{ x: -80, y: -80 }}>
				<HudToggleButton
					ref={(self: HudToggleButton) => BackButton = self}
					offAsset={AssetAlias.ICON_BACK}
					onValueChanged={() =>
						eventBus.emit(
							CoreEvents.SWITCH_SCENE,
							"menu",
							overlaySceneTransition(),
						)}
					onReady={(self: HudToggleButton) => {
						self.value = false;
					}}
				/>

				<Label
					ref={(node: Label) => FpsLabel = node}
					x={80}
					y={0}
					fontName={"TobiGreekCyrillicRegular"}
					fontSize={32}
					text={""}
					anchor={{ x: 0, y: 0.5 }}
					tint={0x392f68}
				/>
			</Node>

			<Node alignment={{ x: 1, y: 0 }} pivot={{ x: 80, y: -80 }}>
				<HudToggleButton
					onAsset={AssetAlias.ICON_FULLSCREEN_LEAVE}
					offAsset={AssetAlias.ICON_FULLSCREEN_ENTER}
					onValueChanged={() =>
						eventBus.emit(CoreEvents.TOGGLE_FULLSCREEN)}
					onReady={(self: HudToggleButton) => {
						self.value = gameModel.fullscreen;
						gameModel.on("fullscreen", (value: boolean) =>
							self.value = value);
					}}
				/>

				<HudToggleButton
					visible={false}
					x={-120}
					onAsset={AssetAlias.ICON_MUSIC_OFF}
					offAsset={AssetAlias.ICON_MUSIC}
					onValueChanged={() =>
						eventBus.emit(CoreEvents.TOGGLE_SOUND)}
					onReady={(self: HudToggleButton) => {
						self.value = gameModel.muted;
						gameModel.on(
							"muted",
							(value: boolean) => self.value = value,
						);
					}}
				/>
			</Node>
		</UiLayer>
	);
};
