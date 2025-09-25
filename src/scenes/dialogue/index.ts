import { Assets, Texture, UnresolvedAsset, BitmapFont } from "pixi.js";
import { Scene } from "../../core/scenes/Scene";
import { View } from "./View";
import { IDialogueScript } from "./Types";
import { AssetAlias } from "../../Assets";
import { RichLabel } from "./components/RichLabel";

let isBundleLoaded = false;

export default class DialogueScene extends Scene {
	private bundleName = 'dialogueBundle'

	public constructor() {
		super(View)
	}

	public async onEnter() {
		if (isBundleLoaded) {
			return
		}

		const assets: UnresolvedAsset[] = []
		const script: IDialogueScript = Assets.get(AssetAlias.DIALOGUE_SCRIPT);

		// Emojis should be installed into the custom Label component to display properly
		const map = new Map<string, Texture>();

		for (const emoji of script.emojies) {
			const origTexture = await Texture.fromURL(emoji.url);
			map.set(`{${emoji.name}}`, origTexture)
		}

		const font: BitmapFont = Assets.get(AssetAlias.TOBYGREEK);
		RichLabel.installEmojis(map, font)

		// Avatars are simpler, just shove them into a bundle and load it
		for (const avatar of script.avatars) {
			assets.push({
				alias: avatar.name,
				src: avatar.url,
				loadParser: 'loadTextures',
			})
		}

		Assets.addBundle(this.bundleName, assets)
		await Assets.loadBundle(this.bundleName)

		isBundleLoaded = true
	}


}