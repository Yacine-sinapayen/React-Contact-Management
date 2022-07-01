import React, { useEffect, useState } from "react";
import { DeleteUser, GetUsers } from "../../api/UsersApi";
import "./Users.scss";

export default function User() {
  const [users, setUsers] = useState([]);

  // GET
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => {
        console.log(err);
      });
  }, []);


  // DELETE
  const handleDelete = (id) => {
    // Confirmer la surpression
    let ok = window.confirm(
      "Êtes-vous sûr de vouloir supprimer cette utilisateur ?"
    );

    if (ok) {
      const currentUsers = [...users];
      DeleteUser(id).catch((err) => {
        // TODO : Si l'api nous renvoie une erreur j'affiche un toastify
        console.log("il y a une erreure à la supression");
        // et je retourne l'ancien tableau
        return setUsers(currentUsers);
      });
      // Supression du user.
      // Je créais une copie du tableau des users afin de ne pas modifier directement le state.
      let copy = [...users];
      // Ici je demande à filter de me renvoyer un tableau de tout les users ayant un id différents de l'id sélectionner à la supression (a).
      copy = copy.filter((a) => a.id !== id);
      return setUsers(copy);
    }

    //  On retourne toujours quelques choses car safari bug sinon sur les fonction async
    return false;
  };

  return (
    <>
      <h1>Listes des utilisateurs</h1>
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Nom de famille</th>
            {/* <th>email</th>
            <th>Téléphone</th> */}
          </tr>
        </thead>
        <tbody>
          {users.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.username}</td>
              {/* <td>{a.email}</td>
              <td>{a.phone}</td> */}
              <td>
                <button>Edit</button>
                <button onClick={() => handleDelete(a.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
