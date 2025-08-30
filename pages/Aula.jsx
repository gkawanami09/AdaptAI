import s from './Aula.module.css'
import SectionAulaEsquerda from "../Components/SectionAulaEsquerda";
import SectionAulaDireita from "../Components/SectionAulaDireita";
import { useNavigate } from "react-router-dom";
import {useEffect, useState} from "react";
import Charger from "../Components/Charger";
function Aula (props) {
    const [listAula, setListAula] = useState([])
    const [charger, setCharger] = useState('none')
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
            else {
                const data = {
                    'token': JSON.parse(localStorage.getItem('token')).key
                }
                fetch(props.api + '/verificaToken', {
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
                        if (acert.status !== true) {
                            localStorage.removeItem('token')
                            navigate("/login")
                        }
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
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

    async function carregaAula (){
        setCharger('block')
        const data = {
            'token': JSON.parse(localStorage.getItem('token'))
        }

        await fetch(props.api + '/aula', {
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
                if (acert.status === true){
                    var aux = [...acert.resp]
                    setListAula(aux)
                }
                else {
                    console.log(acert.status)
                }
            })
            .catch(function(error) {
                console.log(error);
            });
        setCharger('none')
    }

    useEffect(() => {
        carregaAula()
    }, []);

    return (
        <main className={s.main} style={{backgroundColor: props.fundoCor[0], color: props.fundoCor[1]}}>
            <Charger charge={charger}></Charger>
            <SectionAulaEsquerda></SectionAulaEsquerda>
            <SectionAulaDireita nome={1} aula={listAula} setEstudar={props.setEstudar} titulo={'Aulas de hoje'} type={'aula'}></SectionAulaDireita>
        </main>
    )
}

export default Aula