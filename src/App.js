import React, { Component } from 'react'
import axios from 'axios'
import { Card,ListGroup,Form,Row,Col,Button } from 'react-bootstrap';
import Weather from './components/Weather';
import Movie from './components/Movie';


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
      movieInfo: {},

    }
  }
  
  nameHandler=(e)=>{
    this.setState({
      displayName: e.target.value,
      
    })
  }
  //http://localhost:8000/movies?city_name=amman
  //http://localhost:8000/weather?name=mosco
  submitData=async (e)=>{
    e.preventDefault()
    let serverRoute = process.env.REACT_APP_SERVER;
    let weatherUrl = `${serverRoute}/weather?name=${this.state.displayName.toLowerCase()}`;
    let movieUrl= `${serverRoute}/movies?city_name=${this.state.displayName.toLowerCase()}`
    try{ 
      let axiosData= await axios.get(`https://eu1.locationiq.com/v1/search.php?key=pk.e266821f0ad39e21a46098fffe81ff92&city=${this.state.displayName}&format=json`)
     
      let weatherAxios = await axios.get(weatherUrl);

      let movieAxios = await axios.get(movieUrl);
    this.setState({
      displayName: axiosData.data[0].display_name,
      longitude: axiosData.data[0].lon,
      latitude: axiosData.data[0].lat, 
      show: true,
      weatherInfo: weatherAxios.data,
      movieInfo: movieAxios.data,
      weather: true,
      error: false,
      
    })
    // let localweatherApi= axios.get(`${process.env.REACT_APP_SERVER}/weather?lat=${this.state.latitude}&lon=${this.state.longitude}`)
    // console.log(localweatherApi);
    }
    catch(errormsg){
      this.setState({
        errormsg: 'error": "Unable to geocode',
        error: true,
        weather: false,
        show : false,
      })
    }
    e.target.reset();
  }
  render() {
    return (
      <div>
 <Form onSubmit={(e)=>{this.submitData(e)}}>
  <Row className="align-items-center">
    <Col xs="auto">
      <Form.Control onChange={(e)=>{this.nameHandler(e)}}
        className="mb-2" 
        id="inlineFormInput"
        placeholder="city name.."
      />
      </Col>
    <Col xs="auto">
        <Button type="submit" className="mb-2">
        Explore
      </Button>
      </Col>
      </Row>
    </Form>

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


        {this.state.weather &&
        <Movie
        movie={this.state.movieInfo}
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
