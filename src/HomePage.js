import React, { useContext } from 'react';
import userContext from './userContext';
import Button from 'react-bootstrap/Button';

/** Renders HomePage Component
 *
 * App -> Homepage
 */

function HomePage() {
  return (
    <>
      <div className="px-4 py-5 my-5 text-center">
        <h1 className="display-5 fw-bold">Friendr</h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum et orci non lectus elementum volutpat. Praesent vitae efficitur lorem, eget fringilla est. Aliquam ligula velit, condimentum quis mattis a, semper sit amet dui.</p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <Button className='btn btn-primary btn-lg px-4 gap-3' href='/login'>Login</Button>
            <Button className='btn btn-lg px-4' href='/signup' variant='outline-secondary'>Sign Up</Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;