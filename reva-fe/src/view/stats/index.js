import React, {useState} from 'react';
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import ListGroup from 'react-bootstrap/ListGroup'
import axios from 'axios';


const Stats = () => {

    const [hash, setHash] = useState('');
    const [url, setUrl] = useState({
            "id": 0,
            "hash": "",
            "url": "",
            "visited": 0,
            "is_valid": true,
            "createdAt": "",
            "updatedAt": ""
        });
    const getUrl = () => {
        const value = hash.split('/').reverse()[0];
        axios.get(`/s/${value}`)
            .then(response => {
                setUrl(response.data);
                console.log(url)
            })
            .catch(err => {
                console.log(err);
            })
    };


    return (
        <div className='shorten-stats'>
            <Form.Label>Short Url</Form.Label>
            <InputGroup className="mb-3">
                <Form.Control id="short-url" aria-describedby="basic-addon3" value={hash}
                              onChange={(e) => setHash(e.target.value)}/>
                <InputGroup.Append>
                    <Button onClick={() => {
                        getUrl()
                    }}>Review</Button>
                </InputGroup.Append>
            </InputGroup>
            <ListGroup variant="flush">
                <ListGroup.Item>Visited: {url.visited}</ListGroup.Item>
                <ListGroup.Item>Created: {url.createdAt}</ListGroup.Item>
                <ListGroup.Item>URL: {url.url}</ListGroup.Item>
                <ListGroup.Item>Broken URL :{!url.is_valid.toString()}</ListGroup.Item>
            </ListGroup>
        </div>
    );

};

export default Stats;