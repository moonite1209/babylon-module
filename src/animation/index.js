import * as BABYLON from '@babylonjs/core'
import '@babylonjs/loaders';

const canvas = document.querySelector('#renderCanvas')
const engine = new BABYLON.Engine(canvas)
let createScene = async function () {
    const scene = new BABYLON.Scene(engine);
    scene.createDefaultCameraOrLight(true, true, true)

    const frameRate = 10;
    let animation = new BABYLON.Animation('xSlide', 'position.x', frameRate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_YOYO)
    const keyFrames = [];
    keyFrames.push({
        frame: 0,
        value: 0,
    });
    keyFrames.push({
        frame: frameRate,
        value: 2,
    });
    keyFrames.push({
        frame: 2 * frameRate,
        value: 4,
    });

    animation.setKeys(keyFrames);
    let box = BABYLON.MeshBuilder.CreateBox('box');
    box.animations.push(animation)

    scene.beginAnimation(box, 0, 2 * frameRate, true)

    return scene;
}

createScene().then((scene) => {
    engine.runRenderLoop(() => {
        scene.render();
    });

    window.addEventListener('resize', function () {
        engine.resize();
    });
})