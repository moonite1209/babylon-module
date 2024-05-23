import * as BABYLON from '@babylonjs/core'
import '@babylonjs/loaders';
import las from "@/assets/model/las.obj";
import water_drop_down from "@/assets/model/water_drop_down.glb";

const input = document.querySelector('#input')
input.addEventListener('change', function(){
    console.log(this.files)
    const reader = new FileReader()
    reader.addEventListener('load', function () {
        console.log(reader.result)
    })
    reader.readAsArrayBuffer(this.files[0])
})
const canvas = document.querySelector('#renderCanvas')
const engine = new BABYLON.Engine(canvas)
let createScene = async function () {
    const scene = new BABYLON.Scene(engine)

    let linesX = BABYLON.MeshBuilder.CreateLines("lines", { points: [new BABYLON.Vector3(0, 0, 0), new BABYLON.Vector3(10000, 0, 0)], updatable: true }, scene);
    linesX.color = new BABYLON.Color3(1, 0, 0);
    let linesY = BABYLON.MeshBuilder.CreateLines("lines", { points: [new BABYLON.Vector3(0, 0, 0), new BABYLON.Vector3(0, 10000, 0)], updatable: true }, scene);
    linesY.color = new BABYLON.Color3(0, 1, 0);
    let linesZ = BABYLON.MeshBuilder.CreateLines("lines", { points: [new BABYLON.Vector3(0, 0, 0), new BABYLON.Vector3(0, 0, 10000)], updatable: true }, scene);
    linesZ.color = new BABYLON.Color3(0, 0, 1);

    let ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 100, height: 100 })
    ground.checkCollisions = true

    let box = BABYLON.MeshBuilder.CreateBox("box", {
        faceColors: [
            new BABYLON.Color4(0, 0, 0, 1),
            new BABYLON.Color4(0, 0, 0, 0),
            new BABYLON.Color4(0, 0, 0, 0),
            new BABYLON.Color4(0, 0, 0, 0),
            new BABYLON.Color4(0, 0, 0, 0),
            new BABYLON.Color4(0, 0, 0, 0),
        ]
    })
    box.visibility = 0.5

    const meshResult = await BABYLON.SceneLoader.ImportMeshAsync("", las, "", scene)
    for (let mesh of meshResult.meshes) {
        mesh.checkCollisions = true
    }

    const botResult = await BABYLON.SceneLoader.ImportMeshAsync("", water_drop_down, "")
    console.log(meshResult, botResult)

    botResult.meshes[0].position.set(0, 2, 20)


    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));


    let camera = new BABYLON.ArcRotateCamera("camera", 0, 0, 100, new BABYLON.Vector3(0, 0, 0), scene)
    camera.attachControl(true);
    // camera.viewport = new BABYLON.Viewport(0.5, 0.5, 0.5, 0.5)

    let roamCamera = new BABYLON.ArcRotateCamera("roamCamera", 0, 0, 20, BABYLON.Vector3.Zero(), scene)
    roamCamera.attachControl(true);
    // roamCamera.viewport = new BABYLON.Viewport(0, 0, 0.5, 0.5)


    // setInterval(()=>{
    //     console.log('g')
    //     botResult.meshes[0].moveWithCollisions(new BABYLON.Vector3(0,0.2,0))
    // },1000)
    scene.activeCamera = roamCamera
    scene.onKeyboardObservable.add((kbinfo, eventState) => {
        console.log(kbinfo, eventState)
        if (kbinfo.type === 2) {
            return
        }
        if (kbinfo.event.key === "w") {
            console.log(botResult.meshes[0].forward, botResult.meshes[0].right)
            botResult.meshes[0].moveWithCollisions(botResult.meshes[0].forward)
        } else if (kbinfo.event.key === "a") {
            botResult.meshes[0].moveWithCollisions(botResult.meshes[0].right)
        } else if (kbinfo.event.key === "s") {
            botResult.meshes[0].moveWithCollisions(negativeVector3(botResult.meshes[0].forward))
        } else if (kbinfo.event.key === "d") {
            botResult.meshes[0].moveWithCollisions(negativeVector3(botResult.meshes[0].right))
        }
    })
    // roamCamera.target=botResult.meshes[0].position
    scene.onBeforeRenderObservable.add((eventData, eventState) => {
        botResult.meshes[0].lookAt(roamCamera.position)
        roamCamera.target.copyFrom(botResult.meshes[0].position)
        botResult.meshes[0].moveWithCollisions(new BABYLON.Vector3(0, -0.002, 0))
        let x = roamCamera.position.x;
        let y = roamCamera.position.y;
        let z = roamCamera.position.z;
        box.lookAt(new BABYLON.Vector3(x, box.position.y, z));
    })
    let tt = 1

    let rightDown = false
    let startX = 0
    let startY = 0
    let endX = 0
    let endY = 0
    const zoomInCallback = (PointerInfo) => {
        if (PointerInfo.type === BABYLON.PointerEventTypes.POINTERDOWN && PointerInfo.event.buttons === 2) {
            PointerInfo.event.preventDefault()
            console.log("down", PointerInfo.event.button, PointerInfo.event.buttons, PointerInfo.pickInfo)
            rightDown = true
        }
        if (PointerInfo.type === BABYLON.PointerEventTypes.POINTERMOVE && rightDown) {
            console.log("move", PointerInfo.event.button, PointerInfo.event.buttons, PointerInfo.pickInfo)
        }
        if (PointerInfo.type === BABYLON.PointerEventTypes.POINTERUP && rightDown) {
            console.log("up", PointerInfo.event.button, PointerInfo.event.buttons, PointerInfo.pickInfo)
            rightDown = false
        }

    }
    scene.onPointerObservable.add((PointerInfo) => {
        if (PointerInfo.type === BABYLON.PointerEventTypes.POINTERDOWN && PointerInfo.event.buttons === 2) {
            PointerInfo.event.preventDefault()
            console.log("down", PointerInfo.event.button, PointerInfo.event.buttons, PointerInfo.pickInfo)
            rightDown = true
            startX = PointerInfo.event.clientX
            startY = PointerInfo.event.clientY
            console.log(startX, startY)
        }
        if (PointerInfo.type === BABYLON.PointerEventTypes.POINTERMOVE && rightDown) {
            console.log("move", PointerInfo.event.button, PointerInfo.event.buttons, PointerInfo.pickInfo)
        }
        if (PointerInfo.type === BABYLON.PointerEventTypes.POINTERUP && rightDown) {
            console.log("up", PointerInfo.event.button, PointerInfo.event.buttons, PointerInfo.pickInfo)
            rightDown = false
            endX = PointerInfo.event.clientX
            endY = PointerInfo.event.clientY
            console.log(endX, endY)
            centerX = (startX + endX) / 2
            centerY = (startY + endY) / 2
            scene.pick(centerX, centerY)
        }

    })
    return scene
}

createScene().then((scene) => {
    engine.runRenderLoop(() => {
        scene.render()
    })

    window.addEventListener('resize', function () {
        engine.resize()
    })
})

function negativeVector3(v) {
    return new BABYLON.Vector3(-v.x, -v.y, -v.z)
}

export default function printThis(str){
    console.log(str,this);
}