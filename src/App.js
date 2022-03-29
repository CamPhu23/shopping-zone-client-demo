import './App.css';
import routes from './routes/routes';
import AppRoute from './routes/app-route';
import { Suspense } from 'react';
import Loader from './components/loader/loader';

function App() {
  return (
    <div className="App flex flex-col h-screen">
      <Suspense fallback={<Loader/>}>
        <AppRoute routes={routes} />
      </Suspense>
    </div>
  );
}

export default App;
