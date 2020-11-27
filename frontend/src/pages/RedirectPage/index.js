import React from 'react';
import Header from '../../components/Header';
import { Container } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ShortenerService from '../../services/shortenerService';

import { RedirectContainer } from './styles';

class RedirectPage extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            isLoading: false,
            url: '',
            errorMsg: '',
        }
    }

    async componentDidMount(){
        const { code } = this.props.match.params;

        try {
            const service = new ShortenerService();
            const { url } = await service.getLink(code);

            window.location = url;
    
        } catch (error) {
        this.setState ( {
            isLoading: false,
            errorMsg: 'Ops, a URL solicitada não existe!',
        } )        
        }
    }

    render() {
        const { errorMsg } = this.state;

        return (
            <Container>
                {errorMsg ? (
                    <>
                    <Header>
                        Seu novo encurtador de URLs. ;)
                    </Header>
                    <RedirectContainer className="text-center">
                        <FontAwesomeIcon size="3x" color="#f8d7da" icon="exclamation-triangle" />
                        <p className="m-3">{errorMsg}</p>
                        <a className="btn btn-primary" href="/">Encurtar nova URL</a>
                    </RedirectContainer>
                    </>
                ) : (
                    <p className="text-center">Redirecionando...</p>
                ) }
            </Container>
        )
    }
}

export default RedirectPage;