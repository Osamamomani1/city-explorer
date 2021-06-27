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
    }
  }
  
  nameHandler=(e)=>{
    this.setState({
      displayName: e.target.value
    })
  }

  submitData=async (e)=>{
    e.preventDefault()
    let axiosData= await axios.get(`https://eu1.locationiq.com/v1/search.php?key=pk.e266821f0ad39e21a46098fffe81ff92&city=${this.state.displayName}&format=json
    
    `)
    this.setState({
      displayName: axiosData.data[0].display_name,
      longitude: axiosData.data[0].lat,
      latitude: axiosData.data[0].lon,
    })
   console.log(axiosData.data);
  }
  render() {
    return (
      <div>
        <form onSubmit={(e)=>{this.submitData(e)}}>
          <input type="text" placeholder="city name.." onChange={(e)=>{this.nameHandler(e)}} />
          <button>Explore!</button>
        </form>

        <Card style={{ width: '18rem' }}>
        <ListGroup variant="flush">
        <ListGroup.Item>city:  <h2>{this.state.displayName}</h2></ListGroup.Item>
        <ListGroup.Item>longitude:  <h2>{this.state.longitude}</h2></ListGroup.Item>
        <ListGroup.Item>latitude:  <h2>{this.state.latitude}</h2></ListGroup.Item>
        </ListGroup>
        </Card>
      </div>
    )
  }
}

export default App
