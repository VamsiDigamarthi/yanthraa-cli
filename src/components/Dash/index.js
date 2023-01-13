import { useEffect, useRef, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { Modal, useMantineTheme } from "@mantine/core";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

import "./index.css";

const Dash = () => {
  const [edit, setEdit] = useState(false);

  const [useForm, setUseForm] = useState("");

  const [passForm, setPassForm] = useState("");

  const [phoneForm, setPhoneForm] = useState("");

  const [emailForm, setEmailForm] = useState("");

  const [ideditValue, setIdEditValue] = useState("");

  const [alertDelete, setAlertDelete] = useState(false);

  const [isdelete, setIsDelete] = useState("");

  const [dataEditShow, setDataEditShow] = useState({});

  const [all, setAll] = useState(false);

  const [response, setResponse] = useState([]);

  const [formUpdate, setFormUpdate] = useState(false);

  const navigate = useNavigate();

  const theme = useMantineTheme();

  //const userList = () => {};

  // const userListFaildsas = (e) => {
  //   console.log(e);
  // };

  useEffect(() => {
    async function fetchData() {
      const local = localStorage.getItem("user");
      console.log(local);
      if (local === null) {
        navigate("/auth");
      }
      try {
        const { data } = await axios.get(
          "https://yanthraa-server-value.onrender.com/user/list"
        );
        //userList(data);
        setResponse(data);
        console.log(data);
      } catch (e) {
        console.log(e.response.data);
        //userListFaildsas(e.response.data);
      }
    }
    fetchData();
  }, [all, isdelete]);

  const editValue = (id) => {
    setEdit(true);
    setIdEditValue(id);
  };

  // -------------------------
  // ---------------------

  const deleteSuccess = (data) => {
    console.log(`jsjdbhhd ${data}`);
    toast(data);
  };

  const userListFaild = (d) => {
    console.log(`ddfff ${d}`);
    toast(d);
  };

  useEffect(() => {
    async function fetchDelete() {
      const local = localStorage.getItem("user");
      console.log(`local ${local}`);
      try {
        const { data } = await axios.delete(
          `https://yanthraa-server-value.onrender.com/user/${isdelete}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${local}`,
            },
          }
        );
        //user(List(data);
        setAll((prev) => !prev);
        setAlertDelete(true);
        console.log(data);
        //console.log("del");
        deleteSuccess(data);
      } catch (e) {
        console.log(e.response.data);
        //userListFaild(e.response.data);
      }
    }
    fetchDelete();
  }, [isdelete]);

  //console.log(dataEditShow.username);

  //setUseForm(dataEditShow.username);

  useEffect(() => {
    async function fetchDelete() {
      const local = localStorage.getItem("user");
      console.log(`local ${local}`);
      try {
        const { data } = await axios.get(
          `https://yanthraa-server-value.onrender.com/user/${ideditValue}`,
          local
        );
        //userList(data);
        console.log(data.username);
        console.log("del");
        setDataEditShow(data);
      } catch (e) {
        console.log(e.response.data);
        //userListFaild(e.response.data);
      }
    }
    fetchDelete();
  }, [ideditValue]);

  useEffect(() => {
    setUseForm(dataEditShow.username);

    setPassForm(dataEditShow.pasword);

    setEmailForm(dataEditShow.email);

    setPhoneForm(dataEditShow.phone);
  }, [dataEditShow]);

  const listDelete = (id) => {
    setIsDelete(id);
    console.log(id);
    setAll((prev) => !prev);
  };

  const handleChange = (e) => {
    //setFormData({ ...formData, [e.target.name]: e.target.value });
    setUseForm(e.target.value);
  };

  const handleChangep = (e) => {
    setPhoneForm(e.target.value);
  };

  const handleChangee = (e) => {
    setEmailForm(e.target.value);
  };
  const handleChangepa = (e) => {
    setPassForm(e.target.value);
  };

  useEffect(() => {
    async function fetchDelete() {
      const local = { useForm, passForm, emailForm, phoneForm };
      //console.log(emailForm);
      const { j } = { local };
      console.log(j);
      console.log(`local ${local}`);
      try {
        const { data } = await axios.put(
          `https://yanthraa-server-value.onrender.com/user/${ideditValue}`,
          local
        );
        //userList(data);
        console.log(data);
        console.log("del");
      } catch (e) {
        console.log(e.response.data);
        //userListFaild(e.response.data);
      }
    }
    fetchDelete();
  }, [formUpdate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormUpdate(true);
    console.log("form button click");
  };

  const notify = () => {
    //toast("hi");
    console.log("ji");
  };

  // if (setAlertDelete) {
  //   toast("hi");
  // }

  return (
    <div className="dashboard-main">
      <h1>Dashboard</h1>
      <ToastContainer></ToastContainer>
      {response.map((each) => (
        <div key={each._id} className="dashboard-main-2">
          <div className="dash-name">
            <h5 className="dash-name">{each.username}</h5>
          </div>
          <div className="dash-email">
            <h5 className="dash-name">{each.email}</h5>
          </div>
          <div className="dash-icons">
            <BiEdit className="edit-icon" onClick={() => editValue(each._id)} />
            <RiDeleteBin5Fill
              onClick={() => listDelete(each._id)}
              className="delete-icon"
            />
          </div>
        </div>
      ))}
      <Modal
        overlayColor={
          theme.colorScheme === "dark"
            ? theme.colors.dark[9]
            : theme.colors.gray[2]
        }
        overlayOpacity={0.55}
        overlayBlur={3}
        opened={edit}
        onClose={() => setEdit(false)}
      >
        <form className="sign-form" onSubmit={handleSubmit}>
          <h4
            className="sign-heading"
            style={{ color: "black", fontSize: "12px", margin: "0px" }}
          >
            Update Your Info
          </h4>

          <input
            id="name"
            placeholder="Name"
            name="username"
            type="text"
            value={useForm}
            onChange={handleChange}
          />
          <input
            id="phone"
            placeholder="Phone"
            name="phone"
            type="text"
            value={phoneForm}
            onChange={handleChangep}
          />
          {/* {phoneValid && (
            <span className="warning-span">*Phone number not valid</span>
          )} */}
          <input
            id="email"
            placeholder="Email"
            name="email"
            type="text"
            value={emailForm}
            onChange={handleChangee}
          />
          {/* {emailValid && <span className="warning-span">*email not valid</span>} */}
          <input
            id="password"
            placeholder="Password"
            name="password"
            type="text"
            value={passForm}
            onChange={handleChangepa}
          />
          {/* {showSubmitError && <p className="wrong-pass">{errorMsg}</p>} */}
          <button type="submit" className="form-button">
            Update
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default Dash;
