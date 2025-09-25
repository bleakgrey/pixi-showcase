import { EventBus, GameModel, Services } from './core';
import { GameTree } from './GameTree';
import { Application, Assets, Container } from 'pixi.js';
import { PlatformService } from './core/platform/PlatformService';
import { BrowserPlatformService } from './core/platform/BrowserPlatformService';
import { AssetBundle } from './Assets';

async function start() {
	// Create the Pixi application
	const app = new Application({
		width: 1,
		height: 1,
		backgroundColor: 0x000000,
		antialias: true,
		resolution: Math.min(globalThis?.devicePixelRatio || 1, 2),
		autoDensity: true,
	});

	// If in dev mode, expose the app instance to the Pixi Inspector plugin
	if (import.meta.env.DEV) {
		const win = window as any;
		win.__PIXI_APP__ = app;
	}

	// Register available services
	Services.bind({
		provide: Application,
		useValue: app,
	});
	Services.bind({
		provide: EventBus,
		useValue: new Container()
	});
	Services.bind(GameModel);
	Services.bind({
		provide: PlatformService,
		useValue: new BrowserPlatformService(),
	})

	// Load the asset bundle
	await Assets.init();
	await Assets.addBundle(AssetBundle.name, AssetBundle.assets);
	await Assets.loadBundle(AssetBundle.name);

	// Instantiate the game stage
	app.stage.addChild(GameTree());

	// Finally, add the canvas to the DOM
	document.body.appendChild(app.view as HTMLCanvasElement);
}

// Start the game, and hopefully nothing breaks <3
start().catch(console.error);