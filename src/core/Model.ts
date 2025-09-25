import { utils } from 'pixi.js'

export class Model extends utils.EventEmitter {
	private watch<T extends utils.EventEmitter>(
		obj: T,
	): T {
		const proxy = new Proxy(obj as object, {
			set(target: utils.EventEmitter, prop, newValue, receiver) {
				const oldValue = Reflect.get(target, prop, receiver)

				if (newValue === oldValue) {
					return true
				}

				const result = Reflect.set(target, prop, newValue, receiver)

				target.emit(`${String(prop)}`, newValue, oldValue)
				target.emit('**', prop)

				return result
			},
		})

		this.notifyAllChanged()

		return proxy as T
	}

	constructor() {
		super()
		return this.watch(this)
	}

	public notifyAllChanged() {
		for (const [key, value] of Object.entries(this)) {
			this.emit(`${String(key)}`, value)
		}
		this.emit('**')
	}
}
