import s from './SectionDashDireita.module.css'
import {useState} from "react";
import SectionAulaEsquerda from "./SectionAulaEsquerda";
import Grafico from "./Grafico";
import DashProgresso from "./DashProgresso";
function SectionDashDireita(props){
    return(
        <div className={s.divdashdireita}>
            <div className={s.titulo}>
                <h1>Progresso</h1>
            </div>
            <div className={s.divInfos}>
                <Grafico semana={props.semana}></Grafico>
                <DashProgresso progresso={props.progesso}></DashProgresso>
            </div>
        </div>
    )
}

export default SectionDashDireita