import { DisplayObject } from 'pixi.js'
import { Services, EventBus } from '../../core'
import { Container } from '../components'
import { Node } from '../components/Node'
import { CoreEvents } from '../CoreEvents'
import { findChildren, getTexture } from '../Helpers'

export class StyleManager extends Node {
	private eventBus = Services.get(EventBus)

	protected onAdded() {
		this.eventBus.on(CoreEvents.RESIZED, this.onInvalidateStyles)
		this.eventBus.on(CoreEvents.SCENE_READY, this.onInvalidateStyles)
		this.parent.on('childAdded', this.onChildAdded, this)
	}

	private onChildAdded(
		child: DisplayObject,
		_container: Container,
		_index: number,
	) {
		const children: Container[] = findChildren(child)

		for (const child of children) {
			child.on('childAdded', this.onChildAdded, this)
			this.applyStylesToNode(child)
		}
	}

	private onInvalidateStyles = () => {
		const nodes: Container[] = findChildren(this.parent)

		nodes.forEach((node) => this.applyStylesToNode(node))

		this.eventBus.emit(CoreEvents.STYLE_CHANGED)
	}

	private applyStylesToNode(node: Container | any) {
		const { style } = node

		if (style) {
			const parsedStyle = this.parseStyle(style)

			for (const [key, value] of Object.entries(parsedStyle)) {
				switch (key) {
					case 'texture':
						node[key] = getTexture(value as any)
						break
					default:
						node[key] = value
						break
				}
			}
		}
	}

	private parseStyle(originalStyle: any) {
		const parsedStyle: any = {}
		const queries: any = {}

		for (const [key, value] of Object.entries(originalStyle)) {
			if (key[0] === '(') {
				queries[key] = value
			} else {
				parsedStyle[key] = value
			}
		}

		for (const [key, value] of Object.entries(queries)) {
			const { matches } = matchMedia(key)

			if (matches) {
				Object.assign(parsedStyle, value)
			}
		}

		return parsedStyle
	}
}
