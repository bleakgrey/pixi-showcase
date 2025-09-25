import { Point, Services, EventBus, GameModel, Ticker } from '../core'
import { Node } from '../core/components/Node'
import { CoreEvents } from '../core/CoreEvents'

export class Layer extends Node {
	public dimensions?: Point

	public centerOnStage = false

	protected eventBus = Services.get(EventBus)
	protected gameModel = Services.get(GameModel)

	protected onAdded() {
		this.eventBus.on(CoreEvents.STYLE_CHANGED, this.resize, this)

		this.resize()
		Ticker.shared.addOnce(this.resize, this)
	}

	protected onRemoved() {
		this.eventBus.off(CoreEvents.STYLE_CHANGED, this.resize, this)
	}

	protected getAspectRatio(
		srcWidth: number,
		srcHeight: number,
		maxWidth: number,
		maxHeight: number,
	) {
		return Math.min(maxWidth / srcWidth, maxHeight / srcHeight)
	}

	public resize() {
		if (!this.parent) {
			return
		}

		const { width, height } = this.gameModel
		let { dimensions } = this

		if (!dimensions) {
			dimensions = new Point(width, height)
		}

		const ratio = this.getAspectRatio(dimensions.x, dimensions.y, width, height)
		this.scale.set(ratio, ratio)

		if (this.centerOnStage) {
			this.position.set(
				(width - dimensions.x * ratio) / 2,
				(height - dimensions.y * ratio) / 2,
			)
		}

		return {
			width,
			height,
			dimensions,
			ratio,
		}
	}
}
