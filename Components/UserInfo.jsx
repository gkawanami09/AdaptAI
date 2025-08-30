import style from './UserInfo.module.css'
import {useEffect, useState} from "react";
import EditarPerfil from "./EditarPerfil";
function UserInfo(props){
    const [mostrar, setMostrar] = useState('none')
    function abrir(){
        setMostrar('block')
    }

    return (
        <div className={style.grid + " m-5"}>
            <div className={style.cinza} style={{display: mostrar}}></div>
            <EditarPerfil api={props.api} mostrar={mostrar} setMostrar={setMostrar} dados={props.dados} fundoCor={props.fundoCor} ></EditarPerfil>
            <div className={style.infoGrid}>
                <div className={'d-flex justify-content-end flex-column'}>
                    <h1 className={style.titulo}>{props.dados.nome}</h1>
                    <hr className={style.under}/>
                </div>
                <div className={'d-flex gap-4'}>
                    <p>{props.dados.curso} - {props.dados.universidade}</p>
                    <p>{props.dados.turma}</p>
                    <p className={style.link} onClick={abrir}><i className="fa-solid fa-pen-to-square"></i></p>
                </div>
            </div>
        </div>
    )
}

export default UserInfo