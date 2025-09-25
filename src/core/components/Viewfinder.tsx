import { jsx } from ".";
import { AssetAlias } from "../../Assets";
import { Frame } from "./Frame";

export const Viewfinder = () => {
	return (
		<Frame
			visible={import.meta.env.DEV}
			asset={AssetAlias.DEBUG_FRAME}
			padding={64}
			filling={{ x: 1, y: 1 }}
			tint={0xff0000}
		/>
	);
};
