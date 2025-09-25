import { AssetAlias } from "../../Assets";
import { Background } from "../../components/Background";
import { UiLayer } from "../../components/UiLayer";
import { jsx } from "../../core/components";
import { Node } from "../../core/components/Node";
import { Viewfinder } from "../../core/components/Viewfinder";
import { Stack } from "./components/Stack";
import { Card } from "./components/Card";
import { getPointsOnCircle, randomElement } from "../../core/Helpers";
import gsap from "gsap";

export const View = () => {
	const sourceStack = <Stack alignment={{ x: 0.225, y: 0.5 }} /> as Stack;
	const destStacksOrigin = <Node alignment={{ x: 0.625, y: 0.5 }} />;
	const destStacks: Stack[] = [];

	// Cards for the source stack
	for (let i = 0; i < 144; i++) {
		const card = <Card />;
		sourceStack.pushCard(card);
	}

	// Create destination stacks
	const stackPositions = getPointsOnCircle(0, 0, 150, 3);
	for (const stackPosition of stackPositions) {
		const stack = <Stack position={stackPosition} /> as Stack;
		destStacks.push(stack);
		destStacksOrigin.addChild(stack);
	}

	const playCardAnim = () => {
		const targetStack = randomElement(destStacks);
		const card = sourceStack.popCard();

		if (!card) {
			return;
		}

		const destPos = card.parent.toLocal(targetStack.getGlobalPosition());
		const offsetPos = targetStack.getCardPosition();

		gsap.timeline({ delay: 1 })
			//Pick up
			.to(card.scale, { x: 1.25, y: 1.25, duration: 0.5 }, ">")
			.to(card, { angle: 6, duration: 1 }, "<")
			// Move
			.to(card, {
				x: destPos.x + offsetPos.x,
				y: destPos.y + offsetPos.y,
				ease: "power1.out",
				duration: 2,
			}, "<")
			// Put down
			.call(() => {
				targetStack.pushCard(card);
				playCardAnim();
			})
			.to(card.scale, { x: 1, y: 1, duration: 0.5 }, ">")
			.to(card, { angle: 0, duration: 0.15 }, "<");
	};

	// Start the animation with a slight delay to account for the scene transition
	gsap.timeline({ delay: 1 }).call(() => playCardAnim());

	return (
		<Node>
			<Background asset={AssetAlias.PATTERN_STAR} />
			<UiLayer centerOnStage={true} dimensions={{ x: 700, y: 700 }}>
				<Viewfinder />
				{sourceStack}
				{destStacksOrigin}
			</UiLayer>
		</Node>
	);
};
