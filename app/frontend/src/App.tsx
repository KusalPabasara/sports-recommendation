import { useState } from 'react';
import Landing from './pages/Landing';
import Questionnaire from './pages/Questionnaire';
import Results from './pages/Results';
import type { RecommendResponse } from './lib/api';

type Page = 'landing' | 'questionnaire' | 'results';

function App() {
  const [page, setPage] = useState<Page>('landing');
  const [results, setResults] = useState<RecommendResponse | null>(null);

  return (
    <>
      {page === 'landing' && <Landing onStart={() => setPage('questionnaire')} />}
      {page === 'questionnaire' && (
        <Questionnaire
          onResults={(r) => {
            setResults(r);
            setPage('results');
          }}
          onBack={() => setPage('landing')}
        />
      )}
      {page === 'results' && results && (
        <Results data={results} onRestart={() => setPage('questionnaire')} />
      )}
    </>
  );
}

export default App;
