import { Application } from "pixi.js";
import { EventBus, GameModel, Services } from "..";
import { CoreEvents } from "../CoreEvents";

export class PlatformService {
	protected model = Services.get(GameModel);

	protected eventBus = Services.get(EventBus);

	protected app!: Application;

	constructor() {
		this.init();
	}

	protected init() {
		this.app = Services.get(Application);

		if (import.meta.env.DEV) {
			console.info(`${JSON.stringify(import.meta.env, undefined, '   ')}`);
		}
	}

	protected onResize(w: number, h: number) {
		this.app.renderer.resize(w, h);
		this.model.width = w;
		this.model.height = h;

		this.eventBus.emit(CoreEvents.RESIZED);
	}
}
