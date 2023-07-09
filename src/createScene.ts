import { Vector3 } from "@babylonjs/core";
import { Engine } from "@babylonjs/core/Engines/engine";
import { Scene } from "@babylonjs/core/scene";

export interface IScene {
    initScene: () => Scene;
    initEnvironment(): Promise<Vector3>;
    initController(initCameraPos: Vector3): void
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

    initScene(): Scene {
        return this.scene;
    }

    initEnvironment(): Promise<Vector3> {
        return Promise.resolve(new Vector3(0, 0, 0));
    }

    initController(initCameraPos: Vector3): void {
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

    return import('./scenes/InteriorScene').then((module: CreateSceneModule) => {
        return module.default;
    });
};

