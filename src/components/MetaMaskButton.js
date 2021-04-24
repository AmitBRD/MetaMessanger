import React, { useContext,useState } from "react";
import { connect } from "react-redux";
import {handleInitialData} from '../actions/shared'
import {useMetaMask} from "metamask-react";

function MetaMaskButton({dispatch}) {
  const { error,status, connect, account,ethereum } = useMetaMask();

  function handleButtonClick() {
     //alert(`Web3 (${web3.version}) is enabled`);
     
  }


  if (error && error.message === "MetaMask not installed") {
    return (
      <a href="https://metamask.io/" target="_blank" rel="noopener noreferrer">
        Install MetaMask
      </a>
    );
  } else if (error && error.message === "User denied account authorization") {
    return (
      <button type="button" className="btn lg" onClick={connect}>
        Please allow MetaMask to connect.
      </button>
    );
  } else if (error && error.message === "MetaMask is locked") {
    return (
      <button type="button" className="btn lg" onClick={connect}>
        Please allow MetaMask to connect.
      </button>
    );
  } else if (error) {
    return (
      <button type="button" className="btn lg" onClick={connect}>
        UNHANDLED ERROR: {error.message}
      </button>
    );
  } else if (!ethereum && staths) {
    return (
      <button type="button" className="btn lg" onClick={connect}>
        MetaMask is loading...
      </button>
    );
  } else if (!ethereum) {
    return (
      <button type="button" className="btn lg" onClick={connect}>
        <code>login with metamask</code>
      </button>
    );
  } else if (status && !account) {
    return <button type="button" className="btn lg" onClick={connect} >No Wallet 🦊</button>;
  } else {
    // `web3` and `account` loaded 🎉
    return (
      <button type="button" className="btn lg" onClick={handleButtonClick}>
        <code>{account}</code>
      </button>
    );
  }
}


const mapStateToProps = state => ({
  web3: state.web3
});

export default connect()(MetaMaskButton);