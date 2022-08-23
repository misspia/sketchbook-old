import * as THREE from 'three';
import {
  GodRaysFakeSunShader,
  GodRaysDepthMaskShader,
  GodRaysCombineShader,
  GodRaysGenerateShader
} from 'three/examples/jsm/shaders/GodRaysShader';

import { PostProcessor } from './PostProcessor';

/**
 * https://github.com/mrdoob/three.js/blob/master/examples/webgl_postprocessing_godrays.html
 */
export default class EffectManager {
  constructor(context) {
    this.godrayRenderTargetResolutionMultiplier = 1.0 / 4.0;
    this.context = context;
    this.context.renderer.autoClear = false;
    this.pp = new PostProcessor(this.context);

    this.sunPosition = new THREE.Vector3(0, 1000, -1000);
    this.clipPosition = new THREE.Vector4();
    this.screenSpacePosition = new THREE.Vector3();

    this.scene = new THREE.Scene();
    this.camera = new THREE.OrthographicCamera(- 0.5, 0.5, 0.5, - 0.5, - 10000, 10000);
    this.camera.position.z = this.context.camera.position.z / 2;

    this.scene.add(this.camera);

    this.pars = {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBFormat
    };
    const renderTargetHeight = this.context.canvas.height;
    const renderTargetWidth = this.context.canvas.width;
    this.rtTextureColors = new THREE.WebGLRenderTarget(renderTargetWidth, renderTargetHeight, this.pars);
    this.rtTextureDepth = new THREE.WebGLRenderTarget(renderTargetWidth, renderTargetHeight, this.pars);
    this.rtTextureDepthMask = new THREE.WebGLRenderTarget(renderTargetWidth, renderTargetHeight, this.pars);

    const adjustedWidth = renderTargetWidth * this.godrayRenderTargetResolutionMultiplier;
    const adjustedHeight = renderTargetHeight * this.godrayRenderTargetResolutionMultiplier;
    this.rtTextureGodRays1 = new THREE.WebGLRenderTarget(adjustedWidth, adjustedHeight, this.pars);
    this.rtTextureGodRays2 = new THREE.WebGLRenderTarget(adjustedWidth, adjustedHeight, this.pars);

    /**
     * godray shaders
     */
    const godraysMaskShader = GodRaysDepthMaskShader;
    this.godrayMaskUniforms = THREE.UniformsUtils.clone(godraysMaskShader.uniforms);
    this.materialGodraysDepthMask = new THREE.ShaderMaterial({
      uniforms: this.godrayMaskUniforms,
      vertexShader: godraysMaskShader.vertexShader,
      fragmentShader: godraysMaskShader.fragmentShader
    });

    const godraysGenShader = GodRaysGenerateShader;
    this.godrayGenUniforms = THREE.UniformsUtils.clone(godraysGenShader.uniforms);
    this.materialGodraysGenerate = new THREE.ShaderMaterial({
      uniforms: this.godrayGenUniforms,
      vertexShader: godraysGenShader.vertexShader,
      fragmentShader: godraysGenShader.fragmentShader
    });


    const godraysCombineShader = GodRaysCombineShader;
    this.godrayCombineUniforms = THREE.UniformsUtils.clone(godraysCombineShader.uniforms);
    this.materialGodraysCombine = new THREE.ShaderMaterial({
      uniforms: this.godrayCombineUniforms,
      vertexShader: godraysCombineShader.vertexShader,
      fragmentShader: godraysCombineShader.fragmentShader
    });

    const godraysFakeSunShader = GodRaysFakeSunShader;
    this.godraysFakeSunUniforms = THREE.UniformsUtils.clone(godraysFakeSunShader.uniforms);
    this.materialGodraysFakeSun = new THREE.ShaderMaterial({
      uniforms: this.godraysFakeSunUniforms,
      vertexShader: godraysFakeSunShader.vertexShader,
      fragmentShader: godraysFakeSunShader.fragmentShader
    });

    this.godraysFakeSunUniforms.bgColor.value.setHex(0x000511);
    this.godraysFakeSunUniforms.sunColor.value.setHex(0xffee00);
    this.godrayCombineUniforms.fGodRayIntensity.value = 0.75;

    this.quad = new THREE.Mesh(
      new THREE.PlaneBufferGeometry(1.0, 1.0),
      this.materialGodraysGenerate
    );
    this.quad.position.z = - 9900;
    this.scene.add(this.quad);
  }

  onResize() {
    const renderTargetHeight = this.context.canvas.height;
    const renderTargetWidth = this.context.canvas.width;

    const adjustedWidth = renderTargetWidth * this.godrayRenderTargetResolutionMultiplier;
    const adjustedHeight = renderTargetHeight * this.godrayRenderTargetResolutionMultiplier;
    this.rtTextureGodRays1 = new THREE.WebGLRenderTarget(adjustedWidth, adjustedHeight, this.pars);
    this.rtTextureGodRays2 = new THREE.WebGLRenderTarget(adjustedWidth, adjustedHeight, this.pars);


  }
  init() {

  }

  getStepSize(filterLen, tapsPerPass, pass) {
    return filterLen * Math.pow(tapsPerPass, - pass);
  }

  filterGodRays(inputTex, renderTarget, stepSize) {

    this.scene.overrideMaterial = this.materialGodraysGenerate;

    this.godrayGenUniforms['fStepSize'].value = stepSize;
    this.godrayGenUniforms['tÎInput'].value = inputTex;

    this.context.renderer.setRenderTarget(renderTarget);
    this.context.renderer.render(this.scene, this.camera);
    this.scene.overrideMaterial = null;

  }

  render() {
    this.clipPosition.x = this.sunPosition.x;
    this.clipPosition.y = this.sunPosition.y;
    this.clipPosition.z = this.sunPosition.z;
    this.clipPosition.w = 1;

    this.clipPosition.applyMatrix4(this.camera.matrixWorldInverse).applyMatrix4(this.camera.projectionMatrix);

    this.clipPosition.x /= this.clipPosition.w;
    this.clipPosition.y /= this.clipPosition.w;

    this.screenSpacePosition.x = (this.clipPosition.x + 1) / 2;
    this.screenSpacePosition.y = (this.clipPosition.y + 1) / 2;
    this.screenSpacePosition.z = this.clipPosition.z;

    this.godrayGenUniforms['vSunPositionScreenSpace'].value.copy(this.screenSpacePosition);
    this.godraysFakeSunUniforms['vSunPositionScreenSpace'].value.copy(this.screenSpacePosition);

    this.context.renderer.setRenderTarget(this.rtTextureColors);
    this.context.renderer.clear(true, true, false);

    /**
     * sun
     */
    const sunsqH = 0.74 * this.context.canvas.height;
    const sunsqW = 0.74 * this.context.canvas.height;

    this.screenSpacePosition.x *= this.context.canvas.width;
    this.screenSpacePosition.y *= this.context.canvas.height;

    this.context.renderer.setScissor(this.screenSpacePosition.x - sunsqW / 2, this.screenSpacePosition.y - sunsqH / 2, sunsqW, sunsqH);
    this.context.renderer.setScissorTest(true);

    this.godraysFakeSunUniforms['fAspect'].value = this.context.canvas.width / this.context.canvas.height;

    this.scene.overrideMaterial = this.materialGodraysFakeSun;
    renderer.setRenderTarget(this.rtTextureColors);
    renderer.render(this.scene, this.camera);

    renderer.setScissorTest(false);
  }
}
