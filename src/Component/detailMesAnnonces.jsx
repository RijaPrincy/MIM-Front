import React, { Component } from 'react'
import axios from 'axios'
import { MDBCarousel, MDBCarouselCaption, MDBCarouselInner, MDBCarouselItem, MDBView, MDBMask, MDBContainer } from
    "mdbreact"
import { MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import ImageUploader from 'react-images-upload';
import Loader from 'react-loader-spinner'

export default class detailMesAnnonce extends Component {
    constructor(props) {
        super(props);
        this.state = {
            annonce: "",
            pays: '',
            commune: '',
            codePostale: '',
            address: '',

            typeV: 'vente',
            type: '',
            nbPiece: '',
            nbChambre: '',
            surfaceTerrain: '',
            caracteristique: '',
            prix: '',
            description: '',
            date: '',
            image: '',
            image1: '',
            image2: '',
            image3: '',
            url: "",
            url1: "",
            url2: "",
            url3: "",


            Balcon_terasse: false,
            Garage_parking: false,
            piscine: false,
            Accés_handicape: false,
            Cave: false,
            pictures: [],
            pictures1: [],
            pictures2: [],
            pictures3: [],
            reussi: "",
            non: "",
            vue: true,



            message: "",
            loading: true,
            loadVue: false

        }
        this.change = this.change.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.onDrop1 = this.onDrop1.bind(this);
        this.onDrop2 = this.onDrop2.bind(this);
        this.onDrop3 = this.onDrop3.bind(this);
    }





    onDrop(picture) {
        console.log(picture);

        this.setState({
            pictures: this.state.pictures.concat(picture),
        });
    }
    onDrop1(picture) {
        console.log(picture);

        this.setState({
            pictures1: this.state.pictures1.concat(picture),
        });
    }
    onDrop2(picture) {
        console.log(picture);

        this.setState({
            pictures2: this.state.pictures2.concat(picture),
        });
    }
    onDrop3(picture) {
        console.log(picture);

        this.setState({
            pictures3: this.state.pictures3.concat(picture),
        });
    }



    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        console.log(name, value);


        this.setState({
            [name]: value
        });
        if (value) {
            this.setState({
                caracteristique: this.state.caracteristique + " " + name
            });
        } else {
            this.setState({
                caracteristique: this.state.caracteristique.replace(name, "")
            });
        }

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


    handleUploadImage(ev) {
        ev.preventDefault();



        this.setState({
            loadVue: true
        })


        const data = new FormData();

        data.append('pays', this.state.pays);
        data.append('commune', this.state.commune)
        data.append('codePostale', this.state.codePostale)
        data.append('address', this.state.address)
        data.append('typeV', this.state.typeV)
        data.append('type', this.state.type)
        data.append('nbPiece', this.state.nbPiece)
        data.append('nbChambre', this.state.nbChambre)
        data.append('surfaceTerrain', this.state.surfaceTerrain)
        data.append('caracteristique', this.state.caracteristique)
        data.append('prix', this.state.prix)
        data.append('description', this.state.description)
        data.append('date', new Date())
        data.append('image', Date.now())
        data.append('image1', Date.now() + "a")
        data.append('image2', Date.now() + "b")
        data.append('image3', Date.now() + "c")
        data.append('idPoster', localStorage.getItem('id'))

        data.append('file', this.state.pictures[0])
        data.append('file1', this.state.pictures1[0])
        data.append('file2', this.state.pictures2[0])
        data.append('file3', this.state.pictures3[0])


        axios.put('https://backmim.herokuapp.com/updateVenteImm/' + this.props.match.params.id, data, this.setAuthToken(localStorage.getItem('token')))
            .then(result => {
                console.log("result put", result.data.note);
                if (result.data == "not ok") {
                    // document.getElementById("non").innerHTML = "non reussi"
                    this.setState({
                        non: "non reussi",
                        reussi: "",
                        loadVue: false
                    })
                    //document.getElementById("reussi").innerHTML = ""
                } else {

                    axios.get("https://backmim.herokuapp.com/getOne/" + this.props.match.params.id)
                        .then(resp => {
                            console.log("data", resp.data);
                            this.setState({
                                annonce: resp.data,
                                url: "https://backmim.herokuapp.com/image/" + resp.data.image,
                                url1: "https://backmim.herokuapp.com/image/" + resp.data.image1,
                                url2: "https://backmim.herokuapp.com/image/" + resp.data.image2,
                                url3: "https://backmim.herokuapp.com/image/" + resp.data.image3,
                                loadVue: false
                            })
                        }).catch(er => {
                            console.log(er);

                        })

                    this.setState({
                        non: "",
                        reussi: "reussi",
                        loadVue: false

                    })
                    // document.getElementById("reussi").innerHTML = "reussi"
                    // document.getElementById("non").innerHTML = ""
                }

            }).catch(result => {

                this.setState({
                    non: "non reussi",
                    reussi: "",
                    loadVue: false
                })
                console.log("erreur", result);

            });
        // this.setState({
        //     date: new Date()
        // })


        //   console.log("state", this.state, Date.now());


    }



    state = {
        modal6: false,
        modal7: false
    }

    toggle = nr => () => {
        let modalNumber = 'modal' + nr
        this.setState({
            [modalNumber]: !this.state[modalNumber],
            caracteristique: ""
        });
    }

    componentDidMount() {
        console.log(this.props.match.params.id);

        axios.get("https://backmim.herokuapp.com/getOne/" + this.props.match.params.id)
            .then(resp => {
                console.log("resp", resp);

                this.setState({
                    annonce: resp.data,
                    pays: resp.data.pays,
                    commune: resp.data.commune,
                    codePostale: resp.data.codePostale,
                    address: resp.data.address,

                    typeV: resp.data.typeV,
                    type: resp.data.type,
                    nbPiece: resp.data.nbPiece,
                    nbChambre: resp.data.nbChambre,
                    surfaceTerrain: resp.data.surfaceTerrain,
                    caracteristique: resp.data.caracteristique,
                    prix: resp.data.prix,
                    description: resp.data.description,
                    message: resp.data.contact,
                    url: "https://backmim.herokuapp.com/image/" + resp.data.image,
                    url1: "https://backmim.herokuapp.com/image/" + resp.data.image1,
                    url2: "https://backmim.herokuapp.com/image/" + resp.data.image2,
                    url3: "https://backmim.herokuapp.com/image/" + resp.data.image3,
                    loading: false
                })

                for (let j = 0; j < resp.data.contact.length; j++) {
                    if (resp.data.contact[j].vue == false) {
                        console.log("if", resp.data.contact[j].vue);
                        this.setState({
                            vue: false
                        })
                        j = resp.data.contact.length

                    } else {
                        console.log("nothing");

                    }



                }
                console.log(resp.data);
            }).catch(err => {
                console.log(err);
            })
    }



    visibilite(e) {

        axios.put("https://backmim.herokuapp.com/updateVisibilite2", e)
            .then(re => {
                console.log(re);
                axios.get("https://backmim.herokuapp.com/getOne/" + this.props.match.params.id)
                    .then(resp => {
                        console.log("resp", resp);

                        this.setState({
                            annonce: resp.data,
                            message: resp.data.contact
                        })
                        let h = 1
                        for (let j = 0; j < resp.data.contact.length; j++) {
                            if (resp.data.contact[j].vue === false) {
                                console.log("if", resp.data.contact[j].vue);
                                this.setState({
                                    vue: false
                                })
                                h = h + 1
                                j = resp.data.contact.length

                            }

                        }
                        if (h == 1) {
                            this.setState({
                                vue: true
                            })
                        }
                        console.log(resp.data);
                    }).catch(err => {
                        console.log(err);
                    })

            }).catch(er => {
                console.log(er);

            })
    }
    render() {
        return (
            <div className="container" style={{ fontSize: "15px" }}>
                <div className="row" >
                    <div className="col-md-9" style={{ marginTop: "100px" }}>
                        <h2 className="font-weight-bold mb-3 p-0">
                            <strong>{this.state.annonce.typeV}  {this.state.annonce.type}  {this.state.annonce.pays} {this.state.annonce.commune} </strong>
                        </h2>
                        <h6 className="font-weight-bold mb-3 p-0">
                            {this.state.annonce.address}
                        </h6>
                        <h5 className="font-weight-bold mb-3 p-0">
                            {this.state.annonce.nbPiece} pièces/ {this.state.annonce.nbChambre} chambres/ {this.state.annonce.surfaceTerrain} m2
                                 </h5>
                        <h2 className="font-weight-bold mb-3 p-0">
                            <strong>{this.state.annonce.prix} Ar </strong>
                        </h2>
                        <h5 className="font-weight-bold mb-3 p-0">
                            <strong>Les caractéristiques : {this.state.annonce.caracteristique} </strong>
                        </h5>
                        <div className="container" style={{ marginTop: "20px", marginBottom: "29px" }}>{this.state.annonce.description}</div>



                        {this.state.loading ? <center>
                            <Loader
                                type="Puff"
                                color="#00BFFF"
                                height="100"
                                width="100"
                            />
                        </center> : ""}


                        <MDBContainer>
                            <center><MDBBtn color="info" onClick={this.toggle(5)}>Message</MDBBtn></center>
                            <center>{this.state.vue ? "" : <div style={{ fontSize: "15px", color: "red" }}>il y a des messages non lues</div>}</center>
                            <MDBModal isOpen={this.state.modal5} toggle={this.toggle(5)} fullHeight position="right">
                                <MDBModalHeader toggle={this.toggle(5)}>MESSAGE</MDBModalHeader>
                                <MDBModalBody>
                                    {this.state.message.length > 0 ? this.state.message.map((re, index) => {
                                        return <div style={{ fontSize: "15px" }}>
                                            <div><strong>Nom:</strong> {re.nom}</div>
                                            <div><e>Prenom:</e> {re.prenom}</div>
                                            <div><e>Telephone:</e> {re.telephone}</div>
                                            <div><e>Email:</e> {re.email}</div>
                                            <div><e>Message:</e> <e style={{ color: "red" }}>{re.message}</e></div>
                                            <div> {re.date}</div>
                                            {re.vue ? <MDBBtn color="info" onClick={(e) => {
                                                e.preventDefault()
                                                this.visibilite({
                                                    idAnnonce: this.props.match.params.id,
                                                    index: index
                                                })
                                            }}>vue</MDBBtn> : <MDBBtn color="primary" onClick={(e) => {
                                                e.preventDefault()
                                                this.visibilite({
                                                    idAnnonce: this.props.match.params.id,
                                                    index: index
                                                })
                                            }}>non vue</MDBBtn>}



                                            <hr className="my-5" />
                                        </div>
                                    }) : "pas de message"}
                                </MDBModalBody>

                            </MDBModal>

                        </MDBContainer>








                        <MDBContainer>
                            <center>
                                <MDBBtn color="info" onClick={this.toggle(8)}>Modifier</MDBBtn>

                            </center>
                            <MDBModal isOpen={this.state.modal8} toggle={this.toggle(8)} fullHeight position="right">
                                <MDBModalHeader toggle={this.toggle(8)}>MODIFIER</MDBModalHeader>
                                <MDBModalBody>
                                    <div style={{ fontSize: "15px" }}>

                                        <div id="login">
                                            <h3 class="text-center text-white pt-5">Login form</h3>
                                            <div class="container">

                                                <form id="login-form" class="form">



                                                    <div >
                                                        <div >


                                                            <h4 class="text-center text-info">LOCALISATION DU BIEN</h4>

                                                            <div class="form-group">
                                                                <label for="username" class="text-info">Region:</label>
                                                                <select className="form-control" id="exampleFormControlSelect2" name="pays" value={this.state.pays} onChange={this.change}>
                                                                    <option value="Region" >Region</option>
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

                                                                </select>
                                                            </div>


                                                            <div class="form-group">
                                                                <label for="username" class="text-info">Code postal du bien:</label>
                                                                <input type="text" name="codePostale" value={this.state.codePostale} onChange={this.change} class="form-control" required />
                                                            </div>
                                                            <div class="form-group">
                                                                <label for="username" class="text-info">Commune:</label>
                                                                <input type="text" name="commune" value={this.state.commune} onChange={this.change} class="form-control" required />
                                                            </div>
                                                            <div class="form-group">
                                                                <label for="username" class="text-info">Addresse:</label>
                                                                <input type="text" name="address" value={this.state.address} onChange={this.change} class="form-control" required />
                                                            </div>
                                                        </div>





                                                        <div >

                                                            <h4 class="text-center text-info">VOTRE BIEN</h4>
                                                            <div class="form-group">
                                                                <label for="username" class="text-info">Nature de l'annonce:</label>
                                                                <select className="form-control" id="exampleFormControlSelect2" name="typeV" value={this.state.typeV} onChange={this.change}>
                                                                    <option value="Vente" >Vente</option>
                                                                    <option value="Location">Location</option>
                                                                </select>
                                                            </div>
                                                            <div class="form-group">
                                                                <label for="username" class="text-info">Type de bien:</label>
                                                                <select className="form-control" id="exampleFormControlSelect2" name="type" value={this.state.type} onChange={this.change}>
                                                                    <option value="Immobilier d'habitation" style={{ color: "blue" }}>Immobilier d'habitation</option>
                                                                    <option value="Maison">Maison</option>
                                                                    <option value="Appartement">Appartement</option>
                                                                    <option value="Terrain">Terrain</option>
                                                                    <option value="Garage/Parking">Garage/Parking</option>
                                                                    <option value="Immeuble">Immeuble</option>
                                                                    <option value="Chalet/mobil-home" >Chalet/mobil-home</option>
                                                                    <option value="Multipropriété">Multipropriété</option>
                                                                    <option value="Résidence avec service">Résidence avec service</option>
                                                                    <option value="Immobilier d'entreprise" style={{ color: "blue" }}>Immobilier d'entreprise</option>
                                                                    <option value="Bureau et locaux proffessionnel">Bureau et locaux proffessionnel</option>
                                                                    <option value="Fonds de commerce">Fonds de commerce</option>
                                                                    <option value="Local d'activité">Local d'activité</option>
                                                                    <option value="Résidence avec service">Résidence avec service</option>
                                                                    <option value="Divers" style={{ color: "blue" }}>Divers</option>
                                                                    <option value="Parkings">Parkings</option>
                                                                    <option value="Terrain">Terrain</option>
                                                                    <option value="Surface divers">Surface divers</option>

                                                                </select>
                                                            </div>
                                                            <div class="form-group">
                                                                <label for="username" class="text-info">Nombre de pieces:</label>
                                                                <input type="text" name="nbPiece" value={this.state.nbPiece} onChange={this.change} id="titre" class="form-control" required />
                                                            </div>
                                                            <div class="form-group">
                                                                <label for="username" class="text-info">nombre de chambre:</label>
                                                                <input type="text" name="nbChambre" value={this.state.nbChambre} onChange={this.change} id="titre" class="form-control" required />
                                                            </div>
                                                            <div class="form-group">
                                                                <label for="username" class="text-info">Surface habitable:</label>
                                                                <input type="text" name="surfaceTerrain" value={this.state.surfaceTerrain} onChange={this.change} id="titre" class="form-control" required />
                                                            </div>

                                                            <div class="form-group">
                                                                <label for="username" class="text-info">Caracteristiques:</label><br />
                                                                <label>
                                                                    Balcon/terrasse:
                                                                <input
                                                                        name="Balcon_terasse"
                                                                        type="checkbox"
                                                                        checked={this.state.Balcon_terasse}
                                                                        onChange={this.handleInputChange} /></label>
                                                                <label>
                                                                    Garage/parking:
                                                                <input
                                                                        name="Garage_parking"
                                                                        type="checkbox"
                                                                        checked={this.state.Garage_parking}
                                                                        onChange={this.handleInputChange} /></label>
                                                                <label>
                                                                    piscine:
                                                                <input
                                                                        name="piscine"
                                                                        type="checkbox"
                                                                        checked={this.state.piscine}
                                                                        onChange={this.handleInputChange} /></label>
                                                                <label>
                                                                    Accés handicapé:
                                                                <input
                                                                        name="Accés_handicape"
                                                                        type="checkbox"
                                                                        checked={this.state.Accés_handicape}
                                                                        onChange={this.handleInputChange} /></label>
                                                                <label>
                                                                    Cave:
                                                                <input
                                                                        name="Cave"
                                                                        type="checkbox"
                                                                        checked={this.state.Cave}
                                                                        onChange={this.handleInputChange} /></label>

                                                            </div>
                                                            <div class="form-group">
                                                                <label for="username" class="text-info">Prix:</label>
                                                                <input type="text" name="prix" value={this.state.prix} onChange={this.change} class="form-control" required />
                                                            </div>
                                                            <div class="form-group">
                                                                <label for="username" class="text-info">Texte de l'annonce:</label>
                                                                <textarea type="text" name="description" value={this.state.description} onChange={this.change} id="titre" class="form-control" required />
                                                            </div>

                                                        </div>
                                                    </div>



                                                    <div className="row">
                                                        <div className="col-md-3"><ImageUploader
                                                            withIcon={true}
                                                            buttonText='Choose images'
                                                            onChange={this.onDrop}
                                                            imgExtension={['.jpg', '.jpeg', '.gif', '.png', '.gif']}
                                                            maxFileSize={5242880}
                                                            singleImage={true}
                                                            className='file'
                                                            withPreview={true}
                                                        /></div>
                                                        <div className="col-md-3"><ImageUploader
                                                            withIcon={true}
                                                            buttonText='Choose images'
                                                            onChange={this.onDrop1}
                                                            imgExtension={['.jpg', '.jpeg', '.gif', '.png', '.gif']}
                                                            maxFileSize={5242880}
                                                            singleImage={true}
                                                            className='file'
                                                            withPreview={true}
                                                        /></div>
                                                        <div className="col-md-3"> <ImageUploader
                                                            withIcon={true}
                                                            buttonText='Choose images'
                                                            onChange={this.onDrop2}
                                                            imgExtension={['.jpg', '.jpeg', '.gif', '.png', '.gif']}
                                                            maxFileSize={5242880}
                                                            singleImage={true}
                                                            className='file'
                                                            withPreview={true}
                                                        /></div>
                                                        <div className="col-md-3"><ImageUploader
                                                            withIcon={true}
                                                            buttonText='Choose images'
                                                            onChange={this.onDrop3}
                                                            imgExtension={['.jpg', '.jpeg', '.gif', '.png', '.gif']}
                                                            maxFileSize={5242880}
                                                            singleImage={true}
                                                            className='file'
                                                            withPreview={true}
                                                        /></div>
                                                    </div>



                                                    {/* 
            <div class="input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroupFileAddon01">Upload</span>
                </div>
                <div class="custom-file">

                    <input

                        class="custom-file-input" id="inputGroupFile01"
                        aria-describedby="inputGroupFileAddon01"
                        ref={(ref) => { this.uploadInput = ref; }} type="file" class="form-control" id="inputCity" /> */}
                                                    {/* <label class="custom-file-label" for="inputGroupFile01">Choose file</label> */}
                                                    {/* </div>
            </div> */}







                                                    <div class="form-group">

                                                        <input type="submit" name="submit" class="btn btn-info btn-md" value="Modifier"
                                                            onClick={
                                                                this.handleUploadImage.bind(this)} />
                                                        {this.state.loadVue ? <center>
                                                            <Loader
                                                                type="ThreeDots"
                                                                color="#00BFFF"
                                                                height="50"
                                                                width="50"
                                                            />
                                                        </center> : ""}


                                                    </div>
                                                    <div id="reussi" style={{ color: "#f3671f", fontSize: "2em" }}>{this.state.reussi}</div>
                                                    <div id="non" style={{ color: "#f3671f", fontSize: "2em" }}>{this.state.non}</div>

                                                </form>
                                            </div>
                                        </div>



                                    </div>
                                </MDBModalBody>
                                {/* <MDBModalFooter>
                                <MDBBtn color="secondary" onClick={this.toggle(8)}>Close</MDBBtn>
                                <MDBBtn color="primary">Modifier</MDBBtn>
                            </MDBModalFooter> */}
                            </MDBModal>


                        </MDBContainer>

























                        <MDBContainer>
                            <MDBCarousel
                                activeItem={1}
                                length={4}
                                showControls={true}
                                showIndicators={true}
                                className="z-depth-1"
                            >
                                <MDBCarouselInner>
                                    <MDBCarouselItem itemId="1">
                                        <MDBView>
                                            <img
                                                className="d-block w-100"
                                                src={this.state.url}
                                                alt="First slide"
                                            />
                                            <MDBMask overlay="black-light" />
                                        </MDBView>
                                        <MDBCarouselCaption>

                                        </MDBCarouselCaption>
                                    </MDBCarouselItem>
                                    <MDBCarouselItem itemId="2">
                                        <MDBView>
                                            <img
                                                className="d-block w-100"
                                                src={this.state.url1}
                                                alt="Second slide"
                                            />
                                            <MDBMask overlay="black-light" />
                                        </MDBView>
                                        <MDBCarouselCaption>

                                        </MDBCarouselCaption>
                                    </MDBCarouselItem>
                                    <MDBCarouselItem itemId="3">
                                        <MDBView>
                                            <img
                                                className="d-block w-100"
                                                src={this.state.url2}
                                                alt="Third slide"
                                            />
                                            <MDBMask overlay="black-light" />
                                        </MDBView>
                                        <MDBCarouselCaption>

                                        </MDBCarouselCaption>
                                    </MDBCarouselItem>
                                    <MDBCarouselItem itemId="4">
                                        <MDBView>
                                            <img
                                                className="d-block w-100"
                                                src={this.state.url3}
                                                alt="Third slide"
                                            />
                                            <MDBMask overlay="black-light" />
                                        </MDBView>
                                        <MDBCarouselCaption>

                                        </MDBCarouselCaption>
                                    </MDBCarouselItem>

                                </MDBCarouselInner>
                            </MDBCarousel>
                        </MDBContainer>


                    </div>







                </div>

            </div>
        )
    }
}
