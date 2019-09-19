import React from 'react';
import './App.css';
//routing
import routes from "./routes";
//components
import Nav from "./components/Nav";
//redux
import {connect} from "react-redux";
import {updateUser} from "./redux/reducers/userReducer";
//axios
import axios from "axios";

class App extends React.Component {
  componentDidMount() {
    axios.get("/auth/user").then(response => { //This checks to see if a user is on session. If they are
      console.log(response.data); //It goes ahead and puts them in Redux, essentially loggin them
      this.props.updateUser(response.data); //Back in after they refresh/close the page
    })
  }
  render() {
    return (
      <>
        <Nav />
        {routes}
      </>
    );
  }
}

// function mapStateToProps(reduxState) {
//   return {
//     user: reduxState.user
//   }
// }

export default connect(undefined, {updateUser})(App);
