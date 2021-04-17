import React, { Component } from "react";
import { connect } from "react-redux";

import MetaMaskButton from './MetaMaskButton';

class Login extends Component {

  render() {
    console.log(this.props);
    return (
      <div className="center">
        <MetaMaskButton />
      </div>
    );
  }
}

//destructuring tweets from state
function mapStateToProps({ web3 }) {
  return {
    web3: web3
  };
}


export default connect(mapStateToProps)(Login);
