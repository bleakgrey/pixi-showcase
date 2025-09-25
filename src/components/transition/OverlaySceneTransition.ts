import gsap from "gsap";
import { ISceneTransition } from "../../core/scenes/SceneManager";
import { transitionOverlayInstance } from "./TransitionOverlay";

export const overlaySceneTransition = () => {
	return {
		show: () => new Promise((resolve) => {
			gsap.timeline().fromTo(transitionOverlayInstance, { alpha: 0 }, { alpha: 1, duration: 0.5 }).call(resolve)
		}),
		hide: () => new Promise((resolve) => {
			gsap.timeline().fromTo(transitionOverlayInstance, { alpha: 1 }, { alpha: 0, duration: 0.5 }).call(resolve)
		}),
	} as ISceneTransition
}