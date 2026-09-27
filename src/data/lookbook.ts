import { LookbookItem } from '../types';
import { ASSETS } from './products';

export const LOOKBOOK_ITEMS: LookbookItem[] = [
  {
    id: 'look-1',
    title: 'Minimal Sandstone & Denim',
    subtitle: 'Nawalgarh Campaign Look 01',
    image: ASSETS.womenCropShoot,
    taggedProductIds: ['top-01', 'jean-04'],
    aspect: 'tall'
  },
  {
    id: 'look-2',
    title: 'Double Indigo Selvedge',
    subtitle: '14.5oz Raw Uniform',
    image: ASSETS.denimJacketShoot,
    taggedProductIds: ['jacket-01', 'jean-01'],
    aspect: 'portrait'
  },
  {
    id: 'look-3',
    title: 'Boxy 280 GSM Cut',
    subtitle: 'Washed Onyx Drop Shoulder',
    image: ASSETS.oversizedTeeShoot,
    taggedProductIds: ['tee-01', 'jean-02'],
    aspect: 'portrait'
  },
  {
    id: 'look-4',
    title: '450 GSM Loopback Drape',
    subtitle: 'Seamless Crossover Hood',
    image: ASSETS.fleeceHoodieShoot,
    taggedProductIds: ['hoodie-01', 'jean-01'],
    aspect: 'square'
  },
  {
    id: 'look-5',
    title: 'Slub Linen Summer Street',
    subtitle: 'Camp Collar & Relaxed Selvedge',
    image: ASSETS.linenShirtShoot,
    taggedProductIds: ['shirt-01', 'jean-01'],
    aspect: 'portrait'
  },
  {
    id: 'look-6',
    title: 'Architectural Stacks',
    subtitle: 'Heavy Ring-Spun Cotton Stacking',
    image: ASSETS.denimJeansDetail,
    taggedProductIds: ['jean-01', 'tee-01'],
    aspect: 'square'
  }
];
