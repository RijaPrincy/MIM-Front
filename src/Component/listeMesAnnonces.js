import React, { Component } from 'react'
import axios from 'axios'
import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBMask, MDBIcon, MDBView, MDBBtn } from "mdbreact";
import Loader from 'react-loader-spinner'

export default class listeMesAnnonces extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: "",
            list1: '',
            pictures: [],
            message: "",
            temp:"",
            loading:true
        }
    }

    componentDidMount() {
        axios.get("https://monchezmoi.herokuapp.com/getMesAnnonces/" + localStorage.getItem('id'))
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
    render() {
        return (
            <div className="container" style={{fontSize:"15px"}}>
                <form >
                    <center><h3>Filtre​ </h3></center>
                    <div className="row" style={{ marginTop: "70px" }}>
                    </div>



                </form>
                <MDBCard className="my-5 px-5 pb-5">
                    <MDBCardBody>
                        <h2 className="h1-responsive font-weight-bold text-center my-5">
                            Mes annonces
                    </h2>
                        <p className="text-center w-responsive mx-auto mb-5">
                            Duis aute irure dolor in reprehenderit in voluptate velit esse
                            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident, sunt in culpa qui officia deserunt mollit
                            anim id est laborum.
                    </p>
                    {this.state.loading?<center>
                            <Loader
                            type="Puff"
                            color="#00BFFF"
                            height="100"
                            width="100"
                        />
                        </center>:""}
                        {this.state.list.length > 0 ? this.state.list.sort((a,b)=>{return (b._id-a._id)}).map((ate, index) => {
                            var even = function(element) {
                                // checks whether an element is even
                                return element.vue === false;
                              };

                            
                            let a = "https://monchezmoi.herokuapp.com/image/" + ate.image
                            let h = new Date(ate.date)
                            let r = h.getDate() + "/" + (h.getMonth() + 1) + "/" + h.getFullYear()
                            return <div>
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
                                                <p>{ate.contact.some(even)>0?<div style={{fontSize:"15px",color:"red"}}>il y a des messages non lues</div>:""}</p>
                                                <MDBBtn color="success" size="md" className="waves-light " onClick={
                                                    () => this.props.history.push('/DetailMesAnnonces/' + ate._id)
                                                }>
                                                    Modigier
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
                                                <p>{ate.contact.some(even)>0?<div style={{fontSize:"15px",color:"red"}}>il y a des messages non lues</div>:""}</p>
                                                <MDBBtn
                                                    color="pink"
                                                    size="md"
                                                    className="mb-lg-0 mb-4 waves-light"
                                                    onClick={
                                                        () => this.props.history.push('/DetailMesAnnonces/' + ate._id)
                                                    }
                                                >
                                                    Modifier
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
