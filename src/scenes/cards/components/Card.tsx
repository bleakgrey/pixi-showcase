import { AssetAlias } from "../../../Assets";
import { jsx } from "../../../core/components";
import { Sprite } from "../../../core/components/Sprite";
import { randomElement } from "../../../core/Helpers";

export const Card = () => {
	return (
		<Sprite
			asset={randomElement([
				AssetAlias.CARD1,
				AssetAlias.CARD2,
				AssetAlias.CARD3,
				AssetAlias.CARD4,
			])}
		/>
	);
};
