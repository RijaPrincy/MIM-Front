import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from "react-router-dom";
import ImageUploader from 'react-images-upload';
import Loader from 'react-loader-spinner'

export default class posterAnnoce extends Component {

    // idPoster: "ghj"



    constructor(props) {
        super(props);

        this.state = {
            pays: 'Alaotra-Mangoro',
            commune: '',
            codePostale: '',
            address: '',

            typeV: 'vente',
            type: 'Maison',
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


            Balcon_terasse: false,
            Garage_parking: false,
            piscine: false,
            Accés_handicape: false,
            Cave: false,
            pictures: [],
            pictures1: [],
            pictures2: [],
            pictures3: [],
            loading:false



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
            loading:true
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


        axios.post('https://backmim.herokuapp.com/venteImm', data, this.setAuthToken(localStorage.getItem('token')))
            .then(result => {
                console.log("result", result);
                if (result.data == "not ok") {
                    document.getElementById("non").innerHTML = "Non reussi"
                    document.getElementById("reussi").innerHTML = ""
                    this.setState({
                        loading:false
                    })
                } else {
                    document.getElementById("reussi").innerHTML = "Reussi"
                    document.getElementById("non").innerHTML = ""
                    this.setState({
                        loading:false
                    })
                }

            }
            )
            .catch(result => {
                document.getElementById("non").innerHTML = "Non reussi"
                document.getElementById("reussi").innerHTML = ""
                this.setState({
                    loading:false
                })
                console.log("erreur", result);

            });
        // this.setState({
        //     date: new Date()
        // })


        console.log("state", this.state, Date.now());


    }




    // renderRedirect = () => {
    //     if (localStorage.getItem('token')) {
    //         return <Redirect to='/Dashboard' />
    //     }
    // }
    // componentDidMount(){
    //     if (!localStorage.getItem('token')) {
    //         console.log("coucou");

    //         this.props.history.push("/")
    //     }
    // }




    render() {
        return (
            <div style={{ fontSize: "20px" }}>

                <div id="login">
                    <h3 class="text-center text-white pt-5">Login form</h3>
                    <div class="container">

                        <form id="login-form" class="form">



                            <div className="row">
                                <div className="col-md-6">


                                    <h4 class="text-center text-info">LOCALISATION DU BIEN</h4>

                                    <div class="form-group">
                                        <label for="username" class="text-info">Region:</label>
                                        <select className="form-control" id="exampleFormControlSelect2" name="pays" value={this.state.pays} onChange={this.change}>

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





                                <div className="col-md-6">

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

                                            <option value="Maison">Maison</option>
                                            <option value="Appartement">Appartement</option>
                                            <option value="Terrain">Terrain</option>
                                            <option value="Garage/Parking">Garage/Parking</option>
                                            <option value="Immeuble">Immeuble</option>
                                            <option value="Chalet/mobil-home" >Chalet/mobil-home</option>
                                            <option value="Multipropriété">Multipropriété</option>
                                            <option value="Résidence avec service">Résidence avec service</option>

                                            <option value="Bureau et locaux proffessionnel">Bureau et locaux proffessionnel</option>
                                            <option value="Fonds de commerce">Fonds de commerce</option>
                                            <option value="Local d'activité">Local d'activité</option>
                                            <option value="Résidence avec service">Résidence avec service</option>

                                            <option value="Parkings">Parkings</option>
                                            <option value="Terrain">Terrain</option>
                                            <option value="Surface divers">Surface divers</option>

                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label for="username" class="text-info">Nombre de pieces:</label>
                                        <input type="number" name="nbPiece" value={this.state.nbPiece} onChange={this.change} id="titre" class="form-control" required />
                                    </div>
                                    <div class="form-group">
                                        <label for="username" class="text-info">nombre de chambre:</label>
                                        <input type="number" name="nbChambre" value={this.state.nbChambre} onChange={this.change} id="titre" class="form-control" required />
                                    </div>
                                    <div class="form-group">
                                        <label for="username" class="text-info">Surface habitable:</label>
                                        <input type="number" name="surfaceTerrain" value={this.state.surfaceTerrain} onChange={this.change} id="titre" class="form-control" required />
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
                                        <input type="number" name="prix" value={this.state.prix} onChange={this.change} class="form-control" required />
                                    </div>
                                    <div class="form-group">
                                        <label for="username" class="text-info">Texte de l'annonce:</label>
                                        <textarea type="text" name="description" value={this.state.description} onChange={this.change} id="titre" class="form-control" required />
                                    </div>

                                </div>
                            </div>










                            <center><div style={{fontSize:"15px"}}>Veuillez uploader exactement 4 images</div></center>




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

                                <input type="submit" name="submit" class="btn btn-info btn-md" value="submit"
                                    onClick={
                                        this.handleUploadImage.bind(this)} />


                            </div>
                            {this.state.loading ? <center>
                            <Loader
                                type="ThreeDots"
                                color="#00BFFF"
                                height="100"
                                width="100"
                            />
                        </center> : ""}
                            <div id="reussi" style={{ color: "#f3671f", fontSize: "2em" }}></div>
                            <div id="non" style={{ color: "#f3671f", fontSize: "2em" }}></div>

                        </form>
                    </div>
                </div>



            </div>
        )
    }
}
