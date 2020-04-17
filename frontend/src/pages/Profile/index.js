import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import './style.css';

import logo from '../../assets/logo_nome.png';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi'

export default function Profile() {
    const [incidents, setIncidents] = useState([]);
    const history = useHistory();

    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');

    
    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId, 
            }
        }).then(response => {
            setIncidents(response.data);
        })
    }, [ongId]);

    async function handleDeleteIncident( id ) {
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            });

            setIncidents(incidents.filter( incident => incident.id !== id));
        } catch (err) {
            alert('deu erro ao deletar');
        }
    }

    function handleLogOut () {
        localStorage.clear();

        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={ logo } alt="PowerFitLogo" size={200} />
                <span>Bem-vindo, {ongName}.</span>

                <Link className="button" to='/incidents/new'>
                Cadastrar novo caso
                </Link>
                <button onClick = { handleLogOut } type="button">
                <FiPower size={18} color="#e02041" />
                </button>
            </header>
            <h1>Casos cadastrados</h1>

            <ul>
                {incidents.map( incident => (
                    <li key={incident.id}>
                    <strong>Caso:</strong>
                    <p>{incident.title}</p>

                    <strong>DEscrição:</strong>
                    <p>{incident.description}</p>

                    <strong>Valor:</strong>
                    <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

                    <button onClick = {() => handleDeleteIncident(incident.id)} type="button">
                        <FiTrash2 size={20} color="#a8a8b3"/>
                    </button>
                </li>
                ))}
            </ul>
        </div>
    );
}