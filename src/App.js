import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import 'bootstrap/dist/js/bootstrap.min.js';

import Header from './components/Header';
import Content from './components/Content';
import LoginSignupForms from './components/LoginSignupForms';
import Profile from './components/Profile';

import Footer from './components/Footer';

import About from './components/About';
import Users from './components/Users';

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
  const allInfo = useSelector(state => state);

  console.log(allInfo);
  return (
    <Router>
      <Header />
      <Content>
        <Switch>
          <Route path="/" exact>
            { !userInfo.isLoggedIn ? <LoginSignupForms/> : <Profile/> }
          </Route>
          <Route path="/about" component={About} />
          {userInfo.isLoggedIn && <Route path="/users" component={Users} /> }
          {userInfo.isLoggedIn && <Route path="/profile" component={Profile} /> }
        </Switch>
      </Content>
      <Footer/>
    </Router>
  );
}

export default App;
