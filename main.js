// import * as BABYLON from '@babylonjs/core'
import { Scene } from './modules/scene';
import { Cube } from './modules/cube'

const canvas = document.getElementById('renderCanvas');

let myScene = new Scene(canvas);

let box1 = new Cube('box1', 1, 1, 1);

myScene.addModel(box1);

box1.showGizmo();

box1.hideGizmo();

box1.setVisibility(true);

let boxSize = box1.getSize();
console.log(boxSize.width, boxSize.height, boxSize.depth);
box1.setSize(2, 2, 2);

myScene.run();