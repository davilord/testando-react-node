import React, { useState } from 'react';

import api from '../../services/api';

import './style.css';
import logo from '../../assets/logo_nome.png'
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

export default function NewIncident() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const history = useHistory();

    const ongId = localStorage.getItem('ongId');

    async function handleNewIncident(e) {
        e.preventDefault();

        const data = {
            title,
            description,
            value,
        };
        try {
            await api.post('incidents', data, {
                headers: {
                    Authorization: ongId
                }
            })

            history.push('/profile');
        } catch(err) {
            alert('erro ao cadastrar caso');
        }
    }

    return (
        <div className="new-incident-container">
        <div className="content">
            <section>
                <img src={logo} alt=""/>
                <h1>Cadastrar novo caso</h1>
                <p>descreva lalalala</p>

                <Link className="back-link" to="/profile">
                    <FiArrowLeft size={16} color="#e02041" />
                    Voltar para Home
                </Link>
            </section>

            <form onSubmit = {handleNewIncident}>
                <input 
                    placeholder="Titulo" 
                    title = {title}
                    onChange = {e => setTitle(e.target.value)}
                />
                <textarea 
                    placeholder="descricao" 
                    title = {description}
                    onChange = {e => setDescription(e.target.value)}
                />
                <input 
                    placeholder="valor em reais" 
                    title = {value}
                    onChange = {e => setValue(e.target.value)}
                />

                <button className="button" type="submit">Cadastrar</button>
            </form>
        </div>
    </div>
    );
}