import { Engine } from "@babylonjs/core/Engines/engine";
import { WebGPUEngine } from "@babylonjs/core/Engines/webgpuEngine";
import { IScene, SceneClass, getSceneModuleWithName } from "./createScene";
import "@babylonjs/core/Engines/WebGPU/Extensions/engine.uniformBuffer";

const getModuleToLoad = (): string | undefined =>
    location.search.split("scene=")[1]?.split("&")[0];

export const babylonInit = async (): Promise<void> => {
    // get the module to load
    const moduleName = getModuleToLoad();

    const SceneInstance = await getSceneModuleWithName(moduleName);

    const engineType =
        location.search.split("engine=")[1]?.split("&")[0] || "webgl";
    // Execute the pretasks, if defined

    await Promise.all(SceneInstance.preTasks || []);

    // Get the canvas element
    const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;

    // Generate the BABYLON 3D engine
    let engine: Engine;
    if (engineType === "webgpu") {
        const webGPUSupported = await WebGPUEngine.IsSupportedAsync;
        if (webGPUSupported) {
            const webgpu = engine = new WebGPUEngine(canvas, {
                adaptToDeviceRatio: true,
                antialias: true,
            });
            await webgpu.initAsync();
            engine = webgpu;
        } else {
            engine = new Engine(canvas, true);
        }
    } else {
        engine = new Engine(canvas, true);
    }

    SceneInstance.engine = engine
    SceneInstance.canvas = canvas

    // Create the scene
    const scene = SceneInstance.initScene();
    (window as any).scene = scene;
    // Watch for browser/canvas resize events
    window.addEventListener("resize", function () {
        engine.resize();
    });
};

babylonInit().then(() => {
    // scene started rendering, everything is initialized
});
