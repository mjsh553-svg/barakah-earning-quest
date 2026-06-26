import { useState, useEffect } from 'react';
import { store } from '../lib/store';

export function useStore() {
  const [state, setState] = useState({
    articles: store.getArticles(),
    user: store.getUser(),
  });

  useEffect(() => {
    return store.subscribe(() => {
      setState({
        articles: store.getArticles(),
        user: store.getUser(),
      });
    });
  }, []);

  return state;
}
