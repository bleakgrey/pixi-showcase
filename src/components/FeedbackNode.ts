import gsap from "gsap"
import { Node } from "../core/components/Node"

enum InputState {
	NORMAL,
	HOVER,
	PRESSED,
}

export class FeedbackNode extends Node {
	private _currentAnim?: GSAPAnimation;

	private _state = InputState.NORMAL;

	public onClick = () => { };

	private get state() {
		return this._state;
	}
	private set state(val) {
		if (val === this._state) {
			return
		}

		this._state = val;

		this._currentAnim?.kill();
		this._currentAnim = this.getStateAnim();
	}

	public constructor() {
		super()
		this.eventMode = 'static'
		this.cursor = 'pointer'

		this.on('pointerenter', () => {
			if (this.state != InputState.PRESSED) {
				this.state = InputState.HOVER;
			}
		});
		this.on('pointerleave', () => {
			if (this.state == InputState.HOVER) {
				this.state = InputState.NORMAL;
			}
		});
		this.on('pointerdown', () => {
			this.state = InputState.PRESSED;
		});
		this.on('pointerup', () => {
			this.state = InputState.NORMAL;
			this.onClick();
		});
		this.on('pointerupoutside', () => {
			this.state = InputState.NORMAL;
		});
	}

	protected getStateAnim() {
		switch (this.state) {
			case InputState.NORMAL: {
				return gsap.timeline().to(this.scale, { x: 1, y: 1, duration: 0.1 })
			}
			case InputState.HOVER: {
				return gsap.timeline().to(this.scale, { x: 1.1, y: 1.1, duration: 0.1 })
			}
			case InputState.PRESSED: {
				return gsap.timeline().to(this.scale, { x: 0.9, y: 0.9, duration: 0.1 })
			}
			default: {
				return
			}
		}

	}
}