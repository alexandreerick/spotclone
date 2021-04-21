import { Route, BrowserRouter } from 'react-router-dom';

import Home from './pages/Home/Home';
import Playlist from './pages/Playlist/Playlist';

import GlobalStyles from './styles/global';

const Routes = () => (
  <BrowserRouter>
    <GlobalStyles />
    <Route component={Home} path="/" exact />
    <Route component={Playlist} path="/playlist" />
  </BrowserRouter>
);

export default Routes;
