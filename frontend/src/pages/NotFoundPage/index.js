import React from 'react';

class NotFoundPage extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            isLoading: false,
            url: '',
            errorMsg: '',
        }
    }

    render() {
        return (
            <p>Error 404 - Página não encontrada!</p>
        )
    }
}

export default NotFoundPage;