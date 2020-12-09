import React, { Component } from "react";
import axios from "axios";
import Footer from "./Footer";

//creat a class for the sign up component
export default class Signup extends Component {
  constructor(props) {
    super(props);

    //bind functions, you can use this.function without the need to bind it everytime
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);

    this.handleClick = this.handleClick.bind(this);
    //the keys are the same as the Schema .. see the modle userSchema in user.model.js line 6 or so.
    //this will work as blue prent to our state
    this.state = {
      username: "",
      password: "",
      phone: "",
      address: "",
      usernameError: "",
      passwordError: "",
      phoneError: "",
      addressError: "",
    };
  }
  //onChance function to track the changes and help to set (change) the state .
  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }
  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }
  onChangePhone(e) {
    this.setState({
      phone: e.target.value,
    });
  }
  onChangeAddress(e) {
    this.setState({
      address: e.target.value,
    });
  }

  handleClick() {
    this.onSubmit(this.state.value);
    this.handleSubmit(this.state.value);
    console.log(this.state);
  }
  validate = () => {
    let usernameError = "";
    let passwordError = "";
    let phoneError = "";
    let addressError = "";

    if (!this.state.username) {
      usernameError =
        "your username cannot be blank, please try to make it more than 3 characters!";
    }
    if (!this.state.password) {
      passwordError =
        "your password cannot be blank, please try to make it more than 5 characters!";
    }
    if (!this.state.phone) {
      phoneError =
        "your phone number cannot be blank, it has to be 10 numbers or more!";
    }
    if (!this.state.address) {
      addressError =
        "your address cannot be blank, please try to write more than 4 characters!";
    }

    if (usernameError || passwordError || phoneError || addressError) {
      this.setState({ usernameError, passwordError, phoneError, addressError });
      return false;
    }
    return true;
  };
  handleSubmit = (event) => {
    const isValid = this.validate();
    if (isValid) {
      console.log(this.state);
    }
  };

  onSubmit() {
    //where we set the state and send it in the post request
    const user = {
      username: this.state.username,
      password: this.state.password,
      phone: this.state.phone,
      address: this.state.address,
    };
    axios
      .post("http://localhost:3000/addUser/adduser", user)
      .then((res) => {
        // console.log(user , "uuuuuuuuuuuuuuuuuuuuuuuuuuuuu");
        window.location = "/login";
      })
      .catch((err) => alert("user name or phone number is used"));
    //console.log('user added')
  }

  //where the magic happence
  render() {
    return (
      <div>
        <br />
        <div className="container text-center">
          <form
            className="text-center border border-light p-9"
            
          >
            <h3 className="mb-3">Sign Up</h3>
            <br />
            <div className="col">
              <label> User Name </label>
              <br></br>
              <input
                required="true"
                type="text"
                className="form-control col"
                value={this.setState.username}
                onChange={this.onChangeUsername}
                placeholder="User Name"
              />
              <div style={{ color: "red" }}>{this.state.usernameError}</div>
              <br></br>
            </div>

            <div className="col">
              <label> Creat Password </label>
              <br></br>
              <input
                required="true"
                type="password"
                name="password"
                className="form-control col"
                value={this.setState.password}
                onChange={this.onChangePassword}
                placeholder="Creat Password"
              />
              <div style={{ color: "red" }}>{this.state.passwordError}</div>
              <br></br>
            </div>

            <div className="col">
              <label> Phone Number </label>

              <input
                required="true"
                className="form-control col"
                value={this.setState.phone}
                onChange={this.onChangePhone}
                placeholder="Phone Number"
              />
              <div style={{ color: "red" }}>{this.state.phoneError}</div>
              <br></br>
            </div>

            <div className="col">
              <label> Address </label>
              <br></br>
              <input
                required="true"
                type="text"
                className="form-control col"
                value={this.setState.address}
                onChange={this.onChangeAddress}
                placeholder="Address"
              />
              <div style={{ color: "red" }}>{this.state.addressError}</div>
              <br></br>
            </div>

            <input
              type="button"
              value="Creat Account"
              className="btn btn-deep-orange darken-4"
              onClick={this.handleClick}
            />
            <br></br>
            <br></br>
            <b>
              If you already have an account<a href="/login"> Log In </a>
            </b>
            <br></br>
          </form>
        </div>
        <Footer />
      </div>
    );
  }
}
