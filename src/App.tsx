import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import Navbar from './components/Navbar/Navbar';
import RegisterForm from './components/RegisterForm/RegisterForm';
import LoginPage from './components/LoginPage/LoginPage';
import UserPage from './components/UserPage/UserPage';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './helpers/firebaseConfig';

function App() {
   const [loggedIn, setLoggedIn] = useState(false); // false bo na pocz user nie jest zalogowany

   onAuthStateChanged(auth, (user) => {    // ta f. będzie pilnowała stanu zalogowania już w całej apce
      if (user) {
         // console.log(user);
         setLoggedIn(true);
      } else {
         setLoggedIn(false);
      }
   });

   return (
      <div className="App">
         <BrowserRouter>
            <Navbar />
            <Routes>
               <Route path='/' element={<HomePage />} />
               <Route path='/register' element={<RegisterForm />} />
               <Route path='/login' element={<LoginPage />} />
               <Route path='/user' element={<UserPage />} />
            </Routes>
         </BrowserRouter>
      </div>
   );
}

export default App;
