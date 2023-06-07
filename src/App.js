import './App.css';
import About from './components/About';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Navbar from './components/Navbar';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import NoteState from './context/notes/NoteState';
import AuthState from './context/auth/AuthState';
import Alert from './components/Alert';
import AlertState from './context/alert/AlertState';

function App () {
  return (
    <>
      <AlertState>
        <NoteState>
          <Router>
            <AuthState>
              <Navbar />
              <Alert />
              <div className="container">
                <Routes>
                  <Route exact path="/" element={<Home />}></Route>
                  <Route exact path="/about" element={<About />}></Route>
                  <Route exact path="/login" element={<Login />}></Route>
                  <Route exact path="/signup" element={<Signup />}></Route>
                </Routes>
              </div>
            </AuthState>
          </Router>
        </NoteState>
      </AlertState>
    </>
  );
}

export default App;
