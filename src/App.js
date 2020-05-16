import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Home from './pages/Home';

import './styles/base.scss';

class App extends React.Component {

  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route 
              exact path='/' 
              render={props => (
                    <Home {...props}/>
                    )}
            />
            
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
