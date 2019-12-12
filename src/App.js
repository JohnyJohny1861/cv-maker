import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Navbar from './containers/Navbar/Navbar';
import CVBuilder from './PAGES/CVBuilder'
import Auth from './PAGES/Auth';
import Logout from './PAGES/Logout';
import Usage from './PAGES/Usage'

const App = (props) => {
  
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route path="/logout" component={Logout} />
        <Route path="/login" component={Auth} />
        <Route path="/usage" component={Usage} />
        <Route path="/" exact component={CVBuilder} />
      </Switch>
    </BrowserRouter>
  );
}

export default App
