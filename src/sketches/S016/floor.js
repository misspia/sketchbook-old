import * as THREE from 'three';
import Tile from './tile';
import FloorBack from './floorBack';
import utils from '../utils';

const spectrumType = {
  BASS: 'bass',
  MIDRANGE: 'midrange',
  HIGHRANGE: 'highrange',
};

export default class Floor {
  constructor(context, { size = 1, divisions = 1 }) {
    this.context = context;
    this.spectrumStart = context.spectrumStart;

    this.tileBorderWidth = 0.05;
    this.size = size;
    this.divisions = divisions;
    this.numTiles = Math.pow(this.divisions, 2);
    this.tiles = [];

    this.floorBack = new FloorBack(size);

    this.pivot = new THREE.Group();
    this.pivot.add(this.floorBack.pivot)
    this.createTiles();
  }

  get position() {
    return this.pivot.position;
  }

  createTiles() {
    const tilesPerRow = this.divisions;
    const borderWidth = 0.02;
    const tileSize = this.size / this.divisions - borderWidth;

    const xStart = this.floorBack.min.x + tileSize / 2;
    const zStart = this.floorBack.min.z + tileSize / 2;
    let x = xStart;
    let z = zStart;

    const xIncrement = tileSize + borderWidth;
    const zIncrement = tileSize + borderWidth;

    for (let i = 1; i <= this.numTiles; i++) {
      let isActive = this.setActiveState(i);
      const spectrum = this.pickSpectrum(i);

      const tile = new Tile({
        size: tileSize,
        isActive,
        spectrum,
        freqIndex: this.pickFreqIndex(spectrum),
      });

      tile.position.set(x, 0, z);

      this.tiles.push(tile);
      this.pivot.add(tile.pivot);

      if (i % tilesPerRow === 0) {
        x = xStart;
        z += zIncrement;
      } else {
        x += xIncrement;
      }
    }
  }

  setActiveState(tileIndex) {
    const rowMid = Math.round(this.divisions / 2)
    const rowPosition = tileIndex % this.divisions;
    const distanceToRowMid = Math.abs(rowPosition -  rowMid);
    const trueWeightRow = 1 - utils.remap(0, rowMid, 0.4, 1, distanceToRowMid);

    const colMid = Math.round(this.divisions / 2);
    const colNum = Math.ceil(tileIndex / this.divisions) - 1;
    const distanceToColMid = Math.abs(colNum - colMid);
    const trueWeightCol = 1 - utils.remap(0, colMid, 0.25, 1, distanceToColMid);

    return utils.weightedRandomBool(trueWeightRow * trueWeightCol);
  }
  pickSpectrum(tileIndex) {
    const third = this.divisions / 3;

    // divisions === tiles per row
    if (tileIndex % this.divisions < third) {
      return spectrumType.BASS;
    }
    if (tileIndex % this.divisions < third * 2) {
      return spectrumType.MIDRANGE
    }
    return spectrumType.HIGHRANGE;
  }
  pickFreqIndex(spectrum) {
    const { bass, midrange, highrange } = this.spectrumStart;

    switch (spectrum) {
      case spectrumType.BASS: {
        return utils.randomIntBetween(bass, midrange);
      }
      case spectrumType.MIDRANGE: {
        return utils.randomIntBetween(midrange, highrange);
      }
      default: {
        return utils.randomIntBetween(highrange, this.context.frequencyDataLength - 1);
      }
    }
  }

  update() {
    const { midrangeAverages, bassAverages, highrangeAverages } = this.context.beatManager;
    const bassAverage = bassAverages[bassAverages.length - 1];
    const midrangeAverage = midrangeAverages[midrangeAverages.length - 1];
    const highrangeAverage = highrangeAverages[highrangeAverages.length - 1];
    this.tiles.forEach(tile => {
      const average =
        tile.spectrum === spectrumType.BASS ? bassAverage :
          tile.spectrum === spectrumType.MIDRANGE ? midrangeAverage :
            highrangeAverage;
      const freq = this.context.audio.frequencyData[tile.freqIndex];
      tile.update(freq, average);
    });
  }
}
