import React, { useEffect, useState } from "react";
import { CreateUser, EditUser, DeleteUser } from "../../api/UsersApi";
import UserForm from "../UserForm/UserForm";
import "./Users.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function User() {
  const [users, setUsers] = useState([]);

  // form correspond aux données envoyées par le formulaire, 3 cas :
  // Si form = false alors le formulaire n'est pas visible
  // Si form = {} alors nous sommes dans un POST
  // Si form = {objet plein} alors nous sommes dans un PUT
  const [form, setForm] = useState(false);

  // Gestion des erreurs de l'api avec Taostify
  const displayCreateError = () =>
    toast.error("Erreur lors de la création de l'action");
  const diplayEditError = () =>
    toast.error("Erreur lors de la modification de l'action");
  const displayDeleteError = () =>
    toast.error("Erreur lors de la suppression de l'action");

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
    // Même principe qu'avec user côté formulaire, j'initie add à un objet vide
    // Si add = {} alors POST
    // Si add = {objet plein} alors PUT
    const add = Object.keys(form).lenght === 0;

    // J'intencie une const qui récupère "l'ancienne plus rescente" version de mon tableau de users
    const oldUsers = [...users];

    //  Copie du state
    let copy = [...users];

    if (!add) {
      // Dans le cas d'un PUT, copy.filter me renvoie un tableau de users ayant un id strictement différent du user que je suis en train de modifier.
      copy = copy.filter((a) => a.id !== newUser.id);

      // Je met à jour mon api avec le user modifié
      EditUser(newUser).catch((err) => {
        // Gestion de l'erreur
        diplayEditError();
        console.log("edit error");
      });
    } else {
      // Dans le cas d'un POST je mets à jour mon api
      CreateUser(newUser).catch((err) => {
        // En cas d'erreur je renvoie l'ancienne version du tableau de user
        setUsers(oldUsers);

        // Et j'affiche un msg d'erreur
        displayCreateError();
        console.log("Create error");
      });
    }
    
    // J'envoie dans la "copy" de mon tableau de users la newUsers
    copy.push(newUser);

    // Et je mets à jour mon state avec le tableau "copy" qui contient le newUser
    setUsers(copy);

    // Enfin je ferme mon formulaire
    return setForm(false);
  };

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
        displayDeleteError();
        console.log("delete error");
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
      <ToastContainer />
      {/* Si form = {} || {objet plain} alors je l'affiche sinon j'affiche le composant Users */}
      {form ? (
        <UserForm
          // user équivaut au contenu du state form
          user={form}
          onClose={() => setForm(false)}
          onSubmit={(a) => handleSubmit(a)}
        />
      ) : (
        <>
          <h1>Listes des utilisateurs</h1>
          {/* L'objet vide dans setForm récupérera les données modifiées ou nouvelles qui seront entrées dans le formulaire */}
          <button onClick={() => setForm({})}>Nouveau contact</button>
          <table>
            <thead>
              <tr>
                <th>Nom - Prénom</th>
                <th>Nom d'utilisateur</th>
              </tr>
            </thead>
            <tbody>
              {users.map((a) => (
                <tr key={a.id}>
                  <td>{a.name}</td>
                  <td>{a.username}</td>
                  <td>
                    {/* Les données qu'il y a dans setForm(a) correspondent au user en cours en cours. */}
                    <button onClick={() => setForm(a)}>Modification</button>
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
