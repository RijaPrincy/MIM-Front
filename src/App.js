import React, { Component } from 'react'
import { Provider } from 'react-redux'
import Store from './Store/store'
import Nav from './Component/navBar'
import PointDEntrer from './Component/pointEntrer'
import Auth from './Component/Authentification'

import Poster from './Component/posterAnnonce'
import MesAnnonce from './Component/listeMesAnnonces'
import DetailMes from './Component/detailMesAnnonces'


import DetailAnnonce from './Component/detailAnnonce'




import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import Dash from './Component/Dashboard'
import Footer from './Component/footer'

import { Redirect } from 'react-router-dom'


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false
    }


  }
  componentDidMount() {
    this.redirect()

  }
  redir() {
    if (this.state.redirect) {
      console.log("hah", this.props);
      return <Redirect to='/Dashboard' />
    }
  }
  redirect() {
   
    if (localStorage.getItem('token')) {
      this.setState({
        redirect: true
    })
    }

}

  render() {
    return (
      <div className="app">
       
        <Router>
          <div>
          {this.redir()}
          
            <Route path='/'  component={PointDEntrer}></Route>
            <Route path='/authentification' component={Auth}></Route>
           {!this.state.redirect?<Route path='/Dashboard' exact component={Dash}></Route>:""} 
          </div>
        </Router>
        <Footer />


      </div>
    )
  }
}
export default App;

