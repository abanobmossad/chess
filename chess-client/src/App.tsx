import { RouterProvider } from 'react-router-dom';
import appRoute from './routes/app.routes';
import './App.css';
import { Center } from '@chakra-ui/react';

function App() {
  return (
    <Center className="app-container">
        <RouterProvider router={appRoute} />
    </Center>
  );
}

export default App;
