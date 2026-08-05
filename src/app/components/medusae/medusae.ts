import { Component, HostBinding, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { NgtCanvas } from '@angular-three/core';
import { NgtPlaneGeometry } from '@angular-three/core/geometries';
import { NgtShaderMaterial } from '@angular-three/core/materials';
import { NgtInstancedMesh } from '@angular-three/core/meshes';
import * as THREE from 'three';

export const MEDUSAE_DEFAULTS = {
  cursor: { radius: 0.065, strength: 3, dragFactor: 0.015 },
  halo: {
    outerOscFrequency: 2.6,
    outerOscAmplitude: 0.76,
    radiusBase: 2.4,
    radiusAmplitude: 0.5,
    shapeAmplitude: 0.75,
    rimWidth: 1.8,
    outerStartOffset: 0.4,
    outerEndOffset: 2.2,
    scaleX: 1.3,
    scaleY: 1,
  },
  particles: {
    baseSize: 0.016,
    activeSize: 0.044,
    blobScaleX: 1,
    blobScaleY: 0.6,
    rotationSpeed: 0.1,
    rotationJitter: 0.2,
    cursorFollowStrength: 1,
    oscillationFactor: 1,
    colorBase: '#0000ff',
    colorOne: '#4285f5',
    colorTwo: '#eb4236',
    colorThree: '#faba03',
  },
  background: { color: '#ffffff' },
};

export interface MedusaeConfig {
  cursor?: Partial<typeof MEDUSAE_DEFAULTS.cursor>;
  halo?: Partial<typeof MEDUSAE_DEFAULTS.halo>;
  particles?: Partial<typeof MEDUSAE_DEFAULTS.particles>;
  background?: Partial<typeof MEDUSAE_DEFAULTS.background>;
}

const VERTEX_SHADER = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uOuterOscFrequency;
  uniform float uOuterOscAmplitude;
  uniform float uHaloRadiusBase;
  uniform float uHaloRadiusAmplitude;
  uniform float uHaloShapeAmplitude;
  uniform float uHaloRimWidth;
  uniform float uHaloOuterStartOffset;
  uniform float uHaloOuterEndOffset;
  uniform float uHaloScaleX;
  uniform float uHaloScaleY;
  uniform float uParticleBaseSize;
  uniform float uParticleActiveSize;
  uniform float uBlobScaleX;
  uniform float uBlobScaleY;
  uniform float uParticleRotationSpeed;
  uniform float uParticleRotationJitter;
  uniform float uParticleOscillationFactor;
  attribute vec3 aOffset;
  attribute float aRandom;
  varying vec2 vUv;
  varying float vSize;
  varying vec2 vPos;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
  }

  void main() {
    vUv = uv;
    vec3 pos = aOffset;
    float drift = uTime * 0.15;
    pos.x += (sin(drift + pos.y * 0.5) + sin(drift * 0.5 + pos.y * 2.0)) * 0.25;
    pos.y += (cos(drift + pos.x * 0.5) + cos(drift * 0.5 + pos.x * 2.0)) * 0.25;

    vec2 rel = pos.xy - uMouse;
    vec2 haloScale = max(vec2(uHaloScaleX, uHaloScaleY), vec2(0.0001));
    float dist = length(rel / haloScale);
    vec2 dir = normalize(rel + vec2(0.0001, 0.0));
    float shape = noise(dir * 2.0 + vec2(0.0, uTime * 0.1));
    float breath = sin(uTime * 0.8);
    float baseRadius = uHaloRadiusBase + breath * uHaloRadiusAmplitude;
    float radius = baseRadius + shape * uHaloShapeAmplitude;
    float rim = smoothstep(uHaloRimWidth, 0.0, abs(dist - radius));
    pos.xy += dir * (breath * 0.5 + 0.5) * 0.5 * rim;
    pos.z += rim * 0.3 * sin(uTime);

    float outer = smoothstep(baseRadius + uHaloOuterStartOffset, baseRadius + uHaloOuterEndOffset, dist);
    float outerOsc = sin(uTime * uOuterOscFrequency + pos.x * 0.6 + pos.y * 0.6);
    pos.xy += dir * outerOsc * uOuterOscAmplitude * outer;

    float size = uParticleBaseSize + sin(uTime + pos.x) * 0.003 + rim * uParticleActiveSize;
    vec3 transformed = position;
    transformed.x *= (size + rim * 0.02) * uBlobScaleX;
    transformed.y *= size * uBlobScaleY;
    vSize = rim;
    vPos = pos.xy;

    vec2 radial = rel / max(length(rel), 0.0001);
    float phase = aRandom * 6.28318530718;
    float oscillation = 0.5 + 0.5 * sin(uTime * (0.25 + uParticleOscillationFactor * 0.35) + phase);
    float speed = mix(0.55, 1.35, oscillation) * (0.8 + uParticleOscillationFactor * 0.2);
    float jitterScale = mix(0.7, 1.45, oscillation) * (0.85 + uParticleOscillationFactor * 0.15);
    float jitter = sin(uTime * uParticleRotationSpeed * speed + pos.x * 0.35 + pos.y * 0.35) * uParticleRotationJitter * jitterScale;
    vec2 perpendicular = vec2(-radial.y, radial.x);
    vec2 rotated = normalize(radial + perpendicular * jitter);
    transformed.xy = mat2(rotated.x, rotated.y, -rotated.y, rotated.x) * transformed.xy;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos + transformed, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  uniform float uTime;
  uniform vec3 uParticleColorBase;
  uniform vec3 uParticleColorOne;
  uniform vec3 uParticleColorTwo;
  uniform vec3 uParticleColorThree;
  varying vec2 vUv;
  varying float vSize;
  varying vec2 vPos;

  void main() {
    vec2 pos = abs(vUv - vec2(0.5)) * 2.0;
    float distanceFromCenter = pow(pow(pos.x, 2.6) + pow(pos.y, 2.6), 1.0 / 2.6);
    float alpha = 1.0 - smoothstep(0.8, 1.0, distanceFromCenter);
    if (alpha < 0.01) discard;
    float time = uTime * 1.2;
    float p1 = sin(vPos.x * 0.8 + time);
    float p2 = sin(vPos.y * 0.8 + time * 0.8 + p1);
    vec3 blendedColor = mix(uParticleColorOne, uParticleColorTwo, p1 * 0.5 + 0.5);
    blendedColor = mix(blendedColor, uParticleColorThree, p2 * 0.5 + 0.5);
    vec3 color = mix(uParticleColorBase, blendedColor, smoothstep(0.1, 0.8, vSize));
    gl_FragColor = vec4(color, alpha * mix(0.4, 0.95, vSize));
  }
`;

type MergedConfig = {
  cursor: typeof MEDUSAE_DEFAULTS.cursor;
  halo: typeof MEDUSAE_DEFAULTS.halo;
  particles: typeof MEDUSAE_DEFAULTS.particles;
  background: typeof MEDUSAE_DEFAULTS.background;
};

@Component({
  selector: 'app-medusae',
  imports: [NgtCanvas, NgtInstancedMesh, NgtPlaneGeometry, NgtShaderMaterial],
  templateUrl: './medusae.html',
  styleUrl: './medusae.css',
})
export class Medusae implements OnInit, OnChanges, OnDestroy {
  @Input() className = '';
  @Input() config: MedusaeConfig | null = null;
  @HostBinding('class') protected hostClasses = '';

  protected readonly countX = 100;
  protected readonly countY = 55;
  protected readonly count = this.countX * this.countY;
  protected readonly camera = { position: [0, 0, 5] as [number, number, number], fov: 50 };
  protected readonly vertexShader = VERTEX_SHADER;
  protected readonly fragmentShader = FRAGMENT_SHADER;
  protected merged = this.mergeConfig(null);
  protected readonly scene = { background: null as THREE.Color | null };
  protected readonly gl = { alpha: true, antialias: true };
  protected uniforms = this.createUniforms(this.merged);

  private pointer = { x: 0, y: 0 };
  private hovering = true;
  private reducedMotion = false;
  private mediaQuery?: MediaQueryList;
  private readonly onMotionPreferenceChange = (event: MediaQueryListEvent) => {
    this.reducedMotion = event.matches;
  };
  private readonly onPointerMove = (event: PointerEvent) => {
    this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
  };
  private readonly onBodyLeave = () => (this.hovering = false);
  private readonly onBodyEnter = () => (this.hovering = true);

  ngOnInit(): void {
    this.mediaQuery = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    this.reducedMotion = this.mediaQuery?.matches ?? false;
    this.mediaQuery?.addEventListener('change', this.onMotionPreferenceChange);
    window.addEventListener('pointermove', this.onPointerMove, { passive: true });
    document.body.addEventListener('mouseleave', this.onBodyLeave);
    document.body.addEventListener('mouseenter', this.onBodyEnter);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.hostClasses = this.className;
    if (!changes['config']) return;
    this.merged = this.mergeConfig(this.config);
    this.scene.background = null;
    const next = this.createUniforms(this.merged);
    Object.assign(this.uniforms, next);
  }

  ngOnDestroy(): void {
    this.mediaQuery?.removeEventListener('change', this.onMotionPreferenceChange);
    window.removeEventListener('pointermove', this.onPointerMove);
    document.body.removeEventListener('mouseleave', this.onBodyLeave);
    document.body.removeEventListener('mouseenter', this.onBodyEnter);
  }

  protected onMeshAppended(mesh: THREE.InstancedMesh): void {
    const offsets = new Float32Array(this.count * 3);
    const randoms = new Float32Array(this.count);
    let index = 0;
    for (let y = 0; y < this.countY; y++) {
      for (let x = 0; x < this.countX; x++) {
        const u = x / (this.countX - 1);
        const v = y / (this.countY - 1);
        offsets[index * 3] = (u - 0.5) * 40 + (Math.random() - 0.5) * 0.25;
        offsets[index * 3 + 1] = (v - 0.5) * 22 + (Math.random() - 0.5) * 0.25;
        randoms[index] = Math.random();
        index++;
      }
    }
    mesh.geometry.setAttribute('aOffset', new THREE.InstancedBufferAttribute(offsets, 3));
    mesh.geometry.setAttribute('aRandom', new THREE.InstancedBufferAttribute(randoms, 1));
  }

  protected onBeforeRender({ state }: { state: { clock: THREE.Clock; viewport: { width: number; height: number } } }): void {
    const time = this.reducedMotion ? 0 : state.clock.getElapsedTime();
    this.uniforms['uTime'].value = time;
    if (!this.hovering || this.reducedMotion) return;
    const jitterRadius = Math.min(state.viewport.width, state.viewport.height) * this.merged.cursor.radius;
    const jitterX = (Math.sin(time * 0.35) + Math.sin(time * 0.77 + 1.2)) * 0.5;
    const jitterY = (Math.cos(time * 0.31) + Math.sin(time * 0.63 + 2.4)) * 0.5;
    const targetX = (this.pointer.x * state.viewport.width / 2 + jitterX * jitterRadius * this.merged.cursor.strength) * this.merged.particles.cursorFollowStrength;
    const targetY = (this.pointer.y * state.viewport.height / 2 + jitterY * jitterRadius * this.merged.cursor.strength) * this.merged.particles.cursorFollowStrength;
    const current = this.uniforms['uMouse'].value as THREE.Vector2;
    current.x += (targetX - current.x) * this.merged.cursor.dragFactor;
    current.y += (targetY - current.y) * this.merged.cursor.dragFactor;
  }

  private mergeConfig(config: MedusaeConfig | null): MergedConfig {
    return {
      cursor: { ...MEDUSAE_DEFAULTS.cursor, ...config?.cursor },
      halo: { ...MEDUSAE_DEFAULTS.halo, ...config?.halo },
      particles: { ...MEDUSAE_DEFAULTS.particles, ...config?.particles },
      background: { ...MEDUSAE_DEFAULTS.background, ...config?.background },
    };
  }

  private createUniforms(config: MergedConfig): Record<string, THREE.IUniform> {
    return {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2() },
      uOuterOscFrequency: { value: config.halo.outerOscFrequency },
      uOuterOscAmplitude: { value: config.halo.outerOscAmplitude },
      uHaloRadiusBase: { value: config.halo.radiusBase },
      uHaloRadiusAmplitude: { value: config.halo.radiusAmplitude },
      uHaloShapeAmplitude: { value: config.halo.shapeAmplitude },
      uHaloRimWidth: { value: config.halo.rimWidth },
      uHaloOuterStartOffset: { value: config.halo.outerStartOffset },
      uHaloOuterEndOffset: { value: config.halo.outerEndOffset },
      uHaloScaleX: { value: config.halo.scaleX },
      uHaloScaleY: { value: config.halo.scaleY },
      uParticleBaseSize: { value: config.particles.baseSize },
      uParticleActiveSize: { value: config.particles.activeSize },
      uBlobScaleX: { value: config.particles.blobScaleX },
      uBlobScaleY: { value: config.particles.blobScaleY },
      uParticleRotationSpeed: { value: config.particles.rotationSpeed },
      uParticleRotationJitter: { value: config.particles.rotationJitter },
      uParticleOscillationFactor: { value: config.particles.oscillationFactor },
      uParticleColorBase: { value: new THREE.Color(config.particles.colorBase) },
      uParticleColorOne: { value: new THREE.Color(config.particles.colorOne) },
      uParticleColorTwo: { value: new THREE.Color(config.particles.colorTwo) },
      uParticleColorThree: { value: new THREE.Color(config.particles.colorThree) },
    };
  }
}
