import React, { Component } from 'react'
import './Dashboard.css'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import Post from './posterAnnonce'
import MesAnnonces from './listeMesAnnonces'
import Detail from './detailMesAnnonces'
import Nav from './navbar2'
import './dash.css'
import { Redirect } from 'react-router-dom'
import {
    MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
    MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon
} from "mdbreact";
import Test from './listeMesAnnonces'
import DetailAnnonce from './detailAnnonce'
import Acceuil from './listeAnnonce'

export default class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            redirect: false
        }


    }
    componentDidMount() {
        console.log("lety e");

        // this.redirect()
    }
    // redir() {
    //     if (this.state.redirect) {
    //         console.log("hahap");
    //         return <Redirect to='/Dashboard' />
    //     }
    // }
    // redirect() {

    //     if (!localStorage.getItem('token')) {
    //         console.log("lety eeeeeee");
    //         this.setState({
    //             redirect: true
    //         })
    //     }

    // }
    state = {
        isOpen: false
    };

    toggleCollapse = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }

    render() {
        return (
            <div >
                <Router>
                    <div>
                        <div >
                            <MDBNavbar color="default-color" dark expand="md" style={{ position: "fixed", width: "100%", zIndex: "99" }}>
                                <MDBNavbarBrand>
                                    <strong className="white-text"><strong style={{ fontSize: "35px", fontStyle: 'italic' }}>Mon chez moi</strong></strong>
                                </MDBNavbarBrand>
                                <MDBNavbarToggler onClick={this.toggleCollapse} />
                                <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
                                    <MDBNavbarNav left>
                                        <MDBNavItem active>
                                            <MDBNavLink to="#">Home</MDBNavLink>
                                        </MDBNavItem>


                                    </MDBNavbarNav>
                                    {/* <MDBNavbarNav right>
                                        <MDBNavItem>
                                            <MDBNavLink className="waves-effect waves-light" to="#!">
                                                <MDBIcon fab icon="twitter" />
                                            </MDBNavLink>
                                        </MDBNavItem>
                                        <MDBNavItem>
                                            <MDBNavLink className="waves-effect waves-light" to="#!">
                                                <MDBIcon fab icon="google-plus-g" />
                                            </MDBNavLink>
                                        </MDBNavItem>

                                    </MDBNavbarNav> */}
                                </MDBCollapse>
                            </MDBNavbar>


                            {/* <Route path='/authentification' exact component={Authent} /> */}
                            {/* <Route path='/Dashboard' component={Dashboard} /> */}


                            {/* <Route path="/poster_annonce" exact component={Post} />
                    <Route path="/MesAnnonces" component={MesAnnonces} />
                    <Route path="/DetailMesAnnonces/:id" exact component={Detail} /> */}

                        </div>


                        <body>
                            {/* {this.redir()} */}
                            <div class="sidenav">

                                <div style={{ marginTop: "50%" }}></div>

                                <center> <Link to="/Acceuil" className="btn "
                                    style={{
                                        fontStyle: 'italic', fontSize: "15px", marginTop: "50px",
                                        heigth: "4px", color: "white", backgroundColor: "rgba(33, 131, 126, 0.979)",
                                        boxShadow: "1px 1px 12px #555", border: "none"
                                    }}><i class='fas fa-book-reader'></i>Acceuil</Link>
                                    <Link to="/poster_annonce" className="btn"
                                        style={{
                                            fontStyle: 'italic', fontSize: "15px", marginTop: "35px",
                                            heigth: "4px", color: "white", backgroundColor: "rgba(33, 131, 126, 0.979)",
                                            boxShadow: "1px 1px 12px #555", border: "none"
                                        }}><i class='fas fa-edit'></i>Poster une annonce</Link>
                                    <Link to="/MesAnnonces" className="btn " style={{
                                        fontStyle: 'italic', fontSize: "15px",
                                        marginTop: "35px", heigth: "4px", color: "white",
                                        backgroundColor: "rgba(33, 131, 126, 0.979)", boxShadow: "1px 1px 12px #555",
                                        border: "none"
                                    }}><i class='fas fa-book'></i>Mes annonces</Link>
                                </center>
                                <a href='/' onClick={() => {
                                    localStorage.removeItem('token')
                                    localStorage.removeItem('id')
                                }} className="btn " style={{ fontStyle: 'italic', fontSize: "15px", marginTop: "35px", heigth: "4px", color: "white", backgroundColor: "rgba(33, 131, 126, 0.979)", boxShadow: "1px 1px 12px #555", border: "none" }}><i class='fas fa-fire'></i>Se deconnecter</a>

                            </div>

                            <div class="main">
                                <Route path="/Acceuil" exact component={Acceuil} />
                                <Route path="/poster_annonce" exact component={Post} />
                                <Route path="/Dashboard" exact component={MesAnnonces} />
                                <Route path="/" exact component={MesAnnonces} />
                                <Route path="/MesAnnonces" exact component={MesAnnonces} />
                                <Route path="/DetailMesAnnonces/:id" exact component={Detail} />
                                <Route path='/detailAnnonce/:id' exact component={DetailAnnonce} />


                            </div>
                        </body>
                    </div>

                </Router>


            </div>
        )
    }
}
