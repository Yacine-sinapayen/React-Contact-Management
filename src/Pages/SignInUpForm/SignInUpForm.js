import React from "react";
import SignInForm from "../../components/SignInForm/SignInForm";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import "./SignInUpForm.scss";

export default function SignInUpForm() {
  return (
    <div className="container">
      <SignInForm />
      <SignUpForm />
    </div>
  );
}
