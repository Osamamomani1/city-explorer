import React, { Component } from 'react'
import axios from 'axios'
import { Card,ListGroup } from 'react-bootstrap';
import Weather from './components/Weather';


export class App extends Component {

  constructor(props){
    super(props);
    this.state={
      displayName:'',
      longitude:'',
      latitude:'',
      errormsg: '',
      error:false,
      show:false,
      weather: false,
      weatherInfo: {},
    }
  }
  
  nameHandler=(e)=>{
    this.setState({
      displayName: e.target.value,
      
    })
  }

  submitData=async (e)=>{
    e.preventDefault()
    let serverRoute = process.env.REACT_APP_SERVER;
    let weatherUrl = `${serverRoute}/weather?city_name=${this.state.displayName.toLowerCase()}`;
    try{ 
      let axiosData= await axios.get(`https://eu1.locationiq.com/v1/search.php?key=pk.e266821f0ad39e21a46098fffe81ff92&city=${this.state.displayName}&format=json`)
     
      let weatherAxios = await axios.get(weatherUrl);
    this.setState({
      displayName: axiosData.data[0].display_name,
      longitude: axiosData.data[0].lon,
      latitude: axiosData.data[0].lat, 
      show: true,
      weatherInfo: weatherAxios.data,
      weather: true,
      
    })
    }
    catch(errormsg){
      this.setState({
        errormsg: 'error": "Unable to geocode',
        error: true,
        weather: false,
      })
    }
  }
  render() {
    return (
      <div>

        

        <form onSubmit={(e)=>{this.submitData(e)}}>
          <input type="text" placeholder="city name.." onChange={(e)=>{this.nameHandler(e)}} />
          <button>Explore!</button>
        </form>

       {(this.state.show) &&

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

        {this.state.weather &&
        <Weather
        weather={this.state.weatherInfo}
        cityName= {this.state.display_name}
        />
        }

        {(this.state.error) &&
        
        <h1>{this.state.errormsg}</h1>
        
        }
        
      </div>
    )
  }
}

export default App
