import React, { Component, Fragment} from "react";
import { connect } from "react-redux";
import { handleAddTweet } from "../actions/tweets";

import { Redirect } from "react-router-dom";

import ENSAddress from '@ensdomains/react-ens-address';
import {withMetaMask} from './metamask'

class NewTweet extends Component {
  
  //static contextType = MetaMaskContext;

  state = {
    to:"",
    text: "",
    toHome: false
  };

  handleChange = e => {
    const text = e.target.value;

    this.setState(() => ({
      text
    }));
  };

  handleResolveError = e=>{
    if(e){
      console.log(e);
    }
  }

  handleToChange = e=>{
     const to = e.target.value;
    this.setState(() => ({
      to
    }));
  }

  handleResolve = ({ name, address, type }) => {
    if(type){
      this.setState(()=>({to:address}))
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    const { to,text} = this.state;

    //if we are at route /new, there is no id, so we are not replying to any tweet
    //if we are at route /tweet/:id, we are replying to that id
    const { dispatch, id } = this.props; //if id is a thing, it means we are replying to this id

    debugger;
    //this.context.web3._requestManager.sendAsync({method:})

    //todo: Add tweet to store
    dispatch(handleAddTweet(text, id, to));
    // console.log("New Tweet: ", text);

    //reset state to default
    this.setState(() => ({
      to:"",
      text: "",
      toHome: id ? false : true //if id is a thing, do not redirect, otherwise, you are at /new, so, after submit, redirect back to home
    }));
  };

  render() {
    const { to,text, toHome } = this.state;
    const tweetLeft = 280 - text.length;
    debugger;
    // redirect to home view if submitted from /new
    if (toHome === true) {
      return <Redirect to="/" />;
    }

    return (
      <div>
       <h3 className="center">Compose new Message</h3>
         {this.context.awaiting === true ? <span>Loading</span> : ( 
       
        <Fragment>
        <form className="new-tweet" onSubmit={this.handleSubmit}>
          <ENSAddress
            provider={this.props.metamask.ethereum.currentProvider}
            showBlockies={false}
            onResolve={this.handleResolve}
            className="small"
            onError={this.handleResolveError}
          />
          <br />
          <textarea
            placeholder="What's happenning"
            value={text}
            onChange={this.handleChange}
            className="textarea"
            maxLength={280}
          />
          {/* show how many characters are left */}
          {tweetLeft <= 100 && <div className="tweet-length">{tweetLeft}</div>}

          {/* button is disabled if it's an empty string */}
          <button className="btn" type="submit" disabled={text === ""}>
            Submit
          </button>
        </form>
        </Fragment>) 
      }
      </div>
    );
  }
}

export default connect()(withMetaMask(NewTweet));
