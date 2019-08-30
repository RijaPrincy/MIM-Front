import React, { Component } from 'react'
import axios from 'axios'
import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBMask, MDBIcon, MDBView, MDBBtn } from "mdbreact";
import Loader from 'react-loader-spinner'


export default class test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: "",
            list1: '',
            pictures: [],
            typeV: "none",
            type: "none",
            prixMax: "",
            chambre: "none",
            piece: "none",
            pays: "none",
            loading: true
        }
        this.change = this.change.bind(this)
    }


    componentDidMount() {
        axios.get("https://monchezmoi.herokuapp.com/getAll")
            .then(resp => {
                this.setState({
                    list: resp.data,
                    list1: resp.data,
                    loading:false
                })
                console.log("props", this.state.list);
            }).catch(err => {
                console.log(err);
            })

    }

    change = (e) => {
        console.log(e);

        this.setState({
            [e.target.name]: e.target.value
        })
        console.log(this.state);
    }

    trie() {

        // if (this.state.typeV !== "none" && this.state.prixMin == 0 && this.state.prixMax == 0 &&
        //     this.state.chambre == "none" && this.state.piece == "none" && this.state.pays == "none") {

        //     if (this.state.typeV == "Tout") {
        //         this.setState({
        //             list:this.state.list1
        //         })
        //     } else {
        //         var a = this.state.list1.filter(book => book.typeV == this.state.typeV)
        //         this.setState({
        //             list: a
        //         })
        //     }

        // }

        // typeV: "none",
        // type: "none",
        // prixMax: "",
        // chambre: "none",
        // piece: "none",
        // pays: "none"

        var a = this.state.list1.filter(book => {
            console.log("prixMax", this.state.typeV, "prix", book.typeV);


            return (

                (this.state.typeV !== "none" ? (this.state.typeV == "Tout" ? (book.typeV == book.typeV) : (book.typeV == this.state.typeV)) : (book.typeV == book.typeV))
                &&
                (this.state.type !== "none" ? (this.state.type == "Tout" ? (book.typeV == book.typeV) : (book.type == this.state.type)) : (book.type == book.type))
                &&
                (this.state.prixMax ? (parseInt(book.prix) <= this.state.prixMax) : (book.type == book.type))
                &&
                (this.state.chambre != "none" ? (this.state.chambre == "Tout" ? (book.type == book.type) : (this.state.chambre == "plus" ? (parseInt(book.nbChambre) >= parseInt(this.state.chambre)) : ((book.nbChambre == this.state.chambre)))) : (book.type == book.type))
                &&
                (this.state.piece != "none" ? (this.state.piece == "Tout" ? (book.type == book.type) : (this.state.piece == "plus" ? (parseInt(book.nbPiece) >= parseInt(this.state.piece)) : ((book.nbPiece == this.state.piece)))) : (book.type == book.type))
                &&
                (this.state.pays !== "none" ? (this.state.pays == "Tout" ? (book.typeV == book.typeV) : (book.pays == this.state.pays)) : (book.type == book.type))

            )
        }



        )




        this.setState({
            list: a
        })


    }





    render() {
        return (
            <div className="container">
                <form style={{ fontSize: '15px' }}>
                    <center><h3>Filtre​ </h3></center>
                    <div className="row" style={{ marginTop: "70px" }}>
                        <div class="form-group" className="col-md-6">

                            <select className="form-control" id="exampleFormControlSelect1" name="typeV" value={this.state.typeV} onChange={this.change}>
                                <option value="vente">Vente</option>
                                <option value="vente">Vente</option>
                                <option value="Location">Location</option>
                                <option value="Tout">Tout</option>
                            </select>
                        </div>
                        <div class="form-group" className="col-md-6">

                            <select className="form-control" id="exampleFormControlSelect2" name="type" value={this.state.type} onChange={this.change}>
                                {/* <option value="Immobilier d'habitation" style={{ color: "blue" }}>Immobilier d'habitation</option> */}
                                <option value="Maison">Maison</option>
                                <option value="Appartement">Appartement</option>
                                <option value="Terrain">Terrain</option>
                                <option value="Garage/Parking">Garage/Parking</option>
                                <option value="Immeuble">Immeuble</option>
                                <option value="Chalet/mobil-home" >Chalet/mobil-home</option>
                                <option value="Multipropriété">Multipropriété</option>
                                <option value="Résidence avec service">Résidence avec service</option>
                                {/* <option value="Immobilier d'entreprise" style={{ color: "blue" }} desabled>Immobilier d'entreprise</option> */}
                                <option value="Bureau et locaux proffessionnel">Bureau et locaux proffessionnel</option>
                                <option value="Fonds de commerce">Fonds de commerce</option>
                                <option value="Local d'activité">Local d'activité</option>
                                <option value="Résidence avec service">Résidence avec service</option>
                                {/* <option value="Divers" style={{ color: "blue" }}>Divers</option> */}
                                <option value="Parkings">Parkings</option>
                                <option value="Terrain">Terrain</option>
                                <option value="Surface divers">Surface divers</option>
                                <option value="Tout">Tout</option>

                            </select>
                        </div>



                    </div>
                    <div className="row" style={{ marginTop: "20px" }}>



                        <div className="col-md-3">

                            <input id="exampleFormControlSelect1" placeholder="prix max"
                                type="number" className="form-control"
                                name="prixMax" value={this.state.prixMax} onChange={this.change} />
                        </div>





                        <div class="form-group" className="col-md-3">

                            <select className="form-control" name="chambre" id="exampleFormControlSelect1" value={this.state.chambre} onChange={this.change}>

                                <option value="none" >Chambres</option>
                                <option value="1">1 Chambre</option>
                                <option value="2">2 Chambres</option>
                                <option value="3">3 Chambres</option>
                                <option value="4">4 Chambres</option>
                                <option value="5">5 Chambres</option>
                                <option value="6">6 Chambres</option>
                                <option value="plus">Plus de 6</option>
                                <option value="Tout">Tout</option>

                            </select>
                        </div>

                        <div class="form-group" className="col-md-3">

                            <select className="form-control" name="piece" id="exampleFormControlSelect1" value={this.state.piece} onChange={this.change}>
                                <option value="none">pièces</option>
                                <option value="1">1 pièce</option>
                                <option value="2">2 pièces</option>
                                <option value="3">3 pièces</option>
                                <option value="4">4 pièces</option>
                                <option value="5">5 pièces</option>
                                <option value="6">6 pièces</option>
                                <option value="plus">Plus de 6</option>
                                <option value="Tout">Tout</option>

                            </select>
                        </div>





                        <div class="form-group" className="col-md-3">

                            <select className="form-control" id="exampleFormControlSelect2" name="pays" value={this.state.pays} onChange={this.change}>
                                <option value="none" >Region</option>
                                <option value="Alaotra-Mangoro">Alaotra-Mangoro</option>
                                <option value="Amoron'i Mania">Amoron'i Mania</option>
                                <option value="Analamanga">Analamanga</option>
                                <option value="Analanjirofo">Analanjirofo</option>
                                <option value="Androy">Androy</option>
                                <option value="Anôsy" >Anôsy</option>
                                <option value="Atsimo-Andrefana">Atsimo-Andrefana</option>
                                <option value="Atsimo-Atsinanana">Atsimo-Atsinanana</option>
                                <option value="Atsinanana">Atsinanana</option>
                                <option value="Betsiboka">Betsiboka</option>
                                <option value="Boeny">Boeny</option>
                                <option value="Bongolava">Bongolava</option>
                                <option value="Diana" >	Diana</option>
                                <option value="Haute Matsiatra">Haute Matsiatra</option>
                                <option value="Ihorombe">Ihorombe</option>
                                <option value="Itasy">Itasy</option>
                                <option value="Melaky">Melaky</option>
                                <option value="Menabe">Menabe</option>
                                <option value="Sava">Sava</option>
                                <option value="Sofia">Sofia</option>
                                <option value="Vakinankaratra">Vakinankaratra</option>
                                <option value="Vatovavy-Fitovinany">Vatovavy-Fitovinany</option>
                                <option value="Tout">Tout</option>

                            </select>
                        </div>
                    </div>

                    <center>
                        <input type="submit" className="btn "
                            value="search" style={{ marginTop: "30px", backgroundColor: "rgba(42, 163, 157, 0.979)", color: "white", borderRadius: "20px", width: "70%" }}
                            onClick={(e) => {
                                e.preventDefault()
                                this.trie()
                            }} />
                    </center>
                </form>
                <MDBCard className="my-5 px-5 pb-5">
                    <MDBCardBody>

                        <h2 className="h1-responsive font-weight-bold text-center my-5">
                            Les postes recents
                        </h2>
                        {this.state.loading?<center>
                            <Loader
                            type="Puff"
                            color="#00BFFF"
                            height="100"
                            width="100"
                        />
                        </center>:""}
                        <p className="text-center w-responsive mx-auto mb-5" style={{ fontSize: '15px' }}>
                            liste de toutes les publications
                        </p>
                        {this.state.list.length > 0 ? this.state.list.sort((a, b) => { return (b._id - a._id) }).map((ate, index) => {
                            let a = "https://monchezmoi.herokuapp.com/image/" + ate.image
                            let h = new Date(ate.date)
                            let r = h.getDate() + "/" + (h.getMonth() + 1) + "/" + h.getFullYear()
                            return <div style={{ fontSize: '15px' }}>
                                {index % 2 == 0 ?
                                    <div>
                                        <hr className="my-5" />
                                        <MDBRow>
                                            <MDBCol lg="5">
                                                <MDBView className="rounded z-depth-2 mb-lg-0 mb-4" hover waves>
                                                    <img
                                                        className="img-fluid"
                                                        src={a}
                                                        alt=""
                                                    />
                                                    <a href="#!">
                                                        <MDBMask overlay="white-slight" />
                                                    </a>
                                                </MDBView>
                                            </MDBCol>
                                            <MDBCol lg="7">

                                                <h4 className="font-weight-bold mb-3 p-0">
                                                    <strong>{ate.typeV}  {ate.type}  {ate.pays} {ate.commune} </strong>
                                                </h4>
                                                <h5 className="font-weight-bold mb-3 p-0">
                                                    {ate.nbPiece} pièces/ {ate.nbChambre} chambres/ {ate.surfaceTerrain} m2
                                 </h5>
                                                <h2 className="font-weight-bold mb-3 p-0">
                                                    <strong>{ate.prix} Ar </strong>
                                                </h2>
                                                <p>
                                                    {ate.description.length > 200 ? ate.description.slice(0, 200) + '...' : ate.description}
                                                </p>
                                                <p>
                                                    {r}
                                                </p>
                                                <MDBBtn color="success" size="md" className="waves-light " onClick={
                                                    () => this.props.history.push('/detailAnnonce/' + ate._id)
                                                }>
                                                    En savoir plus
                                 </MDBBtn>
                                            </MDBCol>
                                        </MDBRow>
                                    </div>
                                    : <div><hr className="my-5" />
                                        <MDBRow>
                                            <MDBCol lg="7">
                                                <h4 className="font-weight-bold mb-3 p-0">
                                                    <strong>{ate.typeV}  {ate.type}  {ate.pays} {ate.commune} </strong>
                                                </h4>
                                                <h5 className="font-weight-bold mb-3 p-0">
                                                    {ate.nbPiece} pièces/ {ate.nbChambre} chambres/ {ate.surfaceTerrain} m2
                            </h5>
                                                <h2 className="font-weight-bold mb-3 p-0">
                                                    <strong>{ate.prix} Ar </strong>
                                                </h2>
                                                <p>
                                                    {ate.description.length > 200 ? ate.description.slice(0, 200) + '...' : ate.description}
                                                </p>

                                                <p>

                                                    {r}
                                                </p>
                                                <MDBBtn
                                                    color="pink"
                                                    size="md"
                                                    className="mb-lg-0 mb-4 waves-light"
                                                    onClick={
                                                        () => this.props.history.push('/detailAnnonce/' + ate._id)
                                                    }
                                                >
                                                    En savoir plus
                                </MDBBtn>
                                            </MDBCol>
                                            <MDBCol lg="5">
                                                <MDBView className="rounded z-depth-2 mb-lg-0 mb-4" hover waves>
                                                    <img
                                                        className="img-fluid"
                                                        src={a}
                                                        alt=""
                                                    />
                                                    <a href="#!">
                                                        <MDBMask overlay="white-slight" />
                                                    </a>
                                                </MDBView>
                                            </MDBCol>
                                        </MDBRow>
                                    </div>
                                }


                            </div>
                        }) : ""}

                    </MDBCardBody>
                </MDBCard>
            </div>
        )
    }
}
