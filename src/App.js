import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import 'bootstrap/dist/js/bootstrap.min.js';

import Header from './components/Header';
import Content from './components/Content';

import Login from './components/Login';
import Signup from './components/Signup';

import Footer from './components/Footer';

import About from './components/About';

import {useSelector} from 'react-redux';
import {login} from './actions'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {

  const userInfo = useSelector(state => state.user_info);

  console.log(userInfo)
  return (
    <Router>
      <div id="main">
        <Header />
          <Switch>
            <Route path="/" exact>
              { !userInfo.isLoggedIn ?
                <Content>
                  <Login />
                  <Signup />
                </Content>
                : "empty" }
            </Route>
            <Route path="/about" component={About} />
          </Switch>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
