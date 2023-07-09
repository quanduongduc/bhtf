import {
    Scene,
    SceneLoader,
    Vector3,
    HemisphericLight,
    UniversalCamera,
} from "@babylonjs/core";

import "@babylonjs/loaders";
import { SceneClass } from "../createScene";
import { ANGULARSENSIBILITY, ELLIPSOID, MINZ, SPEED } from "../constanst/camera";
import MapModels from "../../assets/models/untitled.glb"


class InteriorScene extends SceneClass {

    constructor(canvas: HTMLCanvasElement) {
        super(canvas);

        this.scene = this.initScene();

        this.initEnvironment().then(initCameraPos => this.initController(initCameraPos));

        this.engine.runRenderLoop(() => {
            if (!this.scene.cameras[0]) {
                return
            }
            this.scene.render();
        });
    }

    initScene(): Scene {
        new HemisphericLight("hemi", new Vector3(0, 0, 0), this.scene);

        this.scene.collisionsEnabled = true;
        this.scene.onPointerDown = (evt) => {
            if (evt.button === 0) this.engine.enterPointerlock();
            if (evt.button === 1) this.engine.exitPointerlock();
        };

        const framesPerSecond = 60;
        const gravity = -9.81;
        this.scene.gravity = new Vector3(0, gravity / framesPerSecond, 0);
        this.scene.collisionsEnabled = true;

        return this.scene;
    }

    async initEnvironment(): Promise<Vector3> {
        const { meshes } = await SceneLoader.ImportMeshAsync(
            "",
            "",
            MapModels,
            this.scene
        );

        meshes.map((mesh) => {
            mesh.checkCollisions = true;
            mesh.isPickable = false;
        });

        const initPos: Vector3 = meshes.find(mesh => mesh.name === 'init')!.position
        return initPos
    }

    initController(initCameraPos: Vector3): void {
        const camera = new UniversalCamera("camera", new Vector3(initCameraPos.x, initCameraPos.y + 2, initCameraPos.z), this.scene);
        camera.attachControl();

        camera.applyGravity = true;
        camera.checkCollisions = true;

        camera.ellipsoid = ELLIPSOID

        camera.minZ = MINZ

        camera.speed = SPEED

        camera.angularSensibility = ANGULARSENSIBILITY

        camera.keysUp.push(87);
        camera.keysLeft.push(65);
        camera.keysDown.push(83);
        camera.keysRight.push(68);
    }
}

const LoadingSceneInstance = new InteriorScene(document.querySelector("#renderCanvas") as HTMLCanvasElement);

export default LoadingSceneInstance;