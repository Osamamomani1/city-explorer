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
                    
                    {

                        this.props.weather.map(value=>{
                            return(
                                <tr>
                            <td>{value.date}</td>
                            <td>{value.description}</td>
                            </tr>
                            )
                        })

                    }
                    </tbody>
                </Table> 
            </div>
        )
    }
}

export default Weather
