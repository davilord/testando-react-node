import React, { useState } from 'react';
import './style.css';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import logo from '../../assets/logo_nome.png'

import api from '../../services/api';

export default function Register() {
    const [ name, setName] = useState('');
    const [ email, setEmail] = useState('');
    const [ whatsapp, setWhatsapp] = useState('');
    const [ city, setCity] = useState('');
    const [ uf, setUF] = useState('');

    const history = useHistory();


    async function handleRegister(e){
        e.preventDefault();

        const data = {
            name,
            email,
            whatsapp,
            city,
            uf,
        };
        try {
        const response = await api.post('ongs', data);

        alert(`id: ${response.data.id}`);

        history.push('/');
        } catch (err) {
            alert('erro no cadastro, mano');
        }
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logo} alt=""/>
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro</p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#e02041" />
                        Não tenho cadastro
                    </Link>
                </section>

                <form onSubmit={handleRegister}>
                    <input placeholder="nome"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    />
                    <input type="email" 
                    placeholder="email" 
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    />
                    <input placeholder="whatsapp" 
                    value={whatsapp}
                    onChange={e => setWhatsapp(e.target.value)}
                    />

                    <div className="input-group">
                        <input placeholder="Cidade"
                        value={city}
                        onChange={e => setCity(e.target.value)}
                        />
                        <input placeholder="UF" 
                        style={{ width: 80 }} 
                        value={uf}
                        onChange={e => setUF(e.target.value)}
                        />
                    </div>

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}