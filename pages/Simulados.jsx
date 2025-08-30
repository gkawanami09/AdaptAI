import s from './Simulados.module.css'
import SectionAulaEsquerda from "../Components/SectionAulaEsquerda";
import SectionAulaDireita from "../Components/SectionAulaDireita";
import {useEffect, useState} from "react";
import Charger from "../Components/Charger";
import {useNavigate} from "react-router-dom";
function Simulados (props) {
    const navigate = useNavigate();
    const [charger, setCharger] = useState('none')
    const [listSimu, setListSimu] = useState([])

    //segurança de rota
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

    // fim da proteção de rota

    async function carregaAula (){
        setCharger('block')
        const data = {
            'token': JSON.parse(localStorage.getItem('token'))
        }

        await fetch(props.api + '/simulado', {
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
                    setListSimu(aux)
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
        <div className={s.todo} style={{backgroundColor: props.fundoCor[0], color: props.fundoCor[1]}}>
            <Charger charge={charger}></Charger>
            <SectionAulaEsquerda></SectionAulaEsquerda>
            <SectionAulaDireita nome={1} aula={listSimu} titulo={'Simulados'} setEstudar={props.setEstudar} type={'simulado'}></SectionAulaDireita>
        </div>
    )
}

export default Simulados