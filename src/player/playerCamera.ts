import { FreeCamera, KeyboardEventTypes, KeyboardInfo, Vector3 } from "@babylonjs/core";
import type { Scene } from "@babylonjs/core/scene";


export function setupPlayerCamera(scene: Scene): FreeCamera {
    const camera = new FreeCamera('camera', new Vector3(0, 5, -10), scene)

    camera.applyGravity = true;
    camera.checkCollisions = true;

    camera.ellipsoid = new Vector3(1, 1, 1);

    camera.minZ = 0.45;
    camera.speed = 0.2;
    camera.angularSensibility = 4000;

    camera.keysUp.push(87);
    camera.keysLeft.push(65);
    camera.keysDown.push(83);
    camera.keysRight.push(68);

    return camera
}

