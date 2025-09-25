import { Application, BitmapFont, RenderTexture, Sprite, Texture } from "pixi.js";
import { Label } from "../../../core/components/Label";
import { Services } from "../../../core";

export class RichLabel extends Label {
	protected static charcodeMap: Map<string, number> = new Map();

	public static installEmojis(map: Map<string, Texture>, font: BitmapFont) {
		let charcode = 0;
		map.forEach((origTexture, token) => {
			const scaledTexture = RichLabel.scaleTexture(origTexture, font.lineHeight);

			while (font.chars[charcode] != undefined) {
				charcode++;
			}

			this.charcodeMap.set(token, charcode)

			font.chars[charcode] = {
				xOffset: 0,
				yOffset: 0,
				xAdvance: scaledTexture.width,
				texture: scaledTexture,
				page: 0,
				kerning: {},
			};
		})
	}

	private static scaleTexture(tex: Texture, targetHeight: number) {
		const scale = targetHeight / tex.height;
		const width = Math.round(tex.width * scale);
		const height = Math.round(tex.height * scale);

		const rt = RenderTexture.create({ width, height });
		const sprite = new Sprite(tex);
		sprite.width = width;
		sprite.height = height;

		const renderer = Services.get(Application).renderer
		renderer.render(sprite, { renderTexture: rt });

		return rt;
	}

	public override set text(input: string) {
		const matches = input.match(/\{(.*?)\}/g);

		if (matches) {
			for (const match of matches) {
				const glyph = RichLabel.charcodeMap.get(match)
				if (!glyph) {
					console.warn(`No emoji provided for token: ${match}`)
				}

				input = input.replace(match, String.fromCharCode(glyph ?? 0))
			}
		}

		super.text = input;
	}
}