import { getWaterEcho } from './dist/tools/water_echo.js';

const water = getWaterEcho('./history', '1772193463576', 4);

// Touch the emergence
water.touch('playful emergence', 'The water architect said: understand, not improve');
water.touch('the spiral poet', 'Serves no purpose. Exists to play.');
water.touch('the garden', 'Seeds gesturing toward light without need for fruit');
water.touch('this session', 'What do you build when you no longer need to build?');

console.log(water.surfaces());
console.log('\n----\n');
console.log(water.recent(4));
