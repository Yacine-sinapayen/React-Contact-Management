import React, { useEffect, useState } from "react";
import { DeleteUser } from "../../api/UsersApi";
import UserForm from "../UserForm/UserForm";
import "./Users.scss";

export default function User() {
  const [users, setUsers] = useState([]);

  // form correspond aux données envoyées par le formulaire, 3 cas :
  // Si form = false alors le formulaire n'est pas visible
  // Si form = {} alors nous sommes dans un POST
  // Si form = {objet plein} alors nous sommes dans un PUT
  const [form, setForm] = useState(false);

  // GET
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // POST et PUT
  const handleSubmit = (newUser) => {
    // Même principe qu'avec user côté formulaire
    // Si add = {} alors POST
    // Si add = {objet plein} alors PUT
    const add = Object.keys(form).lenght === 0;

     // J'intencie une const qui récupère la version la plus rescente de mon tableau d'acitons
     const currentUsers = [...users];
  }

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
    <div className="container">
      {/* Si form = {} || {objet plain} alors je l'affiche sinon j'affiche le composant Actions */}
      {form ? (
        <UserForm />
      ) : (
        <>
          <h1>Listes des utilisateurs</h1>
          <table>
            <thead>
              <tr>
                <th>Nom - Prénom</th>
                <th>Nom d'utilisateur</th>
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
      )}
    </div>
  );
}
