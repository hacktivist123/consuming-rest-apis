import React, { useEffect, useState } from 'react';
import './App.css';
import List from './components/List';
import withListLoading from './components/withListLoading';

function App() {
  const ListLoading = withListLoading(List);
  const [AppState, SetAppState] = useState({
    loading: false,
    repos: null,
  });

  useEffect(() => {
    SetAppState({ loading: true });
    const user = `https://api.github.com/users/hacktivist123/repos`;
    fetch(user)
      .then((res) => res.json())
      .then((repos) => {
        SetAppState({ loading: false, repos: repos });
      });
  }, [SetAppState]);
  return (
    <div className='App'>
      <div className='container'>
        <h1>My Repositories</h1>
      </div>
      <div className='repo-container'>
        <ListLoading isLoading={AppState.loading} repos={AppState.repos} />
      </div>
      <footer>
        <div className='footer'>
          Built{' '}
          <span role='img' aria-label='emoji'>
            💚
          </span>{' '}
          with by Shedrack Akintayo
        </div>
      </footer>
    </div>
  );
}

export default App;
