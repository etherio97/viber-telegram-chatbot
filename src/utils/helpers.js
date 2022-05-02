import Fuse from 'fuse.js';

export const sortItems = (keys = [], items = [], text) => {
  console.log(items);
  return new Fuse(items, { keys }).search(text).map(({ item }) => item);
  };