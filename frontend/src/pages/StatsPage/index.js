import React from 'react';
import Header from '../../components/Header';
import { Container } from 'react-bootstrap';

import ShortenerService from '../../services/shortenerService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { StatsContainer, StatsRow, StatsBox, StatsBoxTitle } from './styles';

import { parseISO, formatRelative } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

class StatsPage extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            isLoading: false,
            shortenedURL: {},
            errorMsg: '',
        }
    }

    async componentDidMount(){
        const {code} = this.props.match.params;

        try {
            const service = new ShortenerService();
            const shortenedURL = await service.getStats(code);

            const parsedDate = parseISO(shortenedURL.updatedAt);
            const currentDate = new Date();

            const relativeDate = formatRelative(parsedDate, currentDate, { locale: ptBR, });

            shortenedURL.relativeDate = relativeDate;

            this.setState( { isLoading: false, shortenedURL } )
        } catch (error) {
            this.setState ( { isLoading: false, errorMsg: 'Ops, a URL solicitada não existe.'
            });
        }
    }

    render() {
        const { errorMsg, shortenedURL } = this.state;
        return (
            <Container>
                <Header>Estatísticas</Header>
                {errorMsg ? (
                    <StatsContainer className="text-center">
                        <FontAwesomeIcon size="3x" color="#f8d7da" icon="exclamation-triangle" />
                        <p className="mb-3">{errorMsg}</p>
                        <a className="btn btn-primary" href="/">Encurtar nova URL</a>
                    </StatsContainer>
                ) : (
                    <StatsContainer className="text-center">
                        <p><b>https://pitu.tk/{shortenedURL.code}</b></p>
                        <p>Redireciona para: <br />{shortenedURL.url}</p>
                        <StatsRow>
                            <StatsBox>
                                <b>{shortenedURL.hits}</b>
                                <StatsBoxTitle>Visitas</StatsBoxTitle>
                            </StatsBox>
                            <StatsBox>
                                <b>{shortenedURL.relativeDate}</b>
                                <StatsBoxTitle>Última visita</StatsBoxTitle>
                            </StatsBox>
                        </StatsRow>
                        <a className="btn btn-primary">Encurtar nova URL</a>
                    </StatsContainer>
                ) }
            </Container>
        )
    }
}

export default StatsPage;