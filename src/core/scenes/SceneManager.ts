import Services from "../Services";
import { EventBus } from "../EventBus";
import { CoreEvents } from "../CoreEvents";
import { Scene } from "./Scene";
import { Node } from '../../core/components/Node'
import { Container } from "pixi.js";
import { instantSceneTransition } from "./InstantSceneTransition";
import { findChildren } from "../Helpers";

export interface ISceneManagerConfig {
	entryScene: string;
	sceneLoaders: { [id: string]: () => Promise<{ default: new () => Scene }>; }
}

export interface ISceneTransition {
	show: () => Promise<void>;
	hide: () => Promise<void>;
}

export class SceneManager extends Node {
	private eventBus = Services.get(EventBus)
	private config!: ISceneManagerConfig

	private isChangingScenes = false
	private currentSceneInstance?: Scene

	protected onAdded() {
		this.eventBus.on(CoreEvents.SWITCH_SCENE, this.onSceneChange)

		this.onSceneChange(this.config.entryScene, instantSceneTransition())
	}

	private onSceneChange = async (sceneName: string, transition: ISceneTransition) => {
		if (this.isChangingScenes) {
			return
		}

		this.log(`Changing scene to "${sceneName}"`);
		this.isChangingScenes = true;

		if (this.currentSceneInstance) {
			await transition.show();

			await this.currentSceneInstance.onLeave()

			// Remove all children recursively to ensure proper cleanup
			const children = findChildren(this.currentSceneInstance);
			children.reverse().forEach((child: Container) => {
				if (!child.destroyed) {
					child.removeFromParent();
				}
			});

			this.currentSceneInstance.destroy();
			this.currentSceneInstance = undefined;
		}

		try {
			// Load and instantiate the new scene
			const sceneLoader = this.config.sceneLoaders[sceneName];
			if (!sceneLoader) {
				throw new Error(`Scene "${sceneName}" not found`);
			}

			// Load the scene module
			const SceneModule = await sceneLoader();
			const SceneClass = SceneModule.default;

			// Create the new scene instance
			const newScene = new SceneClass();
			this.addChild(newScene);

			await newScene.onEnter();

			const view = newScene.view();
			newScene.addChild(view);

			// Store reference and call lifecycle method
			this.currentSceneInstance = newScene;
		} catch (error) {
			console.error(`Failed to load scene "${sceneName}":`, error);
			return;
		} finally {
			this.isChangingScenes = false;
		}

		this.eventBus.emit(CoreEvents.RESIZED, sceneName)

		await transition.hide();

		this.log('Ready')
		this.eventBus.emit(CoreEvents.SCENE_READY, sceneName)
	}
}