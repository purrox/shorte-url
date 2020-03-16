import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup';
import axios from 'axios';
import { useForm } from 'react-hook-form'

import './index.css';

const Home = () => {

    const shortURl = async (data) =>{
        setShortedURL('');
        axios.post('/shorten', data)
            .then(function (response) {
                const {shorten, exist} = response.data;
                setShortedURL(shorten);
                setInvalidUrl(exist);
            })
            .catch(function (error) {
                const {status, data} = error.response;
                if(status === 422){
                    const messages = data.errors.map( e => `${e.msg} \n`);
                    setError("url", "invalidData", messages.join(""));
                }else{
                    setError("url", "invalidData", data.message);
                }

            });
    };

    const { register, handleSubmit, errors, setError } = useForm();
    const [shortedURL, setShortedURL] = useState('');
    const [invalidUrl, setInvalidUrl] = useState(true);

    const onSubmit = data => {shortURl(data) }


    return (
        <>
            <Form className='shorten-form' onSubmit={handleSubmit(onSubmit)}>
                <Row className="justify-content-md-center">
                    <Col md="6">
                        <Form.Label>Original Url</Form.Label>
                        <Form.Group controlId="forUrl">
                            <Form.Control
                                type="text"
                                name='url'
                                ref={register({
                                    required:{value:true, message:"Well, What do you think? Yeah I'm required."},
                                    pattern: {value:/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/, message: 'Are you sure this is a valid value?'}
                                })}
                                onChange={()=>setInvalidUrl(true)}
                            />
                            {errors.url && <span className='error'>{errors.url.message}</span>}
                            {!invalidUrl && <span className="warning">Looks like you’ve put a broken link or entered a URL that doesn’t exist.</span>}
                        </Form.Group>

                    </Col>
                    <Col md="auto">
                        <Form.Label></Form.Label>
                        <Form.Group controlId="forSubmit">
                            <Button className='submit-shorten' type="submit">Shorten</Button>
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
            <div className='shorten-result'>
                <Form.Label>Shortened Url</Form.Label>
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon3">
                           Result
                        </InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control id="basic-url" aria-describedby="basic-addon3" value={shortedURL} />
                    <InputGroup.Append>
                        <Button onClick={()=>{window.open(shortedURL, '_blank')}}>Go</Button>
                    </InputGroup.Append>
                </InputGroup>
            </div>
        </>
    )
};

export default Home;