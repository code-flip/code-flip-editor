!function(t){var i={};function e(s){if(i[s])return i[s].exports;var r=i[s]={i:s,l:!1,exports:{}};return t[s].call(r.exports,r,r.exports,e),r.l=!0,r.exports}e.m=t,e.c=i,e.d=function(t,i,s){e.o(t,i)||Object.defineProperty(t,i,{configurable:!1,enumerable:!0,get:s})},e.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},e.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(i,"a",i),i},e.o=function(t,i){return Object.prototype.hasOwnProperty.call(t,i)},e.p="",e(e.s=0)}([function(t,i,e){"use strict";e.r(i);var s=function(){return function(t,i,e,s){this.x=t,this.y=i,this.width=e,this.height=s}}(),r=function(){return function(t,i){this.x=t,this.y=i}}(),n=function(){function t(t,i,e){void 0===e&&(e=2),this.width=t,this.height=i,this.radius=e}return t.prototype.path=function(){var t="M "+this.radius+",0 l "+(this.width-2*this.radius)+",0";return t=(t=(t=(t=(t=(t=(t=t+"a"+this.radius+","+this.radius+",0,0,1,"+this.radius+","+this.radius)+"l 0,"+(this.height-2*this.radius))+"a"+this.radius+","+this.radius+",0,0,1,"+-this.radius+","+this.radius)+"l "+(-this.width+2*this.radius)+",0")+"a"+this.radius+","+this.radius+",0,0,1,"+-this.radius+","+-this.radius)+"l 0,"+(-this.height+2*this.radius))+"a"+this.radius+","+this.radius+",0,0,1,"+this.radius+","+-this.radius},t}(),o=function(){function t(){this.position=new r(0,0);var t=Math.floor(360*Math.random());this.group=document.createElementNS("http://www.w3.org/2000/svg","g"),this.group.classList.add("block"),this.shape=document.createElementNS("http://www.w3.org/2000/svg","path"),this.shape.setAttribute("fill","hsl("+t+", 70%, 50%)"),this.shape.setAttribute("filter","url(#Bevel)"),this.group.appendChild(this.shape)}return t.prototype.toCode=function(){return"undefined"},t.prototype.layoutChildren=function(){},t.prototype.layoutNext=function(){},t.prototype.render=function(t){this.layoutChildren(),this.group.parentNode!==t&&t.appendChild(this.group),this.bBox=new s(this.position.x,this.position.y,128,32);var i=new n(this.bBox.width,this.bBox.height,4);this.shape.setAttribute("d",i.path()),this.group.setAttribute("transform","translate("+this.position.x+" "+this.position.y+")")},t}(),h=function(){function t(t){this.blocks=[],this.group=document.createElementNS("http://www.w3.org/2000/svg","g"),this.group.classList.add("toolbox"),this.background=document.createElementNS("http://www.w3.org/2000/svg","rect"),this.background.setAttribute("width","200px"),this.background.setAttribute("height","10px"),this.background.setAttribute("fill","rgb(200,200,200)"),this.background.classList.add("toolbox-background"),this.group.appendChild(this.background),this.editor=t,this.bBox=new s(0,0,200,10);for(var i=0;i<10;i++)this.blocks.push(new o)}return t.prototype.render=function(t){this.group.parentNode!==t&&t.appendChild(this.group),this.bBox=new s(0,0,200,this.editor.container.clientHeight),this.background.setAttribute("width",this.bBox.width+"px"),this.background.setAttribute("height",this.bBox.height+"px"),this.group.setAttribute("transform","translate("+this.bBox.x+" "+this.bBox.y+")");for(var i=10,e=0;e<this.blocks.length;e++)this.blocks[e].position.x=10,this.blocks[e].position.y=i,this.blocks[e].render(this.group),i+=this.blocks[e].bBox.height+10},t}(),u=function(){function t(t){this.group=document.createElementNS("http://www.w3.org/2000/svg","g"),this.editor=t,this.background=document.createElementNS("http://www.w3.org/2000/svg","rect"),this.background.setAttribute("width","200px"),this.background.setAttribute("height","10px"),this.background.setAttribute("fill","rgb(250,250,250)"),this.background.classList.add("workspace-background"),this.group.appendChild(this.background),this.bBox=new s(200,0,500,500)}return t.prototype.render=function(t){this.group.parentNode!==t&&t.appendChild(this.group),this.bBox=new s(200,0,this.editor.container.clientWidth-this.editor.toolbox.bBox.width,this.editor.container.clientHeight),this.background.setAttribute("width",this.bBox.width+"px"),this.background.setAttribute("height",this.bBox.height+"px"),this.group.setAttribute("transform","translate("+this.bBox.x+" "+this.bBox.y+")")},t}(),a=function(){function t(t){this.container=t,this.svg=document.createElementNS("http://www.w3.org/2000/svg","svg"),this.svg.innerHTML='\t<filter id="Bevel" filterUnits="objectBoundingBox" x="-10%" y="-10%" width="150%" height="150%">\n\t\t<feGaussianBlur in="SourceAlpha" stdDeviation="1.5" result="blur"/>\n\t\t<feSpecularLighting in="blur" surfaceScale="1" specularConstant="0.5" specularExponent="10" result="specOut" lighting-color="white">\n\t\t\t<fePointLight x="-5000" y="-5000" z="8000"/>\n\t\t</feSpecularLighting>\n\t\t<feComposite in="specOut" in2="SourceAlpha" operator="in" result="specOut2"/>\n\t\t<feComposite in="SourceGraphic" in2="specOut2" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" result="litPaint" />\n\t</filter>',this.container.appendChild(this.svg),this.svg.setAttribute("width",this.container.clientWidth+""),this.svg.setAttribute("height",this.container.clientHeight+""),this.toolbox=new h(this),this.workspace=new u(this);var i=this;window.setInterval(function(){i.render()},10)}return t.prototype.render=function(){this.svg.setAttribute("width",this.container.clientWidth+""),this.svg.setAttribute("height",this.container.clientHeight+""),this.toolbox.render(this.svg),this.workspace.render(this.svg)},t}(),d=document.createElement("div");document.body.appendChild(d),window.editorElement=d;var c=new a(d);window.editor=c,c.render()}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzLnRzIiwid2VicGFjazovLy8uL3NyYy9ibG9jay50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdG9vbGJveC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvd29ya3NwYWNlLnRzIiwid2VicGFjazovLy8uL3NyYy9jb2RlRmxpcC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOlsiaW5zdGFsbGVkTW9kdWxlcyIsIl9fd2VicGFja19yZXF1aXJlX18iLCJtb2R1bGVJZCIsImV4cG9ydHMiLCJtb2R1bGUiLCJpIiwibCIsIm1vZHVsZXMiLCJjYWxsIiwibSIsImMiLCJkIiwibmFtZSIsImdldHRlciIsIm8iLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImNvbmZpZ3VyYWJsZSIsImVudW1lcmFibGUiLCJnZXQiLCJyIiwidmFsdWUiLCJuIiwiX19lc01vZHVsZSIsIm9iamVjdCIsInByb3BlcnR5IiwicHJvdG90eXBlIiwiaGFzT3duUHJvcGVydHkiLCJwIiwicyIsIlJlY3RhbmdsZSIsIngiLCJ5Iiwid2lkdGgiLCJoZWlnaHQiLCJ0aGlzIiwiVmVjdG9yIiwiUmVjdEJsb2NrU2hhcGUiLCJyYWRpdXMiLCJwYXRoIiwiYmxvY2tfQmxvY2tTVkciLCJCbG9ja1NWRyIsInBvc2l0aW9uIiwiaHVlIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwiZ3JvdXAiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnROUyIsImNsYXNzTGlzdCIsImFkZCIsInNoYXBlIiwic2V0QXR0cmlidXRlIiwiYXBwZW5kQ2hpbGQiLCJ0b0NvZGUiLCJsYXlvdXRDaGlsZHJlbiIsImxheW91dE5leHQiLCJyZW5kZXIiLCJwYXJlbnQiLCJwYXJlbnROb2RlIiwiYkJveCIsImJzaGFwZSIsInRvb2xib3hfVG9vbGJveCIsIlRvb2xib3giLCJlZGl0b3IiLCJibG9ja3MiLCJiYWNrZ3JvdW5kIiwicHVzaCIsImNvbnRhaW5lciIsImNsaWVudEhlaWdodCIsImN5IiwibGVuZ3RoIiwid29ya3NwYWNlX1dvcmtzcGFjZSIsIldvcmtzcGFjZSIsImNsaWVudFdpZHRoIiwidG9vbGJveCIsImNvZGVGbGlwX0NvZGVGbGlwIiwiQ29kZUZsaXAiLCJzdmciLCJpbm5lckhUTUwiLCJ3b3Jrc3BhY2UiLCJtZSIsIndpbmRvdyIsInNldEludGVydmFsIiwiZWRpdG9yRWxlbWVudCIsImNyZWF0ZUVsZW1lbnQiLCJib2R5Iiwic3JjX2VkaXRvciJdLCJtYXBwaW5ncyI6ImFBQ0EsSUFBQUEsS0FHQSxTQUFBQyxFQUFBQyxHQUdBLEdBQUFGLEVBQUFFLEdBQ0EsT0FBQUYsRUFBQUUsR0FBQUMsUUFHQSxJQUFBQyxFQUFBSixFQUFBRSxJQUNBRyxFQUFBSCxFQUNBSSxHQUFBLEVBQ0FILFlBVUEsT0FOQUksRUFBQUwsR0FBQU0sS0FBQUosRUFBQUQsUUFBQUMsSUFBQUQsUUFBQUYsR0FHQUcsRUFBQUUsR0FBQSxFQUdBRixFQUFBRCxRQUtBRixFQUFBUSxFQUFBRixFQUdBTixFQUFBUyxFQUFBVixFQUdBQyxFQUFBVSxFQUFBLFNBQUFSLEVBQUFTLEVBQUFDLEdBQ0FaLEVBQUFhLEVBQUFYLEVBQUFTLElBQ0FHLE9BQUFDLGVBQUFiLEVBQUFTLEdBQ0FLLGNBQUEsRUFDQUMsWUFBQSxFQUNBQyxJQUFBTixLQU1BWixFQUFBbUIsRUFBQSxTQUFBakIsR0FDQVksT0FBQUMsZUFBQWIsRUFBQSxjQUFpRGtCLE9BQUEsS0FJakRwQixFQUFBcUIsRUFBQSxTQUFBbEIsR0FDQSxJQUFBUyxFQUFBVCxLQUFBbUIsV0FDQSxXQUEyQixPQUFBbkIsRUFBQSxTQUMzQixXQUFpQyxPQUFBQSxHQUVqQyxPQURBSCxFQUFBVSxFQUFBRSxFQUFBLElBQUFBLEdBQ0FBLEdBSUFaLEVBQUFhLEVBQUEsU0FBQVUsRUFBQUMsR0FBc0QsT0FBQVYsT0FBQVcsVUFBQUMsZUFBQW5CLEtBQUFnQixFQUFBQyxJQUd0RHhCLEVB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ZCxLQUFLNEMsSUFBSUMsVUFBVSxrbUJBUW5CN0MsS0FBS2tDLFVBQVVmLFlBQVluQixLQUFLNEMsS0FDaEM1QyxLQUFLNEMsSUFBSTFCLGFBQWEsUUFBUWxCLEtBQUtrQyxVQUFVTSxZQUFZLElBQ3pEeEMsS0FBSzRDLElBQUkxQixhQUFhLFNBQVNsQixLQUFLa0MsVUFBVUMsYUFBYSxJQUMzRG5DLEtBQUt5QyxRQUFRLElBQUliLEVBQVE1QixNQUN6QkEsS0FBSzhDLFVBQVUsSUFBSVIsRUFBVXRDLE1BQzdCLElBQUkrQyxFQUFHL0MsS0FDUGdELE9BQU9DLFlBQVksV0FBV0YsRUFBR3hCLFVBQVUsSUFFL0MsT0E5QkVvQixFQUFBcEQsVUFBQWdDLE9BQUEsV0FDRXZCLEtBQUs0QyxJQUFJMUIsYUFBYSxRQUFRbEIsS0FBS2tDLFVBQVVNLFlBQVksSUFDekR4QyxLQUFLNEMsSUFBSTFCLGFBQWEsU0FBU2xCLEtBQUtrQyxVQUFVQyxhQUFhLElBQzNEbkMsS0FBS3lDLFFBQVFsQixPQUFPdkIsS0FBSzRDLEtBQ3pCNUMsS0FBSzhDLFVBQVV2QixPQUFPdkIsS0FBSzRDLE1BMEIvQkQsRUEvQkEsR0NGSU8sRUFBNkJyQyxTQUFTc0MsY0FBYyxPQUN4RHRDLFNBQVN1QyxLQUFLakMsWUFBWStCLEdBQ3BCRixPQUFRRSxjQUFjQSxFQUM1QixJQUFJRyxFQUFnQixJQUFJWCxFQUFTUSxHQUMzQkYsT0FBUWxCLE9BQU91QixFQUNyQkEsRUFBTzlCIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG4iLCJjbGFzcyBSZWN0YW5nbGUge1xuICBoZWlnaHQ6IG51bWJlcjtcbiAgd2lkdGg6IG51bWJlcjtcbiAgeTogbnVtYmVyO1xuICB4OiBudW1iZXI7XG4gIGNvbnN0cnVjdG9yKHg6IG51bWJlciwgeTogbnVtYmVyLCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcikge1xuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy55ID0geTtcbiAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG4gIH1cbn1cbmNsYXNzIFZlY3RvciB7XG4gIHk6IG51bWJlcjtcbiAgeDogbnVtYmVyO1xuICBjb25zdHJ1Y3Rvcih4OiBudW1iZXIsIHk6IG51bWJlcikge1xuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy55ID0geTtcbiAgfVxufVxuZXhwb3J0IHtSZWN0YW5nbGUsIFZlY3Rvcn07XG4iLCJpbXBvcnQgeyBSZW5kZXJhYmxlIH0gZnJvbSBcIi4vcmVuZGVyYWJsZVwiO1xuaW1wb3J0IHsgUmVjdGFuZ2xlLCBWZWN0b3IgfSBmcm9tIFwiLi91dGlsc1wiO1xuaW50ZXJmYWNlIEJsb2NrU2hhcGV7XG4gIHBhdGgoKTpzdHJpbmc7XG59XG5jbGFzcyBSZWN0QmxvY2tTaGFwZSBpbXBsZW1lbnRzIEJsb2NrU2hhcGV7XG4gIHdpZHRoOm51bWJlcjtcbiAgaGVpZ2h0Om51bWJlcjtcbiAgcmFkaXVzOm51bWJlcjtcbiAgcGF0aCgpOnN0cmluZ3tcbiAgICB2YXIgc2VsZj10aGlzO1xuICAgIHZhciBtID0gXCJNIFwiICsgc2VsZi5yYWRpdXMgKyBcIiwwIGwgXCIgKyAoc2VsZi53aWR0aCAtIHNlbGYucmFkaXVzICogMikgKyBcIiwwXCI7XG4gICAgbSA9IG0gKyBcImFcIiArIHNlbGYucmFkaXVzICsgXCIsXCIgKyBzZWxmLnJhZGl1cyArIFwiLDAsMCwxLFwiICsgc2VsZi5yYWRpdXMgKyBcIixcIiArIHNlbGYucmFkaXVzO1xuICAgIG0gPSBtICsgXCJsIFwiICsgMCArIFwiLFwiICsgKHNlbGYuaGVpZ2h0IC0gc2VsZi5yYWRpdXMgKiAyKTtcbiAgICBtID0gbSArIFwiYVwiICsgc2VsZi5yYWRpdXMgKyBcIixcIiArIHNlbGYucmFkaXVzICsgXCIsMCwwLDEsXCIgKyAoLXNlbGYucmFkaXVzKSArIFwiLFwiICsgc2VsZi5yYWRpdXM7XG4gICAgbSA9IG0gKyBcImwgXCIgKyAoLXNlbGYud2lkdGggKyBzZWxmLnJhZGl1cyAqIDIpICsgXCIsXCIgKyAwO1xuICAgIG0gPSBtICsgXCJhXCIgKyBzZWxmLnJhZGl1cyArIFwiLFwiICsgc2VsZi5yYWRpdXMgKyBcIiwwLDAsMSxcIiArICgtc2VsZi5yYWRpdXMpICsgXCIsXCIgKyAoLXNlbGYucmFkaXVzKTtcbiAgICBtID0gbSArIFwibCBcIiArIDAgKyBcIixcIiArICgtc2VsZi5oZWlnaHQgKyBzZWxmLnJhZGl1cyAqIDIpO1xuICAgIG0gPSBtICsgXCJhXCIgKyBzZWxmLnJhZGl1cyArIFwiLFwiICsgc2VsZi5yYWRpdXMgKyBcIiwwLDAsMSxcIiArIChzZWxmLnJhZGl1cykgKyBcIixcIiArICgtc2VsZi5yYWRpdXMpO1xuICAgIHJldHVybiBtO1xuICB9O1xuICBjb25zdHJ1Y3Rvcih3aWR0aDpudW1iZXIsaGVpZ2h0Om51bWJlcixyYWRpdXM6bnVtYmVyPTIpe1xuICAgIHRoaXMud2lkdGg9d2lkdGg7XG4gICAgdGhpcy5oZWlnaHQ9aGVpZ2h0O1xuICAgIHRoaXMucmFkaXVzPXJhZGl1cztcbiAgfTtcbn1cbmNsYXNzIEJsb2NrU1ZHIGltcGxlbWVudHMgUmVuZGVyYWJsZSB7XG4gIGdyb3VwOiBTVkdHRWxlbWVudDtcbiAgYkJveDogUmVjdGFuZ2xlO1xuICBzaGFwZURhcms6IFNWR1BhdGhFbGVtZW50O1xuICBzaGFwZTogU1ZHUGF0aEVsZW1lbnQ7XG4gIHNoYXBlTGlnaHQ6IFNWR1BhdGhFbGVtZW50O1xuICBwcmV2aW91czogQmxvY2tTVkd8Qm9vbGVhbjtcbiAgbmV4dDogQmxvY2tTVkd8Qm9vbGVhbjtcbiAgcG9zaXRpb246IFZlY3Rvcj1uZXcgVmVjdG9yKDAsMCk7XG4gIHRvQ29kZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiBcInVuZGVmaW5lZFwiO1xuICB9XG4gIGxheW91dENoaWxkcmVuKCk6IHZvaWQge1xuXG4gIH1cbiAgbGF5b3V0TmV4dCgpOiB2b2lke1xuXG4gIH1cbiAgcmVuZGVyKHBhcmVudDogU1ZHR0VsZW1lbnQgfCBTVkdFbGVtZW50KTogdm9pZCB7XG4gICAgdGhpcy5sYXlvdXRDaGlsZHJlbigpO1xuICAgIGlmKHRoaXMuZ3JvdXAucGFyZW50Tm9kZSE9PXBhcmVudCl7XG4gICAgICBwYXJlbnQuYXBwZW5kQ2hpbGQodGhpcy5ncm91cCk7XG4gICAgfVxuXG4gICAgdGhpcy5iQm94ID0gbmV3IFJlY3RhbmdsZSh0aGlzLnBvc2l0aW9uLngsIHRoaXMucG9zaXRpb24ueSwgMTI4LCAzMik7XG4gICAgdmFyIGJzaGFwZT1uZXcgUmVjdEJsb2NrU2hhcGUodGhpcy5iQm94LndpZHRoLHRoaXMuYkJveC5oZWlnaHQsNCk7XG4gICAgdGhpcy5zaGFwZS5zZXRBdHRyaWJ1dGUoXCJkXCIsYnNoYXBlLnBhdGgoKSk7XG4gICAgdGhpcy5ncm91cC5zZXRBdHRyaWJ1dGUoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGUoXCIgKyB0aGlzLnBvc2l0aW9uLnggKyBcIiBcIiArIHRoaXMucG9zaXRpb24ueSArIFwiKVwiKTtcbiAgfVxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB2YXIgaHVlPU1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSozNjApO1xuICAgIHRoaXMuZ3JvdXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLCBcImdcIik7XG4gICAgdGhpcy5ncm91cC5jbGFzc0xpc3QuYWRkKFwiYmxvY2tcIik7XG4gICAgdGhpcy5zaGFwZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsIFwicGF0aFwiKTtcbiAgICB0aGlzLnNoYXBlLnNldEF0dHJpYnV0ZShcImZpbGxcIiwgXCJoc2woXCIraHVlK1wiLCA3MCUsIDUwJSlcIik7XG4gICAgdGhpcy5zaGFwZS5zZXRBdHRyaWJ1dGUoXCJmaWx0ZXJcIixcInVybCgjQmV2ZWwpXCIpO1xuICAgIHRoaXMuZ3JvdXAuYXBwZW5kQ2hpbGQodGhpcy5zaGFwZSk7XG4gIH1cbn1cbmV4cG9ydCB7IEJsb2NrU1ZHIH07XG4iLCJpbXBvcnQgeyBSZW5kZXJhYmxlIH0gZnJvbSBcIi4vcmVuZGVyYWJsZVwiO1xuaW1wb3J0IHsgQ29kZUZsaXAgfSBmcm9tIFwiLi9jb2RlRmxpcFwiO1xuaW1wb3J0IHsgUmVjdGFuZ2xlIH0gZnJvbSBcIi4vdXRpbHNcIjtcbmltcG9ydCB7IEJsb2NrU1ZHIH0gZnJvbSBcIi4vYmxvY2tcIjtcblxuY2xhc3MgVG9vbGJveCBpbXBsZW1lbnRzIFJlbmRlcmFibGUge1xuICBlZGl0b3I6IENvZGVGbGlwO1xuICBiQm94OiBSZWN0YW5nbGU7XG4gIGdyb3VwOiBTVkdHRWxlbWVudDtcbiAgYmFja2dyb3VuZDogU1ZHUmVjdEVsZW1lbnQ7XG4gIGJsb2NrczogQXJyYXk8QmxvY2tTVkc+ID0gW107XG4gIHJlbmRlcihwYXJlbnQ6IFNWR0dFbGVtZW50IHwgU1ZHRWxlbWVudCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmdyb3VwLnBhcmVudE5vZGUgIT09IHBhcmVudCkge1xuICAgICAgcGFyZW50LmFwcGVuZENoaWxkKHRoaXMuZ3JvdXApO1xuICAgIH1cbiAgICB0aGlzLmJCb3ggPSBuZXcgUmVjdGFuZ2xlKDAsIDAsIDIwMCwgdGhpcy5lZGl0b3IuY29udGFpbmVyLmNsaWVudEhlaWdodCk7XG4gICAgdGhpcy5iYWNrZ3JvdW5kLnNldEF0dHJpYnV0ZShcIndpZHRoXCIsIHRoaXMuYkJveC53aWR0aCArIFwicHhcIik7XG4gICAgdGhpcy5iYWNrZ3JvdW5kLnNldEF0dHJpYnV0ZShcImhlaWdodFwiLCB0aGlzLmJCb3guaGVpZ2h0ICsgXCJweFwiKTtcbiAgICB0aGlzLmdyb3VwLnNldEF0dHJpYnV0ZShcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZShcIiArIHRoaXMuYkJveC54ICsgXCIgXCIgKyB0aGlzLmJCb3gueSArIFwiKVwiKTtcbiAgICB2YXIgY3ggPSAxMDtcbiAgICB2YXIgY3kgPSAxMDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuYmxvY2tzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB0aGlzLmJsb2Nrc1tpXS5wb3NpdGlvbi54ID0gY3g7XG4gICAgICB0aGlzLmJsb2Nrc1tpXS5wb3NpdGlvbi55ID0gY3k7XG4gICAgICB0aGlzLmJsb2Nrc1tpXS5yZW5kZXIodGhpcy5ncm91cCk7XG4gICAgICBjeSArPSB0aGlzLmJsb2Nrc1tpXS5iQm94LmhlaWdodCArIDEwO1xuICAgIH1cbiAgfVxuICBjb25zdHJ1Y3RvcihlZGl0b3I6IENvZGVGbGlwKSB7XG4gICAgdGhpcy5ncm91cCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsIFwiZ1wiKTtcbiAgICB0aGlzLmdyb3VwLmNsYXNzTGlzdC5hZGQoXCJ0b29sYm94XCIpO1xuICAgIHRoaXMuYmFja2dyb3VuZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsIFwicmVjdFwiKTtcbiAgICB0aGlzLmJhY2tncm91bmQuc2V0QXR0cmlidXRlKFwid2lkdGhcIiwgXCIyMDBweFwiKTtcbiAgICB0aGlzLmJhY2tncm91bmQuc2V0QXR0cmlidXRlKFwiaGVpZ2h0XCIsIFwiMTBweFwiKTtcbiAgICB0aGlzLmJhY2tncm91bmQuc2V0QXR0cmlidXRlKFwiZmlsbFwiLCBcInJnYigyMDAsMjAwLDIwMClcIik7XG4gICAgdGhpcy5iYWNrZ3JvdW5kLmNsYXNzTGlzdC5hZGQoXCJ0b29sYm94LWJhY2tncm91bmRcIik7XG4gICAgdGhpcy5ncm91cC5hcHBlbmRDaGlsZCh0aGlzLmJhY2tncm91bmQpO1xuICAgIHRoaXMuZWRpdG9yID0gZWRpdG9yO1xuICAgIHRoaXMuYkJveCA9IG5ldyBSZWN0YW5nbGUoMCwgMCwgMjAwLCAxMCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICB0aGlzLmJsb2Nrcy5wdXNoKG5ldyBCbG9ja1NWRygpKTtcbiAgICB9XG4gICAgLy90aGlzLmJCb3g9bmV3IFJlY3RhbmdsZSgyMDAsMCw1MDAsNTAwKTtcbiAgfVxufVxuZXhwb3J0IHsgVG9vbGJveCB9O1xuIiwiaW1wb3J0IHsgQ29kZUZsaXAgfSBmcm9tIFwiLi9jb2RlRmxpcFwiO1xuaW1wb3J0IHsgUmVjdGFuZ2xlIH0gZnJvbSBcIi4vdXRpbHNcIjtcbmltcG9ydCB7IFJlbmRlcmFibGUgfSBmcm9tIFwiLi9yZW5kZXJhYmxlXCI7XG5cbmNsYXNzIFdvcmtzcGFjZSBpbXBsZW1lbnRzIFJlbmRlcmFibGV7XG4gIHJlbmRlcihwYXJlbnQ6IFNWR0dFbGVtZW50IHwgU1ZHRWxlbWVudCk6IHZvaWQge1xuICAgIGlmKHRoaXMuZ3JvdXAucGFyZW50Tm9kZSE9PXBhcmVudCl7XG4gICAgICBwYXJlbnQuYXBwZW5kQ2hpbGQodGhpcy5ncm91cCk7XG4gICAgfVxuICAgIHRoaXMuYkJveD1uZXcgUmVjdGFuZ2xlKDIwMCwwLHRoaXMuZWRpdG9yLmNvbnRhaW5lci5jbGllbnRXaWR0aC10aGlzLmVkaXRvci50b29sYm94LmJCb3gud2lkdGgsdGhpcy5lZGl0b3IuY29udGFpbmVyLmNsaWVudEhlaWdodCk7XG4gICAgdGhpcy5iYWNrZ3JvdW5kLnNldEF0dHJpYnV0ZShcIndpZHRoXCIsIHRoaXMuYkJveC53aWR0aCsgXCJweFwiKTtcbiAgICB0aGlzLmJhY2tncm91bmQuc2V0QXR0cmlidXRlKFwiaGVpZ2h0XCIsIHRoaXMuYkJveC5oZWlnaHQrIFwicHhcIik7XG4gICAgdGhpcy5ncm91cC5zZXRBdHRyaWJ1dGUoXCJ0cmFuc2Zvcm1cIixcInRyYW5zbGF0ZShcIit0aGlzLmJCb3gueCtcIiBcIit0aGlzLmJCb3gueStcIilcIik7XG4gIH1cbiAgZ3JvdXA6IFNWR0dFbGVtZW50O1xuICBiQm94OlJlY3RhbmdsZTtcbiAgZWRpdG9yOkNvZGVGbGlwO1xuICBiYWNrZ3JvdW5kOiBTVkdSZWN0RWxlbWVudDtcbiAgY29uc3RydWN0b3IoZWRpdG9yOkNvZGVGbGlwKXtcbiAgICB0aGlzLmdyb3VwPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsIFwiZ1wiKTtcbiAgICB0aGlzLmVkaXRvcj1lZGl0b3I7XG4gICAgdGhpcy5iYWNrZ3JvdW5kID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiwgXCJyZWN0XCIpO1xuICAgIHRoaXMuYmFja2dyb3VuZC5zZXRBdHRyaWJ1dGUoXCJ3aWR0aFwiLCBcIjIwMHB4XCIpO1xuICAgIHRoaXMuYmFja2dyb3VuZC5zZXRBdHRyaWJ1dGUoXCJoZWlnaHRcIiwgXCIxMHB4XCIpO1xuICAgIHRoaXMuYmFja2dyb3VuZC5zZXRBdHRyaWJ1dGUoXCJmaWxsXCIsIFwicmdiKDI1MCwyNTAsMjUwKVwiKTtcbiAgICB0aGlzLmJhY2tncm91bmQuY2xhc3NMaXN0LmFkZChcIndvcmtzcGFjZS1iYWNrZ3JvdW5kXCIpO1xuICAgIHRoaXMuZ3JvdXAuYXBwZW5kQ2hpbGQodGhpcy5iYWNrZ3JvdW5kKTtcbiAgICB0aGlzLmJCb3g9bmV3IFJlY3RhbmdsZSgyMDAsMCw1MDAsNTAwKTtcbiAgfVxufVxuZXhwb3J0IHtXb3Jrc3BhY2V9O1xuIiwiaW1wb3J0IHsgVG9vbGJveCB9IGZyb20gXCIuL3Rvb2xib3hcIjtcbmltcG9ydCB7IFdvcmtzcGFjZSB9IGZyb20gXCIuL3dvcmtzcGFjZVwiO1xuXG5jbGFzcyBDb2RlRmxpcHtcbiAgcmVuZGVyKCk6IHZvaWQge1xuICAgIHRoaXMuc3ZnLnNldEF0dHJpYnV0ZShcIndpZHRoXCIsdGhpcy5jb250YWluZXIuY2xpZW50V2lkdGgrXCJcIik7XG4gICAgdGhpcy5zdmcuc2V0QXR0cmlidXRlKFwiaGVpZ2h0XCIsdGhpcy5jb250YWluZXIuY2xpZW50SGVpZ2h0K1wiXCIpO1xuICAgIHRoaXMudG9vbGJveC5yZW5kZXIodGhpcy5zdmcpO1xuICAgIHRoaXMud29ya3NwYWNlLnJlbmRlcih0aGlzLnN2Zyk7XG4gIH1cblxuICBjb250YWluZXI6SFRNTERpdkVsZW1lbnQ7XG4gIHN2ZzpTVkdFbGVtZW50O1xuICB0b29sYm94OlRvb2xib3g7XG4gIHdvcmtzcGFjZTpXb3Jrc3BhY2U7XG4gIGNvbnN0cnVjdG9yKGNvbnRhaW5lcjpIVE1MRGl2RWxlbWVudCl7XG4gICAgdGhpcy5jb250YWluZXI9Y29udGFpbmVyO1xuICAgIHRoaXMuc3ZnPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsIFwic3ZnXCIpO1xuICAgIHRoaXMuc3ZnLmlubmVySFRNTD1gXHQ8ZmlsdGVyIGlkPVwiQmV2ZWxcIiBmaWx0ZXJVbml0cz1cIm9iamVjdEJvdW5kaW5nQm94XCIgeD1cIi0xMCVcIiB5PVwiLTEwJVwiIHdpZHRoPVwiMTUwJVwiIGhlaWdodD1cIjE1MCVcIj5cblx0XHQ8ZmVHYXVzc2lhbkJsdXIgaW49XCJTb3VyY2VBbHBoYVwiIHN0ZERldmlhdGlvbj1cIjEuNVwiIHJlc3VsdD1cImJsdXJcIi8+XG5cdFx0PGZlU3BlY3VsYXJMaWdodGluZyBpbj1cImJsdXJcIiBzdXJmYWNlU2NhbGU9XCIxXCIgc3BlY3VsYXJDb25zdGFudD1cIjAuNVwiIHNwZWN1bGFyRXhwb25lbnQ9XCIxMFwiIHJlc3VsdD1cInNwZWNPdXRcIiBsaWdodGluZy1jb2xvcj1cIndoaXRlXCI+XG5cdFx0XHQ8ZmVQb2ludExpZ2h0IHg9XCItNTAwMFwiIHk9XCItNTAwMFwiIHo9XCI4MDAwXCIvPlxuXHRcdDwvZmVTcGVjdWxhckxpZ2h0aW5nPlxuXHRcdDxmZUNvbXBvc2l0ZSBpbj1cInNwZWNPdXRcIiBpbjI9XCJTb3VyY2VBbHBoYVwiIG9wZXJhdG9yPVwiaW5cIiByZXN1bHQ9XCJzcGVjT3V0MlwiLz5cblx0XHQ8ZmVDb21wb3NpdGUgaW49XCJTb3VyY2VHcmFwaGljXCIgaW4yPVwic3BlY091dDJcIiBvcGVyYXRvcj1cImFyaXRobWV0aWNcIiBrMT1cIjBcIiBrMj1cIjFcIiBrMz1cIjFcIiBrND1cIjBcIiByZXN1bHQ9XCJsaXRQYWludFwiIC8+XG5cdDwvZmlsdGVyPmA7XG4gICAgdGhpcy5jb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5zdmcpO1xuICAgIHRoaXMuc3ZnLnNldEF0dHJpYnV0ZShcIndpZHRoXCIsdGhpcy5jb250YWluZXIuY2xpZW50V2lkdGgrXCJcIik7XG4gICAgdGhpcy5zdmcuc2V0QXR0cmlidXRlKFwiaGVpZ2h0XCIsdGhpcy5jb250YWluZXIuY2xpZW50SGVpZ2h0K1wiXCIpO1xuICAgIHRoaXMudG9vbGJveD1uZXcgVG9vbGJveCh0aGlzKTtcbiAgICB0aGlzLndvcmtzcGFjZT1uZXcgV29ya3NwYWNlKHRoaXMpO1xuICAgIHZhciBtZT10aGlzO1xuICAgIHdpbmRvdy5zZXRJbnRlcnZhbChmdW5jdGlvbigpe21lLnJlbmRlcigpfSwxMCk7XG4gIH1cbn1cbmV4cG9ydCB7Q29kZUZsaXB9O1xuIiwiaW1wb3J0IHtDb2RlRmxpcH0gZnJvbSBcIi4vY29kZUZsaXBcIjtcbnZhciBlZGl0b3JFbGVtZW50OkhUTUxEaXZFbGVtZW50PWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGVkaXRvckVsZW1lbnQpO1xuKDxhbnk+d2luZG93KS5lZGl0b3JFbGVtZW50PWVkaXRvckVsZW1lbnQ7XG52YXIgZWRpdG9yOkNvZGVGbGlwPW5ldyBDb2RlRmxpcChlZGl0b3JFbGVtZW50KTtcbig8YW55PndpbmRvdykuZWRpdG9yPWVkaXRvcjtcbmVkaXRvci5yZW5kZXIoKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=