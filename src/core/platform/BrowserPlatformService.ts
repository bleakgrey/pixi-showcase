import { CoreEvents } from "../CoreEvents";
import { PlatformService } from "./PlatformService";

export class BrowserPlatformService extends PlatformService {
	private get isCurrentlyFullscreen() {
		return !!document.fullscreenElement
	}

	protected init() {
		super.init();

		this.eventBus.on(CoreEvents.TOGGLE_FULLSCREEN, this.onToggleFullscreen, this)

		window.addEventListener('resize', () => {
			this.onResize(window.innerWidth, window.innerHeight)
		})
		window.addEventListener('fullscreenchange', () => {
			this.onResize(window.innerWidth, window.innerHeight)
		})
		this.onResize(window.innerWidth, window.innerHeight)
	}

	private async onToggleFullscreen() {
		if (!document.fullscreenElement) {
			await document.body.requestFullscreen();
		} else {
			await document.exitFullscreen?.();
		}

		this.model.fullscreen = this.isCurrentlyFullscreen;
	}
}