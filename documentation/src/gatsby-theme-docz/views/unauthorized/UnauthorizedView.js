import React from 'react';
import { useNavigate } from 'react-router-dom';
import Waves from '../../components/Waves/Waves';
import Squared from '../../components/Squared/Squared';
import LogoutGoogle from '../../components/Login/LogoutGoogle';

const UnauthorizedView = () => {
    const navigate = useNavigate();
    const handleGoBack = () => navigate(-1);

    return (
        <div className="unauthorized-container">
            <Waves>
                <Squared>
                    <h2 className="squared-title">Ups !</h2>
                    <p className="squared-description">Parece que tu cuenta no tiene acceso a este sitio.</p>
                    <LogoutGoogle classButton='squared-button-effect squared-button'>
                        CERRAR SESIÓN
                    </LogoutGoogle>
                </Squared>
            </Waves>
        </div>
    );
};


export default UnauthorizedView;