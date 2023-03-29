import "../assets/style.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../stores/action/actionCreator";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formRegister, setFormRegister] = useState({});

  const changeHandler = (e) => {
    const { value, name } = e.target;
    const obj = { ...formRegister };
    obj[name] = value;
    setFormRegister(obj);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register(formRegister))
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "New staff have been successfully register",
        });
        navigate("/");
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: error.message,
        });
      });
  };
  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <div
          className="content-custom border border-slate-800 bg-slate-900/70 mt-3 p-5 text-center"
          id="form"
        >
          <div id="cta">SIGN UP </div>
          <form className="signup" onSubmit={submitHandler}>
            <div className="input-wrap">
              <input
                placeholder="Name"
                onChange={changeHandler}
                name="name"
                type="text"
              />
            </div>
            <div className="input-wrap">
              <input
                type="password"
                className="password1"
                placeholder="Password"
                onChange={changeHandler}
                name="password"
              />
            </div>

            <button type="submit"> Sign up </button>
          </form>
          <br />
          <button id="custom-2">
            <Link to="/"> Back To Home </Link>
          </button>
        </div>
      </div>
    </>
  );
}
