import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import 'bootstrap/dist/js/bootstrap.min.js';

import Header from './components/Header';
import Content from './components/Content';

import Login from './components/Login';
import Signup from './components/Signup';

import Footer from './components/Footer';

import {useSelector} from 'react-redux';
import {login} from './actions'

function App() {

  const userInfo = useSelector(state => state.user_info);

  console.log(userInfo)
  return (
    <div id="main">
      <Header />
        {
          !userInfo.isLoggedIn ?
          <Content>
            <Login />
            <Signup />
          </Content>
          : null
        }
      <Footer/>
    </div>
  );
}

export default App;
