import {CodeFlip} from "./codeFlip";
var editorElement:HTMLDivElement=document.createElement("div");
document.body.appendChild(editorElement);
(<any>window).editorElement=editorElement;
var editor:CodeFlip=new CodeFlip(editorElement);
(<any>window).editor=editor;
editor.render();
