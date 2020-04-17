import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi'

import './style.css';

import api from '../../services/api';

import logo from '../../assets/logo.png';

export default function Logon(){
const [id, setId] = useState('');
const history = useHistory();

async function handleLogin(e){
    e.preventDefault();

    try {
        const response = await api.post('sessions', { id })

        localStorage.setItem('ongId', id);
        localStorage.setItem('ongName', response.data.name);

        history.push('/profile');
    } catch (err) {
            alert('deu erro no login');
    }
}

    return(
        <div className="logon-container">
            <section className="form">

                <form onSubmit = { handleLogin }>
                    <h1>Entrar</h1>

                    <input 
                    placeholder="Usuário"
                    value = {id}
                    onChange = {e=> setId(e.target.value)}
                    />
                    <button type="submit" className="button">Entrar</button>
                    
                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#e02041" />
                        Não tenho cadastro
                    </Link>
                </form>
            </section>

            <img src={logo} alt=""/>
        </div>
    );
}