import React from 'react';
import { AddComment } from './AddComment';
import { CommentList } from './CommentList';

export class CommentArea extends React.Component {

    constructor(props){
        super(props);
        this.state ={
            recensioni: [],
            fetchError: false,
            loading: true,
        }

        this.headers = {
            headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2YyOGVhNzgzODFmYzAwMTNmZmZhYzUiLCJpYXQiOjE2NzY4NDA2MTUsImV4cCI6MTY3ODA1MDIxNX0.xQLyqBBQzaKRQHY89rN2KeekWD6uSa2XAqa0SFuoVAI",
            "Content-Type": "application/json"
            }
        }
    }
    getCommenti = () => {
        // pulisci headers
        this.headers["method"] = 'GET';
        delete this.headers["body"];
        
        fetch(`https://striveschool-api.herokuapp.com/api/comments/${this.props.asin}`, this.headers).then(res=>res.json())
        .then(res=>{
            //gestione success
            //caricamento
            this.setState({recensioni: res, loading: false})
        }, (err)=>{
            //gestione errore
            this.setState({fetchError: true, loading: false})
            console.log(err);
        })
    }
    componentDidMount() {
        //dopo che il component è stato renderizzato
        this.getCommenti();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.asin !== this.props.asin) {
            this.getCommenti();
        }
    }

    render() {
        const state = this.state;

        return (
            <>
                <CommentList recensioni={state.recensioni} />
                <AddComment headers={this.headers} url={`https://striveschool-api.herokuapp.com/api/comments/`} elementId={this.props.asin}></AddComment>
            </>
        );
    }
}
