import React, { Component } from 'react';
class Loading extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( <h1 style={{position:'absolute',top:'50%',left:'50%'}} ><i class="fa fa-spinner fa-spin"></i></h1> );
    }
}
 
export default Loading;