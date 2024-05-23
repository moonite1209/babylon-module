import printThis from "@/test";
import cannon from "@/assets/model/cannon.glb";

printThis(cannon);
console.log("index.js",this);
let btn=document.querySelector(".test");
btn.addEventListener("click",function(e){
    console.log(this,e);
    let obj={a:1};
    let str="str";
    let Fn=function(name){
        this.name=name;
        this.Fn=Fn;
        let arrow = ()=>console.log("arrow",this);
        arrow();
        this.arrow=arrow;
        console.log("func",this);
    };
    Fn("name");
    let fn=new Fn("arg");
    window.arrow();
    fn.arrow();
    console.dir(obj);
    console.dir(str);
    console.dir(fn);
    console.dir(Fn);
    console.dir(Fn.prototype);
    console.dir(Object.getPrototypeOf(fn));
});