import React, { useEffect, useState } from 'react';

// import Alert from './components/alert/alert';
import Description from './components/sgpadescription/Description';
import GradesTable from './components/sgpagrades/GradesTable';
import Error from './pages/Error';
import Index from './pages/Index';
import MarksSgpa from './pages/MarksSgpa';
import Topbar from './components/topbar/Topbar';

import { Route, Routes, useLocation } from 'react-router-dom';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import NavBtn from './components/navigation/Nav';

import { getAuth, onAuthStateChanged } from 'firebase/auth';


function App() {

  const auth = getAuth();
  const location = useLocation();

  // const [alert, setAlert] = useState(null);
  const [userdata, setUserData] = useState(null);
  const [isauth, setIsAuth] = useState(false);
  const [isuserlogin, setIsUserLogin] = useState(false);

  useEffect(() => {

    const currentPath = location.pathname;
    if (currentPath === '/login' || currentPath === '/signup') {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }

  }, [location.pathname]);

  useEffect(() => {
    const auth = getAuth();

    const checkUserLoginStatus = () => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setIsUserLogin(true);
          setUserData(user);
          console.log("User logged in");
        } else {
          setIsUserLogin(false);
          console.log("User is not logged in");
        }
      });
    };

    checkUserLoginStatus();
  }, [auth]);


  return (

    <div className="container-fluid p-0">

      <Topbar />
      {/* <Alert /> */}

      <div className='d-sm-none '>
        <NavBtn />
      </div>

      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route index element={<Index userdata={userdata} isuserlogin={isuserlogin} />} />
        <Route path='/bysgpa' element={<Index userdata={userdata} isuserlogin={isuserlogin} />} />
        <Route path='/bymarks' element={<MarksSgpa />} />
        <Route path='*' element={<Error />} />
      </Routes>

      {!isauth && <div className='description_container' >
        <Description />
        <GradesTable />
      </div>}

      <div className='footer mt-5'></div>

    </div>

  );
}

export default App;
