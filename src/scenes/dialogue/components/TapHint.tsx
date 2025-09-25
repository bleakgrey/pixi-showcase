import gsap from "gsap";
import { jsx } from "../../../core/components";
import { Label } from "../../../core/components/Label";

export const TapHint = () => {
	const root = (
		<Label
			text="Tap to continue..."
			fontSize="24"
			alignment={{ x: 0.5, y: 0.96 }}
			tint={0xff4a76}
		/>
	);

	gsap.timeline({ repeat: -1, yoyo: true }).fromTo(
		root,
		{ alpha: 0.25 },
		{ alpha: 1 },
	);

	return root;
};
