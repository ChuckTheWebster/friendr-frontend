import React, { useContext } from 'react';
import userContext from './userContext';
import Button from 'react-bootstrap/Button';

function HomePage() {
  const { user } = useContext(userContext);

  return (
    <div className='HomePage'>
      {user.isLoggedIn &&
        <div className='welcomeMessage'>
          <h2>Welcome Back, {user.data.username}</h2>
        </div>
      }
      <div className='joblyHomeBanner'>
        <h1>Friendr</h1>
        <h2>Make friends.</h2>
        {!user.isLoggedIn &&
          <>
            <Button className='homePageButton' href='/login' variant='dark'>Login</Button>
            <Button className='homePageButton' href='/signup' variant='dark'>Sign Up</Button>
          </>
        }
      </div>
    </div>
  );
}

export default HomePage;