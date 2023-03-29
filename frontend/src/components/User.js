import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeRole, getCurrentUser, getUsers } from "../stores/action/actionCreator";
// import Form from "react-bootstrap/Form";
import Swal from "sweetalert2";
// import RoleOptions from "./RoleOptions";

export default function User({ index, user }) {
  const roles = useSelector((state) => state.users.role);
  const [role, setRole] = useState("");
  const dispatch = useDispatch();
  const changeHandler = (e) => {
    setRole(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(changeRole(role, user._id))
      .then((data) => {
        Swal.fire({
          icon: "success",
          title: data.message,
        });
        return data
      })
      .then(()=> {
        dispatch(getUsers())
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: error.message,
        });
      });
  };
  useEffect(() => {
    dispatch(getCurrentUser());
  }, [roles]);
  return (
    <>
      <tr>
        <td style={{ maxWidth: "10px" }}>{index + 1}</td>
        <td style={{ maxWidth: "100px", minWidth: "100px" }}>{user.name}</td>
        <td style={{ maxWidth: "100px", minWidth: "100px" }}>{user.role}</td>
        {roles === "Admin" && (
          <td>
            {/* <form>

              <Form.Select aria-label="Default select example">
                    {status.map((stat, index) => {
                        return <RoleOptions key={index} stat={stat} role={user.role} />
                    })}
              </Form.Select>
              <button type="submit" className="btn btn-dark">
                Edit Status
              </button>
            </form> */}
            <form onSubmit={submitHandler}>
              <select onChange={changeHandler} name="role">
                <option hidden>Change Role</option>
                <option value="Admin">Admin</option>
                <option value="Staf">Staf</option>
              </select>
              <input type="submit" value="Submit" />
            </form>
          </td>
        )}
      </tr>
    </>
  );
}
