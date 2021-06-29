import React, { Component } from 'react'
import { Table } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

export class Weather extends Component {
    render() {
        return (
            <div>
               
               <Table style={{ width: '45rem' }}  bordered hover>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>

                        <tr>
                            <td>{this.props.weather[0].date}</td>
                            <td>{this.props.weather[0].description}</td>
                        </tr>
                        <tr>
                            <td>{this.props.weather[1].date}</td>
                            <td>{this.props.weather[1].description}</td>
                        </tr>     <tr>
                            <td>{this.props.weather[2].date}</td>
                            <td>{this.props.weather[2].description}</td>
                        </tr>
                     
                    </tbody>
                </Table> 
            </div>
        )
    }
}

export default Weather
