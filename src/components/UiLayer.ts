import { findChildren } from "../core/Helpers"
import { Layer } from "./Layer"

export class UiLayer extends Layer {
	public override resize() {
		const measures = super.resize()

		if (!measures) {
			return
		}

		const { width, height, dimensions, ratio } = measures

		for (const control of findChildren(this)) {
			const { alignment, filling } = control as any

			if (alignment) {
				if (this.centerOnStage) {
					control.x = dimensions.x * alignment.x
					control.y = dimensions.y * alignment.y
				} else {
					control.x = (width * alignment.x) / ratio
					control.y = (height * alignment.y) / ratio
				}
			}

			if (filling) {
				if (this.centerOnStage) {
					control.width = dimensions.x * filling.x
					control.height = dimensions.y * filling.y
				} else {
					control.width = (width * filling.x) / ratio
					control.height = (height * filling.y) / ratio
				}
			}
		}

		return measures
	}
}
