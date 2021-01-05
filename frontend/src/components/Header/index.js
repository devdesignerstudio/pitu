import React from 'react';
import { Logo, HeaderContainer } from './styles';  

import Icon from '../../assets/icon.jpeg';

function Header(props){
    return (
    <>
        <HeaderContainer>
            <Logo src={Icon}  alt='Pitú - Seu Novo Encurtador de URL' />
            <h1>Pitú</h1>
            <p>{props.children}</p>
        </HeaderContainer>
    </>
    )
}

export default Header;