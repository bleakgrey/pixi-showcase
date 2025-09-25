import { ISceneTransition } from "./SceneManager";

export const instantSceneTransition = () => {
	return {
		show: () => new Promise((resolve) => resolve()),
		hide: () => new Promise((resolve) => resolve()),
	} as ISceneTransition
}