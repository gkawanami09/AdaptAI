import style from './Config.module.css'
import {useEffect, useState} from "react";
import InputCadastro from "./InputCadastro";
import s from "../pages/LoginSite.module.css";
import {Link, redirect, useNavigate} from "react-router-dom";
import BtnSubmit from "./BtnSubmit";
function Config({tema, setTema, tamanho, setTamanho, setFundoCor, mudarCarac}){
    const navigate = useNavigate()
    const [claro, setClaro] = useState({})
    const [escuro, setEscuro] = useState({})

    useEffect(() => {
        if (tema == "claro"){
            setClaro({background: "#06D6A0", color: "white", borderRadius: '8px'})
            setEscuro({})
            var color = ['#fff', '#000']
            setFundoCor([...color])

            mudarCarac('claro', 'tema')
        }else if (tema == "escuro"){
            setEscuro({background: "#06D6A0", color: "white", borderRadius: '8px'})
            setClaro({})
            var color = ['#2F2F2F', '#fff']
            setFundoCor([...color])

            mudarCarac('escuro', 'tema')
        }
    }, [tema]);

    function mudaSlider(event){
        setTamanho(event.target.value)
    }

    function mudaRadio(event){
        let texto = event.target.innerHTML
        setTema(texto.toLowerCase())
    }

    return(
        <div className={'mx-3 mx-md-5'}>
            <h1 className={"fw-bold"}>Acessibilidade</h1>
            <div className={style.configGrid + " my-4"}>
                <div className={"d-flex justify-content-center align-items-center flex-column m-3"}>
                    <h4>Tema</h4>
                    <div className={style.radioTudo + " shadow"}>
                        <button className={style.btn} style={claro} onClick={mudaRadio}>Claro</button>
                        <button className={style.btn} style={escuro} onClick={mudaRadio}>Escuro</button>
                    </div>
                </div>
            </div>
            <div className={'d-flex flex-column'} style={{width: "fit-content"}}>
                <h1 className={"fw-bold"}>Conta</h1>
                <button className={style.btn2 + ' m-4'} onClick={() => navigate('/alteraEmail')}>Alterar E-mail</button>
                <button className={style.btn2 + ' m-4'} onClick={() => navigate('/recuperar')}>Alterar senha</button>
            </div>
        </div>
    )
}

export default Config