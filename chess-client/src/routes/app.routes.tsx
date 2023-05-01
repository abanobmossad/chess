import { createBrowserRouter } from 'react-router-dom';
import { GamePlay } from '../pages/GamePlay';
import { NewGame } from '../pages/NewGame';

const appRoute = createBrowserRouter([
  {
    path: '/',
    element: <NewGame />,
  },
  {
    path: '/play/:gameId',
    element: <GamePlay />,
  },
]);

export default appRoute;
