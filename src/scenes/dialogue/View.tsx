import { AssetAlias } from "../../Assets";
import { Background } from "../../components/Background";
import { UiLayer } from "../../components/UiLayer";
import { jsx } from "../../core/components";
import { Node } from "../../core/components/Node";
import { Viewfinder } from "../../core/components/Viewfinder";
import { IDialogueScript } from "./Types";
import { RichLabel } from "./components/RichLabel";
import { Frame } from "../../core/components/Frame";
import { Label } from "../../core/components/Label";
import { Avatar } from "./components/Avatar";
import { Assets } from "pixi.js";
import { TapHint } from "./components/TapHint";

export const View = () => {
	let CurrentLine!: RichLabel;
	let SpeakerName!: Label;
	let ClickHint!: Label;
	let LeftAvatar!: Avatar;
	let RightAvatar!: Avatar;

	const script: IDialogueScript = Assets.get(AssetAlias.DIALOGUE_SCRIPT);
	let currentLineIdx = 0;
	let lastSpeakingAvatar: Avatar;

	const getLineData = (idx: number) => {
		const line = script.dialogue[idx];
		let lineAvatar = script.avatars.find((ava) => ava.name === line.name);

		if (!lineAvatar) {
			console.warn(
				`Invalid speaker "${line.name}" at line ${idx}: "${line.text}"`,
			);
			lineAvatar = script.avatars[1]!;
		}

		return { line, lineAvatar };
	};

	const advanceDialogue = () => {
		const { line, lineAvatar } = getLineData(currentLineIdx);

		const SpeakingAvatar = lineAvatar.position === "left"
			? LeftAvatar
			: RightAvatar;
		CurrentLine.text = line.text;
		SpeakerName.text = line.name;
		SpeakingAvatar.asset = lineAvatar.name;
		SpeakingAvatar.active = true;

		if (lastSpeakingAvatar) {
			lastSpeakingAvatar.active = lastSpeakingAvatar === SpeakingAvatar;
		}
		lastSpeakingAvatar = SpeakingAvatar;

		if (!script.dialogue[currentLineIdx + 1]) {
			ClickHint.visible = false;
			root.eventMode = "none";
			root.onpointerup = null;
		} else {
			currentLineIdx++;
		}
	};

	const root = (
		<Node eventMode="static" cursor="pointer" onpointerup={advanceDialogue}>
			<Background asset={AssetAlias.PATTERN_HEART} />
			<UiLayer dimensions={{ x: 600, y: 800 }} centerOnStage={true}>
				<Viewfinder />

				<Avatar
					ref={(self: Avatar) =>
						LeftAvatar = self}
					alignment={{ x: 0.2, y: 0.7 }}
				/>
				<Avatar
					ref={(self: Avatar) =>
						RightAvatar = self}
					alignment={{ x: 0.8, y: 0.7 }}
				/>

				<Frame
					asset={AssetAlias.BG_A}
					padding={40}
					width={600}
					height={200}
					anchor={{ x: 0.5, y: 1 }}
					alignment={{ x: 0.5, y: 0.93 }}
					tint={0x392f68}
				/>

				<RichLabel
					ref={(self: RichLabel) =>
						CurrentLine = self}
					x={50}
					y={600}
					fontSize={24}
					maxWidth={490}
					anchor={{ x: 0, y: 0 }}
				/>

				<Node x={20} y={526}>
					<Frame
						asset={AssetAlias.BG_A}
						padding={40}
						width={200}
						height={60}
						x={20}
						tint={0xff4a76}
					/>
					<Label
						ref={(self: Label) => SpeakerName = self}
						x={120}
						y={18}
						fontSize={24}
						anchor={{ x: 0.5, y: 0 }}
					/>
				</Node>

				<TapHint ref={(self: Label) => ClickHint = self} />
			</UiLayer>
		</Node>
	);

	advanceDialogue();

	return root;
};
