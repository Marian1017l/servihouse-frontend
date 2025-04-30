import React from 'react';

const Login = () => {
    return (
        <div>
          <h1>Iniciar Sesión</h1>
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

export default Login;