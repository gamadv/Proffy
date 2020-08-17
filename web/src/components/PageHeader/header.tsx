import React from 'react'
import { Link } from 'react-router-dom'


import logoImg from '../../assets/images/logo.svg'
import backIcon from '../../assets/images/icons/back.svg'

import './headerST.css'

interface HeaderProps {
    title: string;
    desc?: string
}

const Header: React.FC<HeaderProps> = (props) => {

    return (
        <header className="page-header">
            <div className="top-bar-container">
                <Link to="/">
                    <img src={backIcon} alt="Voltar" />
                </Link>
                <img src={logoImg} alt="Proffy" />
            </div>

            <div className="header-content">
                <strong> {props.title}</strong>
                {props.desc && <p>{props.desc}</p>}
                {props.children}
            </div>
        </header>
    )
}

export default Header