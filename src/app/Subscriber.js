import sendMessage from './telegram';
import supabase from './supabase';

class Subscriber {
  find({ provider_name, user_id  }) {
    let params = new URLSearchParams({
      provider_name,
      user_id,
    });
    return supabase.get('/rest/v1/subscribers?' + params.toString())
      .then(({ data }) => data);
  }
}

export default new Subscriber();
