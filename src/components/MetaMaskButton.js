import React, { useContext,useState } from "react";
import { connect } from "react-redux";
import {handleInitialData} from '../actions/shared'
import MetaMaskContext from "./metamask";

function MetaMaskButton({dispatch}) {
  const { web3, accounts, error, awaiting, openMetaMask } = useContext(
    MetaMaskContext,
  );

  function handleButtonClick() {
     //alert(`Web3 (${web3.version}) is enabled`);
     //dispatch(handleInitialData())
  }

  if (error && error.message === "MetaMask not installed") {
    return (
      <a href="https://metamask.io/" target="_blank" rel="noopener noreferrer">
        Install MetaMask
      </a>
    );
  } else if (error && error.message === "User denied account authorization") {
    return (
      <button type="button" className="btn lg" onClick={openMetaMask}>
        Please allow MetaMask to connect.
      </button>
    );
  } else if (error && error.message === "MetaMask is locked") {
    return (
      <button type="button" className="btn lg" onClick={openMetaMask}>
        Please allow MetaMask to connect.
      </button>
    );
  } else if (error) {
    return (
      <button type="button" className="btn lg" onClick={openMetaMask}>
        UNHANDLED ERROR: {error.message}
      </button>
    );
  } else if (!web3 && awaiting) {
    return (
      <button type="button" className="btn lg" onClick={openMetaMask}>
        MetaMask is loading...
      </button>
    );
  } else if (!web3) {
    return (
      <button type="button" className="btn lg" onClick={openMetaMask}>
        <code>login with metamask</code>
      </button>
    );
  } else if (accounts.length === 0) {
    return <button type="button" className="btn lg" >No Wallet 🦊</button>;
  } else {
    // `web3` and `account` loaded 🎉
    return (
      <button type="button" className="btn lg" onClick={handleButtonClick}>
        <code>{accounts[0]}</code>
      </button>
    );
  }
}


const mapStateToProps = state => ({
  web3: state.web3
});

export default connect()(MetaMaskButton);