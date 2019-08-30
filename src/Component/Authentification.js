import React, { Component } from 'react'
import axios from 'axios'
import './auth.css'


export default class Authentification extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            passWord: "",
            redirect: "",
            nom: "",
            prenom: ""

        }
        this.change = this.change.bind(this)

    }
    componentDidMount() {
        this.renderRedirect1()
    }
    setAuthToken(token) {
        if (token) {
            console.log("if token");

            var t = "bearer " + token
            console.log(t);

            axios.defaults.headers.common['authorization'] = t
        } else {
            console.log("else token");
            delete axios.defaults.headers.common['authorization'];


        }
    }

    change = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    renderRedirect1 = () => {
        if (localStorage.getItem('token')) {
            this.props.history.push("/Dashboard")
            // return <Redirect to='/Dashboard' />
        }
    }
    renderRedirect = () => {
        if (this.state.redirect) {
            // return <Redirect to='/Dashboard' />
            this.props.history.push("/Dashboard")
        }
    }
    redirect() {
        console.log("hahah");

        this.setState({
            redirect: true
        })

    }
    login = (e) => {
        axios.post('https://backmim.herokuapp.com/login', e)
            .then(result => {
                if (result.data == "not ok") {
                    console.log("erreur mdp");
                    document.getElementById("err").innerHTML = "Erreur mot de passe ou email"
                } else {
                    console.log("result", result.data);
                    var token = result.data.token
                    localStorage.setItem('token', token)
                    localStorage.setItem('id', result.data.note0._id)
                   // this.props.history.push("/")
                     this.redirect()
                    
                }


            }
            )
            .catch(result => {
                console.log("erreur", result);
                document.getElementById("err").innerHTML = "Erreur mot de passe ou email"

            });
    }

    login2 = (e) => {
        axios.post('https://backmim.herokuapp.com/register', e)
            .then(result => {
                if (result.data == "manque donne") {
                    console.log("erreur", result.data)
                    document.getElementById("erreur").innerHTML = "Manque de donnée"
                } else if (result.data == "Ce mail est deja utilise") {
                    console.log("erreur", result.data)
                    document.getElementById("erreur").innerHTML = "Ce mail est déja utilisé"
                }
                else {

                    console.log("result else", result.data);
                    var token = result.data.token
                    localStorage.setItem('token', token)
                    localStorage.setItem('id', result.data.e._id)
                    this.redirect()
                    // this._etatConnexion(localStorage.getItem('token'))
                }


            }
            )
            .catch(result => {
                console.log("erreur", result);

            });
    }


    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6" id="enr" >
                        <div id="login"  style={{marginTop:"100px",height: 700}} className="enr2">
                            <h3 class="text-center text-white pt-5"></h3>
                            <div class="container">
                                <div id="login-row" class="row justify-content-center align-items-center" >
                                    <div id="login-column" class="col-md-6">
                                        <div id="login-box" class="col-md-12">
                                            <form id="login-form" class="form" action="" method="post">
                                                <h3 >Enregistrement</h3>
                                                <div class="form-group">
                                                    <label for="username" >Nom:</label><br />
                                                    <input type="text" required name="nom" value={this.state.nom} onChange={this.change} className="username" class="form-control" />
                                                </div>
                                                <div class="form-group">
                                                    <label for="username" >Prenom:</label><br />
                                                    <input type="text" name="prenom" value={this.state.prenom} onChange={this.change} className="username" class="form-control" />
                                                </div>
                                                <div class="form-group">
                                                    <label for="username" >Email:</label><br />
                                                    <input type="text" name="email" value={this.state.email} onChange={this.change} className="username" class="form-control" />
                                                </div>

                                                <div class="form-group">
                                                    <label for="password" >Password:</label><br />
                                                    <input type="password" name="passWord" value={this.state.passWord} onChange={this.change} className="username" class="form-control" />
                                                </div>
                                                <div class="form-group">

                                                    <input type="submit" name="submit" class="btn btn-info btn-md" value="S'inscrire"
                                                        onClick={
                                                            (e) => {
                                                                e.preventDefault()
                                                                this.login2({
                                                                    email: this.state.email,
                                                                    passWord: this.state.passWord,
                                                                    nom: this.state.nom,
                                                                    prenom: this.state.prenom,

                                                                })
                                                            }
                                                        } />
                                                </div>
                                                <div id="register-link" class="text-right">

                                                </div>
                                            </form>
                                            <div id="erreur" style={{ color: "white", fontSize: "2em" }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        {this.renderRedirect()}
                        <div style={{marginTop:"100px"}}>
                            <div id="login25" style={{ height: 700 }} className="enr2">
                                <h3 class="text-center text-white pt-5"></h3>
                                <div class="container">
                                    <div id="login-row" class="row justify-content-center align-items-center">
                                        <div id="login-column" class="col-md-6">
                                            <div id="login-box" class="col-md-12">
                                                <form id="login-form" class="form" action="" method="post">
                                                    <h3 >Se connecter</h3>
                                                    <div class="form-group">
                                                        <label for="username" >Nom:</label><br />
                                                        <input type="text" name="email" value={this.state.email} onChange={this.change} id="username" class="form-control" />
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="password" >Mot de passe:</label><br />
                                                        <input type="password" name="passWord" value={this.state.passWord} onChange={this.change} id="password" class="form-control" />
                                                    </div>
                                                    <div class="form-group">

                                                        <input type="submit" name="Se connecter" class="btn btn-info btn-md" value="Se connecter"
                                                            onClick={
                                                                (e) => {
                                                                    e.preventDefault()
                                                                    this.login({
                                                                        email: this.state.email,
                                                                        passWord: this.state.passWord
                                                                    })
                                                                }
                                                            } />
                                                    </div>
                                                    <div id="err" style={{ color: "white", fontSize: "2em" }}>

                                                    </div>


                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}
