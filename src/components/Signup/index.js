import axios from "axios";
//import { useNavigate, useHistory } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./index.css";

const SignUp = () => {
  const [username, setUsename] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [up, setUp] = useState(true);
  const [showSubmitError, setShowSubmitError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [phoneValid, setPhoneValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [wrongPassword, setWrongPassword] = useState(false);

  const navigate = useNavigate();

  const onChangeUsername = (e) => {
    setUsename(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const onChangeUserEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangeUserPhone = (e) => {
    setPhone(e.target.value);
  };

  const onSubmitSuccess = (data) => {
    localStorage.setItem("user", data._id);
    navigate("/");
  };

  const onSubmitFailure = (e) => {
    setShowSubmitError(true);
    setErrorMsg(e);
  };

  const onSubmitLoginSuccess = (data) => {
    localStorage.setItem("user", data._id);
    // const { history } = this.props;
    // history.push("/");
    navigate("/");
    //const navigate = useNavigate();
    //navigate("/");
  };

  const onSubmitLoginFailure = (d) => {
    setWrongPassword(true);
  };

  const handleSubmit = async (event) => {
    //const { email, phone, Up } = this.state;
    event.preventDefault();
    if (up) {
      if (email.includes("@") && phone.length === 10) {
        //const { username, password, email, phone } = this.state;
        const userDetails = { username, password, email, phone };
        try {
          const { data } = await axios.post(
            "https://yanthraa-server-value.onrender.com/auth/register",
            userDetails
          );
          onSubmitSuccess(data);
        } catch (e) {
          console.log(e.response.data);
          onSubmitFailure(e.response.data);
        }
      } else {
        setPhoneValid(true);
        setEmailValid(true);
      }
    } else {
      const userDetails = { password, email };
      try {
        const { data } = await axios.post(
          "https://yanthraa-server-value.onrender.com/auth/login",
          userDetails
        );
        console.log("login ");
        onSubmitLoginSuccess(data);
      } catch (e) {
        console.log(e.response.data);
        onSubmitLoginFailure(e.response.data);
      }
    }
  };

  const alredySign = () => {
    setUp((prev) => !prev);
    setErrorMsg(false);
    //this.setState((prevState) => ({ Up: !prevState.Up }));
    //this.setState({ errorMsg: false });
  };

  return (
    <div className="signup-main">
      <form className="sign-form" onSubmit={handleSubmit}>
        <h4 className="sign-heading">{up ? "Sign up" : "Log In"} </h4>

        {up && (
          <>
            <input
              id="name"
              placeholder="Name"
              name="username"
              type="text"
              value={username}
              onChange={onChangeUsername}
            />
            <input
              id="phone"
              placeholder="Phone"
              name="phone"
              type="text"
              value={phone}
              onChange={onChangeUserPhone}
            />
          </>
        )}
        {phoneValid && (
          <span className="warning-span">*Phone number not valid</span>
        )}
        <input
          id="email"
          placeholder="Email"
          name="email"
          type="text"
          value={email}
          onChange={onChangeUserEmail}
        />
        {emailValid && <span className="warning-span">*email not valid</span>}
        <input
          id="password"
          placeholder="Password"
          name="password"
          type="text"
          value={password}
          onChange={onChangePassword}
        />
        {wrongPassword && <p className="wrong-pass">wront password</p>}

        <p className="add-log-page" onClick={alredySign}>
          {up
            ? "Already have an account. Login!"
            : "Dont have an account? Sign Up"}
        </p>

        {showSubmitError && <p className="wrong-pass">{errorMsg}</p>}
        <button type="submit" className="form-button">
          {up ? "Sign Up" : "Log In"}
        </button>
      </form>
    </div>
  );
};
// ---------------------
// class SignUp extends Component {
//   state = {
//     username: "",
//     password: "",
//     email: "",
//     phone: "",
//     Up: true,
//     showSubmitError: false,
//     errorMsg: "",
//     phoneValid: false,
//     emailValid: false,
//     wrongPassword: false,
//   };
//   //navigate = useNavigate();
//   onChangeUsername = (event) => {
//     this.setState({ username: event.target.value });
//   };

//   onChangePassword = (event) => {
//     this.setState({ password: event.target.value });
//   };

//   onChangeUserPhone = (event) => {
//     this.setState({ phone: event.target.value });
//   };

//   onChangeUserEmail = (event) => {
//     this.setState({ email: event.target.value });
//   };

//   onSubmitSuccess = (data) => {
//     const { history } = this.props;
//     localStorage.setItem("user", data._id);
//     history.replace("/");
//     //history.push("/");
//     //use("/");
//     //this.navigate("/");
//     //browserHistory.push("/");
//     //<Redirect to="/" />;
//     window.location.replace("/");
//   };

//   onSubmitFailure = (e) => {
//     this.setState({ showSubmitError: true, errorMsg: e });
//   };

//   onSubmitLoginSuccess = (data) => {
//     localStorage.setItem("user", data._id);
//     const { history } = this.props;
//     history.push("/");
//     //const navigate = useNavigate();
//     //navigate("/");
//   };

//   onSubmitLoginFailure = (d) => {
//     this.setState({ wrongPassword: true });
//   };

//   handleSubmit = async (event) => {
//     const { email, phone, Up } = this.state;
//     event.preventDefault();
//     if (Up) {
//       if (email.includes("@") && phone.length === 10) {
//         const { username, password, email, phone } = this.state;
//         const userDetails = { username, password, email, phone };
//         try {
//           const { data } = await axios.post(
//             "http://localhost:5001/auth/register",
//             userDetails
//           );
//           this.onSubmitSuccess(data);
//         } catch (e) {
//           console.log(e.response.data);
//           this.onSubmitFailure(e.response.data);
//         }
//       } else {
//         this.setState({ phoneValid: true, emailValid: true });
//       }
//     } else {
//       const { password, email } = this.state;
//       const userDetails = { password, email };
//       try {
//         const { data } = await axios.post(
//           "http://localhost:5001/auth/login",
//           userDetails
//         );
//         console.log("login ");
//         this.onSubmitLoginSuccess(data);
//       } catch (e) {
//         console.log(e.response.data);
//         this.onSubmitLoginFailure(e.response.data);
//       }
//     }
//   };

//   alredySign = () => {
//     this.setState((prevState) => ({ Up: !prevState.Up }));
//     this.setState({ errorMsg: false });
//   };

//   render() {
//     const {
//       Up,
//       errorMsg,
//       emailValid,
//       phoneValid,
//       showSubmitError,
//       wrongPassword,
//     } = this.state;
//     return (
//       <div className="signup-main">
//         <form className="sign-form" onSubmit={this.handleSubmit}>
//           <h4 className="sign-heading">{Up ? "Sign up" : "Log In"} </h4>

//           {Up && (
//             <>
//               <input
//                 id="name"
//                 placeholder="Name"
//                 name="username"
//                 type="text"
//                 value={this.state.username}
//                 onChange={this.onChangeUsername}
//               />
//               <input
//                 id="phone"
//                 placeholder="Phone"
//                 name="phone"
//                 type="text"
//                 value={this.state.phone}
//                 onChange={this.onChangeUserPhone}
//               />
//             </>
//           )}
//           {phoneValid && (
//             <span className="warning-span">*Phone number not valid</span>
//           )}
//           <input
//             id="email"
//             placeholder="Email"
//             name="email"
//             type="text"
//             value={this.state.email}
//             onChange={this.onChangeUserEmail}
//           />
//           {emailValid && <span className="warning-span">*email not valid</span>}
//           <input
//             id="password"
//             placeholder="Password"
//             name="password"
//             type="text"
//             value={this.state.password}
//             onChange={this.onChangePassword}
//           />
//           {wrongPassword && <p className="wrong-pass">wront password</p>}

//           <p className="add-log-page" onClick={this.alredySign}>
//             {Up
//               ? "Already have an account. Login!"
//               : "Dont have an account? Sign Up"}
//           </p>

//           {showSubmitError && <p className="wrong-pass">{errorMsg}</p>}
//           <button type="submit" className="form-button">
//             {Up ? "Sign Up" : "Log In"}
//           </button>
//         </form>
//       </div>
//     );
//   }
// }

export default SignUp;
