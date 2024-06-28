import { filter } from './filter';
import { map } from './map';

const names = [
  'luis',
  'alejandro',
  'pancho',
  'jose',
  'laura',
  'javier',
  'antonio',
  'peppa',
];
const originalFilter = names.filter((name) => name.startsWith('l'));
const copyFilter = filter(names, (name) => name.startsWith('l'));
console.log({ originalFilter, copyFilter });

const originalMap = names.map((name) => `Mi nombre es ${name}`);
const copyMap = map(names, (name) => `Mi nombre es ${name}`);
console.log({ originalMap, copyMap });
