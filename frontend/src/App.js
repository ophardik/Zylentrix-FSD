import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Signup from './Components/Authentication/Signup';
import Login from './Components/Authentication/Login';
import Posts from './Components/Posts/AllPost';
import CreatePost from './Components/Posts/CreatePost';

function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route path="/signup" element={<Signup/>} />
    <Route path="/login" element={<Login/>} />
    <Route path="/" element={<Posts/>} />
    <Route path="/create" element={<CreatePost/>} />
   </Routes>
   </BrowserRouter>
  );
}

export default App;
