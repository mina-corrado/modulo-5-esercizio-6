import React from "react";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import { SingleBook } from "./SingleBook";
import { CommentArea } from './CommentArea';

export class BookList extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            filter: '',
            selected: '',
        }
    }
    cambiaSelected = (asin) => {
        console.log("book ", asin);
        this.setState({...this.state, selected: asin});
    }
    render() {
        const books = this.props.books;
        const query = this.props.query;
        const state = this.state;
        
        return (
            <Container className='h-100'>
                <Row className='h-100' style={{overflow: 'hidden'}}>
                <Col xs={8} className='h-100' style={{overflowY: 'scroll'}}>
                    <React.Fragment>
                        <hr />
                        <label className="d-flex flex-column mb-4 p-4">
                            <strong>Filtra libri:</strong>
                            <input type="text" id="filtra" name="filtra"  value={query} onChange={(e) => this.setState({filter: e.target.value})} placeholder="filtra libri che contengono nel titolo..."/>
                        </label>
                        <Row xs={1} sm={2} md={2} lg={4} className="g-4 ml-0 mr-0">
                        {
                        books.filter((book) => query!=='' ? book.title.toLowerCase().includes(query.toLowerCase()) : true).map((book) => {
                            return (
                                <Col key={book.asin} className="mb-2">
                                    <SingleBook book={book} cambiaSelected={this.cambiaSelected} selected={state.selected===book.asin}></SingleBook>
                                </Col>
                            )
                        })
                        }
                        </Row>
                    </React.Fragment>
                </Col>
                <Col className='h-100' style={{overflowY: 'auto'}}>
                    {state.selected.length > 0 &&
                        <CommentArea asin={state.selected} />
                    }
                </Col>
                </Row>
            </Container>
        );
    }
}