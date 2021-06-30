import React, { Component } from 'react'
import { Card,ListGroup,ListGroupItem } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

export class Movie extends Component {
    render() {
        return (
            <div>
                
                {
                    
                    this.props.movie.map(value=>{
                        return (
                            <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={value.imageUrl} />
                                <Card.Body>
                                <Card.Title> {value.title} </Card.Title>
                                <Card.Text>
                                overview : {value.overview} 
                                </Card.Text>
                                <ListGroup className="list-group-flush">
                                    <ListGroupItem>Popularity: {value.popularity}</ListGroupItem>
                                    <ListGroupItem>Release Date : {value.releasedOn}</ListGroupItem>
                                    <ListGroupItem>Total Vote {value.totalVotes}</ListGroupItem>
                                    </ListGroup>
                                </Card.Body>
                            </Card>
                        )
                    })

                }


            </div>
        )
    }
}

export default Movie

