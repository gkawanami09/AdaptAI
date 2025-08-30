import style from './Perfil.module.css'
import SectionAulaEsquerda from "../Components/SectionAulaEsquerda";
import UserInfo from "../Components/UserInfo";
import Config from "../Components/Config";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import s from "./CadastroSite.module.css";

 function Perfil (props){
     //proteção de rota
     const navigate = useNavigate();
     useEffect(() => {
         if (localStorage.getItem('token') == null) {
             navigate("/login");
         }
         else {
             var token = localStorage.getItem('token')
             token = JSON.parse(token)
             var vencimento = token.down
             //console.log(((vencimento.getDate() )) + "/" + ((vencimento.getMonth() + 1)) + "/" + vencimento.getFullYear() )

             if (compareDates(vencimento)){
                 localStorage.removeItem('token')
                 navigate("/login")
             }
         }
     }, []);

     function compareDates (date) {
         let today = new Date()      // pega a data atual
         let hoje = Date.parse(today)
         let vencimento = Date.parse(date)

         if(hoje >= vencimento) {
             return true
         }
         else {
             return false
         }

     }
     //fim da proteção

     const [dados, setDados] = useState('')
     const [charger, setCharger] = useState('none')
     const [tamanho, setTamanho ] = useState('')
     const [tema, setTema] = useState('')

     useEffect(() => {
         infos()
     }, []);

     async function infos () {
         setCharger('block')
         const data = JSON.parse(localStorage.getItem('token'))
             await fetch(props.api + '/perfil', {
                 method: 'POST',
                 headers: {
                     'Access-Control-Allow-Origin': '*',
                     'Content-Type': 'application/json' // Especifique o tipo de conteúdo como JSON
                 },
                 body: JSON.stringify(data) // Converta o objeto em uma string JSON
             })
                 .then((resp) => resp.json())
                 .then(function(data) {
                     let acert = data // saberemos se deu certo

                     if (acert.status) {
                         setDados(acert.resp)
                         setTema(acert.resp.tema)
                         setTamanho(acert.resp.fonte)
                     }
                     else {
                         setCharger('none')
                         localStorage.removeItem('token')
                         navigate("/login")
                     }
                 })
                 .catch(function(error) {
                     console.log(error);
                 });
         setCharger('none')
     }

     async function mudarCarac (dado, campo) {
         const data = {
             'dado': dado,
             'campo': campo,
             'token': JSON.parse(localStorage.getItem('token'))
         }

         await fetch(props.api + '/changeConfig', {
             method: 'POST',
             headers: {
                 'Access-Control-Allow-Origin': '*',
                 'Content-Type': 'application/json' // Especifique o tipo de conteúdo como JSON
             },
             body: JSON.stringify(data) // Converta o objeto em uma string JSON
         })
             .then((resp) => resp.json())
             .then(function(data) {
                 let acert = data // saberemos se deu certo
             })
             .catch(function(error) {
                 console.log(error);
             });
     }

    return(
        <div className={'d-md-flex overflow-hidden'} style={{backgroundColor: props.fundoCor[0], color:props.fundoCor[1]}}>
            <div className={s.charge} style={{display: charger}}>
                <div className={s.alinhar}>
                    <div className={s.spinner}></div>
                </div>
                <div className={s.baixo}>

                </div>
            </div>
            <SectionAulaEsquerda></SectionAulaEsquerda>
            <div className={style.grid}>
                <UserInfo dados={dados} api={props.api}  fundoCor={props.fundoCor} ></UserInfo>
                <Config setTema={setTema} tema={tema} setTamanho={setTamanho} tamanho={tamanho} setFundoCor={props.setFundoCor} mudarCarac={mudarCarac}></Config>
            </div>
        </div>
    )
 }

export default Perfil