import supabase from './supabase';

export const findBurmese = (word_input, max_rows) => supabase
  .rpc('search_burmese', { word_input, max_rows })
  .catch((e) => {
    console.error(e);
    return [];
  });

export const findWord = (w) => supabase
  .rpc('find_word', { w })
  .catch((e) => {
    console.error(e);
    return [];
  });
  
export const similarWord = (w, x = 5) => supabase
  .rpc('similar_word', { w, x })
  .catch((e) => {
    console.error(e);
    return [];
  });
