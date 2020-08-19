import React, { Component } from 'react';
import c1 from '../../asserts/wallpaper/c1.jpg'; 
import c2 from '../../asserts/wallpaper/c2.jpg'; 
import c3 from '../../asserts/wallpaper/c3.jpg'; 
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
                <div id="carousel" class="carousel slide" data-ride="carousel" style={{marginTop:'1rem'}}>
                <div class="carousel-inner">
                    <div style={{height:'200px',overflow:'hidden'}} class="carousel-item active">
                    <img class="d-block" height="400px" width="1200" src={c2} alt="First slide"/>
                    </div>
                    <div style={{height:'200px',overflow:'hidden'}} class="carousel-item">
                    <img class="d-block" height="400px" width="1200" src={c1} alt="Second slide"/>
                    </div>
                    <div style={{height:'200px',overflow:'hidden'}} class="carousel-item">
                    <img class="d-block" height="400px" width="1200" src={c3} alt="Third slide"/>
                    </div>
                </div>
                <a class="carousel-control-prev" href="#carousel" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carousel" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a>
                </div>

         );
    }
}
 
export default Home;