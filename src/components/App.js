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
    // var thus = this;
    // if(this.getPk()){
    //   this.context.web3 = window.web3;
    //   thus.props.dispatch(setMetamaskPk(thus.getPk()));  
    //   thus.props.dispatch(handleInitialData());
      
    // }
    //console.log(this.context);
    //this.props.dispatch(handleInitialData());
  }

  setPk(credential){
     sessionStorage.setItem('credential', JSON.stringify(credential));
  }

  getAddress() {
    const credential = sessionStorage.getItem('credential');
    const userToken = JSON.parse(credential);
    return userToken?.address
  }

  getPk() {
    const credential = sessionStorage.getItem('credential');
    const userToken = JSON.parse(credential);
    return userToken?.pk
  }

  componentDidUpdate() {
     console.log(this.context);
     var thus = this;
     if(!this.context.awaiting && this.props.loading){
       if(this.context.accounts[0] !== this.getAddress() || !this.getPk()){
       //if(!this.getPk()){
         this.context.web3._requestManager.sendAsync({
          method: 'eth_getEncryptionPublicKey',
          params: [this.context.accounts[0]], // you must have access to the specified account
        },function(err,publicKey){
          debugger
          thus.setPk({pk:publicKey,address:thus.context.accounts[0]});

          //we need to set the publicKey on the global store
          thus.props.dispatch(setMetamaskPk(publicKey));  
          thus.props.dispatch(handleInitialData());
        }) 
      } 
      else{
          this.props.dispatch(setMetamaskPk(this.getPk()));  
          this.props.dispatch(handleInitialData());
       }
      }   //this.context.web3._requestManager.sendAsync({method:'eth_getEncryptionPublicKey',params:[this.context.accounts[0]]},function(data,err){ console.log(data);})
  }

  render() {
    const { metamaskUser , authedUser} = this.props;
    const {web3} = this.context;
    let render = null;
    if(authedUser!=null){
      debugger;
      render = <div>
                <Route path="/" exact component={Dashboard} />
                <Route path="/tweet/:id" component={TweetPage} />
                <Route path="/new" component={NewTweet} />
              </div> ;
    }else{
      render = null
    }
    return (     
      <Router>
        {/* using a fragment so we don't add another element (div) to the DOM */}
        <Fragment>
          <LoadingBar />
          <div className="container">
          {this.props.loading === true ? <Login /> : (
            <Fragment>
            <Nav />
              <code>{`messages of ${metamaskUser.pk}`} </code>     
               {render} 
            </Fragment>
            )}
          </div>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps({ authedUser, metamaskUser}) {
  return {
    loading: metamaskUser == null,
    authedUser: authedUser,
    metamaskUser : metamaskUser
  };
}

export default connect(mapStateToProps, null, null, {context: MetaMaskContext})(App);
