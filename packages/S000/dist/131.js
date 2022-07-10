"use strict";(self.webpackChunk_000=self.webpackChunk_000||[]).push([[131],{131:(t,e,n)=>{n.r(e),n.d(e,{default:()=>b});var r=n(29),i=n(206),a=n.n(i);function o(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function l(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var n=t&&("undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"]);if(null!=n){var r,i,a=[],o=!0,l=!1;try{for(n=n.call(t);!(o=(r=n.next()).done)&&(a.push(r.value),!e||a.length!==e);o=!0);}catch(t){l=!0,i=t}finally{try{o||null==n.return||n.return()}finally{if(l)throw i}}return a}}(t,e)||function(t,e){if(t){if("string"==typeof t)return o(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?o(t,e):void 0}}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function s(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function u(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function c(t,e,n){return e&&u(t.prototype,e),n&&u(t,n),t}function h(t,e){return h=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},h(t,e)}function f(t){return f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},f(t)}function g(t,e){return!e||"object"!==f(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function v(t){return v=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},v(t)}function d(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=v(t);if(e){var i=v(this).constructor;n=Reflect.construct(r,arguments,i)}else n=r.apply(this,arguments);return g(this,n)}}var m=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&h(t,e)}(n,t);var e=d(n);function n(t){var r;return s(this,n),(r=e.call(this,t)).metaballs=[],r.numMetaballs=10,r}return c(n,[{key:"init",value:function(){this.initFragPlayground("#define GLSLIFY 1\nattribute vec2 a_position;\n\nvoid main() {\n    gl_Position = vec4(a_position, 0.0, 1.0);\n}\n","precision mediump float;\n#define GLSLIFY 1\n\nconst int len = 10;\nconst vec3 pink = vec3(0.98, 0.81, 0.85);\nconst vec3 blue = vec3(0.79, 0.91, 0.93);\n\nuniform vec3 u_metaballs[len];\nuniform vec2 u_resolution;\n\nvoid main() {\n  vec2 coord = gl_FragCoord.xy;\n  float velocity = 0.0;\n  vec3 color = blue;\n\n  for(int i = 0; i < len; i++) {\n    vec3 ball = u_metaballs[i];\n    float dx = ball.x - coord.x;\n    float dy = ball.y - coord.y;\n    float r = ball.z;\n    velocity += r * r / (dx * dx + dy * dy);\n\n    if(velocity > 1.0) {\n      float distanceFromRadius = abs(distance(coord.xy, ball.xy));\n      float scaledDistance = distanceFromRadius / r;\n\n      color.r = 2.9 - scaledDistance;\n      color.gb = pink.gb;\n      break;\n    }\n  }\n  gl_FragColor = vec4(color, 1.0);\n}\n"),this.getUResolution("u_resolution"),this.getAPosition("a_position"),this.generateMetaballs()}},{key:"generateMetaballs",value:function(){for(var t=this.getSmallestDimmension(),e=.1*t,n=.02*t,r=0;r<this.numMetaballs;r++){var i=this.getRandomRange(n,e);this.metaballs.push({x:this.getRandomRange(i,this.canvas.width-2),y:this.getRandomRange(i,this.canvas.height-2),velX:this.getRandomRange(2,8),velY:this.getRandomRange(2,8),r:i})}}},{key:"draw",value:function(){var t=this;this.updateMetaballs();var e=new Float32Array(3*this.numMetaballs);this.metaballs.forEach((function(t,n){var r=3*n;e[r+0]=t.x,e[r+1]=t.y,e[r+2]=t.r}));var n=this.getUniformLocation(this.program,"u_metaballs");this.gl.uniform3fv(n,e),this.gl.drawArrays(this.gl.TRIANGLE_STRIP,0,4),requestAnimationFrame((function(){return t.draw()}))}},{key:"updateMetaballs",value:function(){var t=this;this.metaballs.map((function(e){e.x+=e.velX,e.y+=e.velY,e.x-e.r<0?(e.x=e.r+1,e.velX=Math.abs(e.velX)):e.x+e.r>t.canvas.width&&(e.x=t.canvas.width-e.r,e.velX=-Math.abs(e.velX)),e.y-e.r<0?(e.y=e.r+1,e.velY=Math.abs(e.velY)):e.y+e.r>t.canvas.height&&(e.y=t.canvas.height-e.r,e.velY=-Math.abs(e.velY))}))}}]),n}(function(){function t(e){s(this,t),this.canvas=e;try{this.gl=e.getContext("webgl")}catch(t){throw alert("Sorry, WebGL has not been enabled on your browser :("),t}this.program={},this.vertShader={},this.fragShader={},this.mouse={},this.images=[]}return c(t,[{key:"unmount",value:function(){}},{key:"init",value:function(){}},{key:"draw",value:function(){}},{key:"render",value:function(){this.init(),this.draw()}},{key:"clear",value:function(){this.gl.clearColor(0,0,0,1),this.gl.clear(this.gl.COLOR_BUFFER_BIT)}},{key:"resize",value:function(t,e){this.canvas.width=t,this.canvas.height=e,this.gl.viewport(0,0,this.gl.drawingBufferWidth,this.gl.drawingBufferHeight)}},{key:"getRandomRange",value:function(t,e){return Math.random()*(e-t)+t}},{key:"getSmallestDimmension",value:function(){return this.canvas.width>this.canvas.height?this.canvas.width:this.canvas.height}},{key:"setMouseMoveListener",value:function(){var t=this;this.canvas.addEventListener("mousemove",(function(e){t.mouse={x:e.clientX?e.clientX:0,y:e.clientY?e.clientY:0}}))}},{key:"addMouseListener",value:function(t){}},{key:"initFragPlayground",value:function(t,e){this.vertShader=this.compileShader(t,this.gl.VERTEX_SHADER),this.fragShader=this.compileShader(e,this.gl.FRAGMENT_SHADER),this.program=this.createProgram(this.vertShader,this.fragShader);var n=new Float32Array([-1,1,-1,-1,1,1,1,-1]),r=this.gl.createBuffer();this.gl.bindBuffer(this.gl.ARRAY_BUFFER,r),this.gl.bufferData(this.gl.ARRAY_BUFFER,n,this.gl.STATIC_DRAW)}},{key:"createProgram",value:function(t,e){var n=this.gl.createProgram();return this.gl.attachShader(n,t),this.gl.attachShader(n,e),this.gl.linkProgram(n),this.gl.useProgram(n),n}},{key:"compileShader",value:function(t,e){var n=this.gl.createShader(e);if(this.gl.shaderSource(n,t),this.gl.compileShader(n),!this.gl.getShaderParameter(n,this.gl.COMPILE_STATUS))throw"Failed to compile shader: ".concat(this.gl.getShaderInfoLog(n));return n}},{key:"getAttribLocation",value:function(t,e){var n=this.gl.getAttribLocation(t,e);if(-1===n)throw"Cannot find attribute ".concat(e);return n}},{key:"getUniformLocation",value:function(t,e){var n=this.gl.getUniformLocation(t,e);if(-1===n)throw"Cannot find uniform ".concat(e);return n}},{key:"getAPosition",value:function(){var t=this.getAttribLocation(this.program,"a_position");this.gl.enableVertexAttribArray(t),this.gl.vertexAttribPointer(t,2,this.gl.FLOAT,this.gl.FALSE,8,0)}},{key:"getUResolution",value:function(){var t=this.getUniformLocation(this.program,"u_resolution");this.gl.uniform2f(t,this.canvas.width,this.canvas.height)}},{key:"getUTime",value:function(){var t=(Date.now()-this.startTime)/1e3,e=this.getUniformLocation(this.program,"u_time");this.gl.uniform1f(e,t)}},{key:"getUMouse",value:function(){var t=this.getUniformLocation(this.program,"u_mouse");this.gl.uniform2f(t,this.mouse.x,this.mouse.y)}},{key:"loadImage",value:function(t,e){var n=new Image;return n.src=t,n.onload=e,n}},{key:"loadImages",value:function(t,e){var n=this,r=t.length,i=function(){0==--r&&e()};t.forEach((function(t){var e=n.loadImage(t,i);n.images.push(e)}))}}]),t}());function y(t){var e=t.ready,n=void 0===e||e,r=(0,i.useRef)(null),o=(0,i.useRef)(null),s=(0,i.useMemo)((function(){if(r.current)return new m(r.current,o.current)}),[r.current]),u=function(){var t=l((0,i.useState)(0),2),e=t[0],n=t[1],r=l((0,i.useState)(0),2),a=r[0],o=r[1];return(0,i.useEffect)((function(){var t=function(){var t=window,e=t.innerWidth,r=t.innerHeight;n(e),o(r)};return t(),window.addEventListener("resize",t),function(){return window.removeEventListener("resize",t)}}),[]),{width:e,height:a}}(),c=u.width,h=u.height;return(0,i.useEffect)((function(){s&&s.resize(c,h)}),[s,c,h]),(0,i.useEffect)((function(){s&&n&&s.render()}),[s,n]),a().createElement(a().Fragment,null,a().createElement("canvas",{ref:r}),a().createElement("audio",{ref:o,loop:!0}))}function b(){return a().createElement(y,null)}var p=document.getElementById("S000-container");(0,r.s)(p).render(a().createElement(b,null))},29:(t,e,n)=>{var r=n(432);e.s=r.createRoot,r.hydrateRoot}}]);