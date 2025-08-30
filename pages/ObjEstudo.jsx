import s from './ObjEstudo.module.css'
import SectionAulaEsquerda from "../Components/SectionAulaEsquerda";
import ProgressBar from "../Components/ProgressBar";
import ContentAula from "../Components/ContentAula";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
function ObjEstudo (props) {
    //proteção de rota
    const navigate = useNavigate();
    const [stoped, setStoped] = useState(false)
    const [etapaQ, setEtapaQ] = useState(false)
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
                if (Object.keys(props.aula.conteudo[0]).length <= 1){
                    navigate("/aula")
                }
            }
        }
        var aula = obj
        aula.conteudo[0].status = 100
        props.setEstudar(aula)

        var aula = obj
        aula.conteudo[0].status = 100
        props.setEstudar(aula)
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

    const [obj, setObj] = useState(props.aula)
    const [position, setPosition] = useState(0) //qual etapa estamos
    const [total, setTotal] = useState(obj.conteudo.length)

    async function passarSalvar () {
        //processo de salvamento no banco de dados

        if (position < total && stoped === false && position !== etapaQ) {
            //região do fetch, antes de somar o num

            setPosition(position + 1)

            var aula = obj
                aula.conteudo[position].status = 100
                props.setEstudar(aula)

              //  const data = {
             //       'token': JSON.parse(localStorage.getItem('token')),
               //     'obj': aula
               // }

                //await fetch(props.api + '/armazenaFeitos', {
                    //method: 'POST',
                    //headers: {
                   //     'Access-Control-Allow-Origin': '*',
                   //     'Content-Type': 'application/json' // Especifique o tipo de conteúdo como JSON
                    //},
                  //  body: JSON.stringify(data) // Converta o objeto em uma string JSON
           //     })
                   // .then((resp) => resp.json())
                 //   .then(function(data) {
                   //     let acert = data // saberemos se deu certo
                   //     console.log(acert)
                  //  })
                   // .catch(function(error) {
                 //       console.log(error);
                  //  });
        }
        else {
            //processo de saída
            console.log('aula encerrada')
        }
    }

    function voltar () {
        if (position >= 1) {
            setPosition(position - 1)
        }
    }


    return (
        <div className={s.todo} style={{backgroundColor: props.fundoCor[0], color: props.fundoCor[1]}}>
            <SectionAulaEsquerda></SectionAulaEsquerda>
            <div className={s.content}>
                <ProgressBar aula={obj}></ProgressBar>
                <ContentAula aula={obj} etapa={position} max={total} setEstudar={props.setEstudar} setStoped={setStoped} setEtapaQ={setEtapaQ}></ContentAula>
                <div className={s.btnAvancar}>
                    <button onClick={() => voltar()} className={s.voltar}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="41" height="30" viewBox="0 0 41 30"
                             fill="none">
                            <path
                                d="M39.4274 16.4142C40.2084 15.6332 40.2084 14.3668 39.4274 13.5858L26.6994 0.857864C25.9184 0.0768156 24.6521 0.0768156 23.871 0.857864C23.09 1.63891 23.09 2.90524 23.871 3.68629L35.1847 15L23.871 26.3137C23.09 27.0948 23.09 28.3611 23.871 29.1421C24.6521 29.9232 25.9184 29.9232 26.6994 29.1421L39.4274 16.4142ZM0 17H38.0132V13H0V17Z"
                                fill="white"/>
                        </svg>
                        Voltar
                    </button>
                    <button onClick={() => {
                        passarSalvar()
                    }}>Continuar
                        <svg xmlns="http://www.w3.org/2000/svg" width="41" height="30" viewBox="0 0 41 30"
                             fill="none">
                            <path
                                d="M39.4274 16.4142C40.2084 15.6332 40.2084 14.3668 39.4274 13.5858L26.6994 0.857864C25.9184 0.0768156 24.6521 0.0768156 23.871 0.857864C23.09 1.63891 23.09 2.90524 23.871 3.68629L35.1847 15L23.871 26.3137C23.09 27.0948 23.09 28.3611 23.871 29.1421C24.6521 29.9232 25.9184 29.9232 26.6994 29.1421L39.4274 16.4142ZM0 17H38.0132V13H0V17Z"
                                fill="white"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ObjEstudo