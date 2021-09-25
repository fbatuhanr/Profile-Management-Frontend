import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import 'bootstrap/dist/js/bootstrap.min.js';

import Header from './components/Header';
import Content from './components/Content';

import Login from './components/Login';
import Signup from './components/Signup';

import Footer from './components/Footer';

function App() {
  return (
    <div id="main">
      <Header />
        <Content>
          <Login />
          <Signup />
        </Content>
      <Footer/>
    </div>
  );
}

export default App;
