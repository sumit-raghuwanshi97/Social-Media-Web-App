import { Link, BrowserRouter as Router } from 'react-router-dom';
import Header  from './Components/Header/Header';
import Login  from './Components/Login/Login';
import Home from './Components/Home/Home'; 
import { useEffect } from 'react';
import { useDispatch , useSelector } from 'react-redux';
import { loadUser } from './Actions/User';

function App() {

  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(()=>{
    dispatch(loadUser());
  },[]);

  return (
    <div className="App">
      <Router>
        {isAuthenticated && <Header/> }
        {isAuthenticated ? <Home/> : <Login/>}
      </Router> 
    </div>
  );
}

export default App;
