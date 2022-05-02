import Fuse from 'fuse.js';

export const sortItems = (keys = [], items = [], text) =>
  new Fuse(result, {
    keys,
  })
  .search(text)
  .map(({ item }) => item);
