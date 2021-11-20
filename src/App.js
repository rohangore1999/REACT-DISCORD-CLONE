import React, { useEffect } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import { useSelector } from 'react-redux';

// to get user data
import { selectUser } from './features/userSlice'
import Login from './components/Login';
import { auth } from './firebase';

// to store data in redux datalayer
import { useDispatch } from 'react-redux';

// to store the data under login
import { login, logout } from './features/userSlice'


function App() {
  // it will grab the data from selector from useSlice.js li:31
  // we need to pass selectUser so as to get userdata
  const user = useSelector(selectUser) // use to get data which is stored

  // to store that in datalayer
  const dispatch = useDispatch();

  useEffect(() => {
    // auth.onAuthStateChanged is like a listner; it will keep track the successfully authenticated user and return them

    auth.onAuthStateChanged((authUser) => {
      console.log("user is >>>", authUser)
      if (authUser) {
        // user logged in

        // to store authUser data in redux-data-layer
        // to store under login function
        dispatch(login({
          uid: authUser.uid,
          photo: authUser.photoURL,
          email: authUser.email,
          displayName: authUser.displayName
        }))

      }
      else {
        // user logged out
        dispatch(logout())
      }
    })
  }, [dispatch]) //passing dispatc because dispatch is dependency; if disptach[data fire] then only run useEffect

  return (
    <div className="app">
      {user ? (
        <>
          {/* Sidebar */}
          < Sidebar />

          {/* Chat */}
          < Chat />
        </>
      ) :
        // if user is not set; not data in user
        <Login />
      }


    </div>
  );
}

export default App;
