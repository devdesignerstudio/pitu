import React from 'react';
// import { Container } from 'react-bootstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Header from '../../components/Header';
import { Container, InputGroup, FormControl, Button, Alert, Spinner } from 'react-bootstrap';
import { ContentContainer, Form, AdsBlock } from './styles';
import ShortenerService from '../../services/shortenerService';

class HomePage extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            isLoading: false,
            url: '',
            code: '',
            errorMsg: '',
        }
    }

    handleSubmit = async(event) => {
        event.preventDefault();

        const { url } = this.state;

        this.setState( {isLoading: true, errorMsg: ''} )

        if(!url){
            this.setState( {isLoading :false, errorMsg: 'Informe um URL para encurtar.' } )
        }else
        {
            try {   
                const service = new ShortenerService();
                const result = await service.generate( { url } );

                this.setState({ isLoading: false, code: result.code })
            }catch (error){
                this.setState({ isLoading: false, errorMsg: 'Ops, ocorreu um erro ao tentar encurtar a URL.' })
            }
        }
    }

    copyToClipboard = () => {
        const element = this.inputURL;
        element.select();
        document.execCommand('copy');
    }

    render() {
        const { isLoading, errorMsg, code } = this.state;
        return (
            <Container>
                <Header>Seu novo encurtador de URL. ;)</Header>
                <ContentContainer>
                    <Form onSubmit={this.handleSubmit}>
                        <InputGroup className="mb-3">
                            <FormControl
                            placeholder="Digite uma url para encurtar"
                            defaultValue=""
                            onChange={e => this.setState({
                                url: e.target.value
                            })} />
                            <InputGroup.Append>
                                <Button variant="primary" type="submit">Encurtar</Button>
                            </InputGroup.Append>
                        </InputGroup>
                        {
                            isLoading ? (
                                <Spinner animation="border" />
                            ) : (
                                code && (
                                    <>
                                        <InputGroup className="mb-3">
                                            <FormControl
                                            autoFocus={true}
                                            defaultValue={`https://pitu.tk/${code}`}
                                            ref={(input) => this.inputURL = input} />
                                            <InputGroup.Append>
                                                <Button variant="outline-secondary" onClick={() => this.copyToClipboard()}>Copiar</Button>
                                            </InputGroup.Append>
                                        </InputGroup>
                                        <p>Para acompanhar as estatísticas, acesse https://pitu.tk/{code}/stats </p>
                                    </>
                                )
                            )}
                            {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
                    </Form>
                </ContentContainer>
                <ContentContainer>
                    <AdsBlock>Google Adsense</AdsBlock>
                </ContentContainer>
            </Container>
        )
    }
}

export default HomePage;