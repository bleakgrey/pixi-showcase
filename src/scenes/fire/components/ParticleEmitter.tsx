import { Emitter, upgradeConfig } from "@pixi/particle-emitter";
import { Node } from "../../../core/components/Node";
import { getTexture } from "../../../core/Helpers";
import { AssetAlias } from "../../../Assets";

export function ParticleEmitter() {
	const root = new Node();
	const config = {
		"alpha": {
			"start": 1,
			"end": 1,
		},
		"scale": {
			"start": 1.5,
			"end": 0.5,
			"minimumScaleMultiplier": 0.9,
		},
		"color": {
			"start": "#ffffff",
			"end": "#ffffff",
		},
		"speed": {
			"start": 1,
			"end": 500,
			"minimumSpeedMultiplier": 0.5,
		},
		"acceleration": {
			"x": 0,
			"y": -500,
		},
		"maxSpeed": 0,
		"noRotation": true,
		"rotationSpeed": {
			"min": -5,
			"max": 5,
		},
		"lifetime": {
			"min": 0.4,
			"max": 1,
		},
		"blendMode": "screen",
		"frequency": 0.1,
		"emitterLifetime": -1,
		"maxParticles": 10,
		"pos": {
			"x": 0,
			"y": 0,
		},
		"addAtBack": true,
		"spawnType": "circle",
		"spawnCircle": {
			"x": 0,
			"y": 0,
			"r": 20,
		},
	};

	const emitter = new Emitter(
		root,
		upgradeConfig(config, [
			getTexture(AssetAlias.FIRE_SPRITE_1),
			getTexture(AssetAlias.FIRE_SPRITE_2),
			getTexture(AssetAlias.FIRE_SPRITE_3),
		]),
	);
	emitter.autoUpdate = true;

	return root;
}
