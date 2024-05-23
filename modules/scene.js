import * as BABYLON from '@babylonjs/core'

class Scene{
    constructor(canvas){
        this.engine = new BABYLON.Engine(canvas);
        this.scene = new BABYLON.Scene(this.engine);
          //相机设置
        const camera = new BABYLON.ArcRotateCamera(
            'camera',
            0,
            0, 
            10, 
            new BABYLON.Vector3(0, 0, 0),
            this.scene
        );
        camera.attachControl(true);
          //灯光设置
        const light = new BABYLON.HemisphericLight(
            'hemisphericLight',
            new BABYLON.Vector3(0, 0, 1),
            this.scene
        );
    }
  
    addModel(mesh){
        // mesh.getMesh().renderingGroupId = 1;
        // this.scene.renderingGroupId = 1;
        this.scene.addMesh(mesh.getMesh());
    }
  
    run(){
        this.engine.runRenderLoop(()=> {
            this.scene.render();
        });
    }
  }

export {Scene}