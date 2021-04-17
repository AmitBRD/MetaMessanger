import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import { setMetamaskPk } from "../actions/metamaskUser";
import LoadingBar from "react-redux-loading"; //importing the loading bar given by react-redux-loading

import Dashboard from "./Dashboard";
import NewTweet from "./NewTweet";
import TweetPage from "./TweetPage";
import Nav from "./Nav";
import Login from "./Login"
import MetaMaskContext from './metamask'


class App extends Component {

  static contextType = MetaMaskContext;

  componentDidMount() {
    debugger;
    //console.log(this.context);
    //this.props.dispatch(handleInitialData());
  }

  componentDidUpdate() {
     console.log(this.context);
     var thus = this;
     if(!this.context.awaiting && this.props.loading){
       this.context.web3._requestManager.sendAsync({
        method: 'eth_getEncryptionPublicKey',
        params: [this.context.accounts[0]], // you must have access to the specified account
      },function(err,publicKey){
        debugger
        //we need to set the publicKey on the global store
        thus.props.dispatch(setMetamaskPk(publicKey));
        thus.props.dispatch(handleInitialData());
      })      //this.context.web3._requestManager.sendAsync({method:'eth_getEncryptionPublicKey',params:[this.context.accounts[0]]},function(data,err){ console.log(data);})
       
     }

    /* ... */
  }

  render() {
    return (     
      <Router>
        {/* using a fragment so we don't add another element (div) to the DOM */}
        <Fragment>
          <LoadingBar />
          <div className="container">
          {this.props.loading === true ? <Login /> : (
            <Fragment>
            <Nav />            
              <div>
                <Route path="/" exact component={Dashboard} />
                <Route path="/tweet/:id" component={TweetPage} />
                <Route path="/new" component={NewTweet} />
              </div>
            </Fragment>
            )}
          </div>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps({ authedUser}) {
  return {
    loading: authedUser == null
  };
}

export default connect(mapStateToProps, null, null, {context: MetaMaskContext})(App);
