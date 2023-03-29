import "../assets/style.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../stores/action/actionCreator";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formLogin, setFormLogin] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    const { value, name } = e.target;
    const obj = { ...formLogin };
    obj[name] = value;
    setFormLogin(obj);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(formLogin))
      .then((data) => {
        Swal.fire({
          icon: "success",
          title: "You've login as " + data.role,
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
          <div id="cta">SIGN IN </div>
          <form className="signup" onSubmit={submitHandler}>
            <div className="input-wrap">
              {" "}
              <input
                placeholder="Name"
                onChange={changeHandler}
                type="text"
                name="name"
              />{" "}
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

            <button type="submit"> Sign in </button>
          </form>
        </div>
      </div>
    </>
  );
}
