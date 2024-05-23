import * as BABYLON from '@babylonjs/core'

class Cube{
    constructor(boxName, boxWidth, boxHeight, boxDepth, boxColor, positionX, positionY, positionZ){
        this.width = boxWidth;
        this.height = boxHeight;
        this.depth = boxDepth;
        this.box = BABYLON.MeshBuilder.CreateBox(
            boxName,
            {
                width:boxWidth,
                height:boxHeight,
                depth:boxDepth,
            }
        );

        if(boxColor === undefined){
            boxColor = [1,0,0];
        }
        let material = new BABYLON.StandardMaterial("material");
        material.diffuseColor = new BABYLON.Color3(boxColor[0], boxColor[1], boxColor[2]); // red
        material.alpha = 0.2; // transparency
        material.specularColor = new BABYLON.Color3(0, 0, 0); // black
        material.emissiveColor = new BABYLON.Color3(boxColor[0], boxColor[1], boxColor[2]); // same as diffuse color
        this.box.material = material;

        this.positionGizmo = new BABYLON.PositionGizmo();
        // this.rotationGizmo = new BABYLON.RotationGizmo();
        this.scaleGizmo = new BABYLON.ScaleGizmo();

        
        this.box.position.x = positionX===undefined?0:positionX;
        this.box.position.y = positionY===undefined?0:positionY;
        this.box.position.z = positionZ===undefined?0:positionZ;
    }

    getPosition(){
        return {
            x:this.box.position.x,
            y:this.box.position.y,
            z:this.box.position.z,
        };
    }

    setPosition(x, y, z){
        this.box.position.x = x;
        this.box.position.y = y;
        this.box.position.z = z;
    }

    getSize(){
        return  {
            width: this.width, 
            height: this.height, 
            depth: this.depth,
        };
    }

    setSize(boxWidth, boxHeight, boxDepth){
        this.box.scaling.x = boxWidth / this.width;
        this.box.scaling.y = boxHeight / this.height;
        this.box.scaling.z = boxDepth / this.depth;
        this.width = boxWidth;
        this.height = boxHeight;
        this.depth = boxDepth;
    }

    getMesh(){
        return this.box;
    }

    setVisibility(isVisible){
        this.box.setEnabled(isVisible)
    }

    showGizmo(){
        this.positionGizmo.attachedMesh = this.box;
        // this.rotationGizmo.attachedMesh = this.box;
        this.scaleGizmo.attachedMesh = this.box;
    }

    hideGizmo(){
        this.positionGizmo.attachedMesh = null;
        // this.rotationGizmo.attachedMesh = null;
        this.scaleGizmo.attachedMesh = null;
    }
}

export {Cube}