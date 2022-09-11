import React from 'react';
import Squared from '../../components/Squared/Squared';
import Waves from '../../components/Waves/Waves';
import LoginGoogle from '../../components/Login/LoginGoogle';
import './LoginView.css';


const LoginView = () => {

    return (
        <div className="login-container">
            <div className="unauthorized-container">
                <Waves>
                    <Squared>
                        <h2 className="squared-title">Bienvenido !</h2>
                        <p className="squared-description">Para poder visualizar la documentación, es necesario autenticarse.</p>
                        <LoginGoogle classButton='squared-button-effect squared-button'>
                            INICIAR SESIÓN
                        </LoginGoogle>
                    </Squared>
                </Waves>
            </div>
        </div>
    );
};

export default LoginView;