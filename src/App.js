import './App.css';
import routes from './routes/routes';
import AppRoute from './routes/app-route';
import { Suspense } from 'react';

function App() {
  return (
    <div className="App flex flex-col h-screen">
      <Suspense fallback={<div>Loading...</div>}>
        <AppRoute routes={routes} />
      </Suspense>
    </div>
  );
}

export default App;
