import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Users from "./Pages/Home/Users/Users";
import NavBar from "./components/Navbar/NavBar";
import "./styles/index.scss";

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        {/* C'est depuis ma route parent Home que je check la connexion */}
        <Route path="/react-contact" element={<Home />}>
          {/* Si la route parent valide la connexion alors j'affiche cette route */}
          <Route path="/react-contact/users" element={<Users />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
