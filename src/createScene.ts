import { Engine } from "@babylonjs/core/Engines/engine";
import { Scene } from "@babylonjs/core/scene";

export interface IScene {
    createScene: () => Scene;
    createEnvironment(): Promise<void>;
    initController(): void
}

export class SceneClass implements IScene {
    scene: Scene;
    engine: Engine;
    canvas: HTMLCanvasElement;
    preTasks?: Promise<unknown>[];

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.engine = new Engine(this.canvas, true);
        this.scene = new Scene(this.engine);
    }

    createScene(): Scene {
        return this.scene;
    }

    createEnvironment(): Promise<void> {
        return Promise.resolve();
    }

    initController(): void {
        return;
    }
}

export interface CreateSceneModule {
    default: SceneClass;
}

export const getSceneModuleWithName = (
    name = 'LoadingScene'
): Promise<SceneClass> => {
    // return import('./scenes/' + name).then((module: CreateSceneModule) => {
    //     return module.default;
    // });

    // To build quicker, replace the above return statement with:

    return import('./scenes/LoadingScene').then((module: CreateSceneModule) => {
        return module.default;
    });
};

