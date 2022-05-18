import type { NextPage } from "next";
import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import Head from "next/head";
import { fetchUsers } from "../services/getFetch";

const Home: NextPage = () => {
  const [users, setUsers] = useState([]);
  const getFetch = async () => {
    const response = await fetchUsers(0);
    const data = await response.json();
    console.log(data);
    setUsers(data.find);
  }

  useEffect(() => {
    getFetch();
  }, []);

  const usersLenght = Math.ceil(users.length / 10);

  const pagesUsers = () => {
    for (let index = 0; index < usersLenght; index += 1) {
      return (<li className="page-item"><a className="page-link" href="#">{ index }</a></li>)
    }
  };

  const table = (
    <table className="table table-hover">
      <thead>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Editar dados</th>
        </tr>
      </thead>
      <tbody>
        { users.map(({ id, name, email }, index) => (
          <tr
            key={ index }
          >
            <td>{ id }</td>
            <td>{ name }</td>
            <td>{ email }</td>
            <td>
              <button className="btn btn-primary" type="submit">Editar</button>
            </td>
          </tr>
        )) }
      </tbody>
    </table>
  );

  return (
    <div>
      <Head>
        <title>Teste Meu Guru</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Hello Word</h1>
        { table }
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            { pagesUsers() }
          </ul>
        </nav>
      </main>

    </div>
  );
};

export default Home;