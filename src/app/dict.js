import supabase from './supabase';

export const findBurmese = (word_input, max_rows) => supabase
  .rpc('search_burmese', { word_input, max_rows })
  .catch((e) => []);

export const findWord = (w) => supabase
  .post('find_word', { w })
  .catch((e) => []);
  
export const similarWord = (w, x = 5) => supabase
  .post('similar_word', { w, x })
  .catch((e) => []);
