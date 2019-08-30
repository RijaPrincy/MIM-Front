import React, { Component } from 'react'
import Nav from './navBar'
import Dash from './Dashboard'

export default class pointEntrer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            test: false

        }
    }

    componentDidMount(){
        if(localStorage.getItem('token')){
            
            this.setState({
                test:true
            })
            console.log("point d entrer",this.state.test);
        }else{
            console.log("pas points d entrer",this.state.test);
            
        }
    }



    render() {
        return (
            <div>
                {this.state.test?<div><Dash/></div>:<div><Nav/></div>}      
            </div>
        )
    }
}
