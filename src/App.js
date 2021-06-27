import React, { Component } from 'react'
import axios from 'axios'
import { Card,ListGroup } from 'react-bootstrap';


export class App extends Component {

  constructor(props){
    super(props);
    this.state={
      displayName:'',
      longitude:'',
      latitude:'',
      error:false,
      show:true,
    }
  }
  
  nameHandler=(e)=>{
    this.setState({
      displayName: e.target.value,
      
    })
  }

  submitData=async (e)=>{
    e.preventDefault()
    let axiosData= await axios.get(`https://eu1.locationiq.com/v1/search.php?key=pk.e266821f0ad39e21a46098fffe81ff92&city=${this.state.displayName}&format=json
    
    `)
   
    this.setState({
      displayName: axiosData.data[0].display_name,
      longitude: axiosData.data[0].lon,
      latitude: axiosData.data[0].lat, 
      error:true,
      
      
    })
  //  if (axiosData.data) {
  //    this.setState({
       
  //    })
  //  }
  }
  render() {
    return (
      <div>



        <form onSubmit={(e)=>{this.submitData(e)}}>
          <input type="text" placeholder="city name.." onChange={(e)=>{this.nameHandler(e)}} />
          <button>Explore!</button>
        </form>

       {(this.state.error && this.state.longitude!=='') &&

        <Card style={{ width: '18rem' }}>
        <ListGroup variant="flush">
        <ListGroup.Item>city:  <h2>{this.state.displayName}</h2></ListGroup.Item>
        <ListGroup.Item>longitude:  <h2>{this.state.longitude}</h2></ListGroup.Item>
        <ListGroup.Item>latitude:  <h2>{this.state.latitude}</h2></ListGroup.Item>
        <Card.Img variant="top" src={`https://maps.locationiq.com/v3/staticmap?key=pk.e266821f0ad39e21a46098fffe81ff92
        &center=${this.state.latitude},${this.state.longitude}&zoom=12&format=png`} width='400px' height='300px' />
        </ListGroup>
        </Card>
      
        }

        {(!this.state.error && this.state.show) &&
        
        <h1>"error": "Unable to geocode"</h1>
        
        }
        
      </div>
    )
  }
}

export default App
