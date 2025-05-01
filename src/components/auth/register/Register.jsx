import React from 'react';
import './Register.css';

const SignUp = () => {

    return (
        <div>
          <h1>Ini</h1>
          <form>
            <label>
              Usuario:
              <input type="text" name="username" />
            </label>
            <br />
            <label>
              Contraseña:
              <input type="password" name="password" />
            </label>
            <br />
            <button type="submit">Ingresar</button>
          </form>
        </div>
    );
}

export default SignUp;