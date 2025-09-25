import { ISceneManagerConfig } from '../core/scenes/SceneManager'

export const SceneManagerConfig: ISceneManagerConfig = {
	entryScene: 'menu',
	sceneLoaders: {
		'menu': async () => import('./menu'),
		'cards': async () => import('./cards'),
		'dialogue': async () => import('./dialogue'),
		'fire': async () => import('./fire'),
	}
}