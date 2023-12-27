import React, { useEffect } from 'react';
import { useState } from 'react';
import { getUsers } from '../../api/users';

const Login = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers()
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setUsers(data);
      });
  }, []);

  return (
    <>
      <main>
        <form>
          <label htmlFor="user-name">
            Nombre de usuario
            <input type="text" name="user-name" id="user-name" />
          </label>
          <label htmlFor="password">
            Contraseña
            <input type="text" name="password" id="password" />
          </label>
          <input type="submit" value="Ingresar" />
        </form>
      </main>
      {/* {users.map((user) =>
        user.tuits.map((tuit) => (
          <div>
            <p>Usuario: {user.userName}</p>
            <p>{tuit.message}</p>
            <p>Likes: {tuit.likes}</p>
          </div>
        )),
      )} */}
    </>
  );
};

export default Login;
