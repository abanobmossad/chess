import './App.css';
import { RouterProvider } from 'react-router-dom';
import appRoute from './routes/app.routes';

function App() {
  return (
    <div className="app-container">
      <RouterProvider router={appRoute} />
    </div>
  );
}

export default App;
