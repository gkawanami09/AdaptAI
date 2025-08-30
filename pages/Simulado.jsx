import s from "./Simulado.module.css"
import SectionAulaEsquerda from "../Components/SectionAulaEsquerda";
import {useEffect, useState} from "react";
import {json, useNavigate} from "react-router-dom";
import SimuladoGenerator from "../Components/SimuladoGenerator";
import Charger from "../Components/Charger";
import Certeza from "../Components/Certeza";
function Simulado (props) {
    const navigate = useNavigate();
    const [charger, setCharger] = useState('block')
    const [gerar, setGerar] = useState([])
    const [respList, setRespList] = useState([])
    const [preencher, setPreencher] = useState([])
    const [posicao, setPosicao] = useState(0)
    const [certeza, setCerteza] = useState('none')
    const [final, setFinal] = useState(false)
    const [certo, setCerto] = useState([])
    const [pontos, setPontos] = useState(0)
    const [revision, setRevision] = useState(false)

    useEffect(() => {
        if (props.simular === false) {
            navigate('/simulados')
        }
        else {
            trazerQuest()
        }
    }, []);

    async function trazerQuest () {
        const data = {
            'token': JSON.parse(localStorage.getItem('token')),
            'id': props.simular.id
        }

        await fetch(props.api + '/trazerQuest', {
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
                let aux = acert.resp
                setGerar([...aux])
                setRespList([...gerarLista(acert.resp)])
            })
            .catch(function(error) {
                console.log(error);
            });
        setCharger('none')
    }

    function gerarLista(lisDeObj) {
        var principalLista = []
        var auxList = []

        for (var i = 0; i < lisDeObj.length; i++) {
            for (var j = 0; j < lisDeObj[i].conteudo.resposta.length; j++)  {
                auxList.push(s.normal)
            }
            principalLista.push(auxList)
            auxList = []
        }

        return principalLista
    }

    function direita () {
        var aux = posicao
        aux++

        if (aux < gerar.length) {
            setPosicao(aux)
        }
    }

    function esquerda () {
        var aux = posicao
        aux--

        if (aux >= 0) {
            setPosicao(aux)
        }
    }

    function enviado () {
        let listaAcertos = certo
        let pp = 0
        let respondido = false
        let cont = 0
        let fList = respList

        for (var i = 0; i < respList.length; i++) {
            for (var j = 0; j < respList[i].length; j++){
                if (respList[i][j] !== undefined) {
                    pp = j
                    respondido = true
                    break
                }
            }
            if (respondido) {
                if (gerar[i].conteudo.resposta[pp].status === 200) {
                    listaAcertos.push('certo')
                    cont++
                }
                else {
                    listaAcertos.push('errado')
                }
            }
            else {
                listaAcertos.push('branco')
            }
            respondido = false
        }

        //gerando lista final mostrando erros e acertos
        for (var i = 0; i < fList.length; i++){
            if (listaAcertos[i] === 'certo') {
                for (var j = 0; j < fList[i].length; j++) {
                    if (fList[i][j] !== undefined) {
                        fList[i][j] = s.correto
                        break
                    }
                }
            }
            else if (listaAcertos[i] === 'errado') {
                for (var j = 0; j < fList[i].length; j++) {
                    if (fList[i][j] !== undefined) {
                        fList[i][j] = s.errado
                    }
                    else if (gerar[i].conteudo.resposta[j].status === 200) {
                        fList[i][j] = s.correto
                    }
                }
            }
            else {
                for (var j = 0; j < fList[i].length; j++) {
                    if (gerar[i].conteudo.resposta[j].status === 200) {
                        fList[i][j] = s.corretoBranco
                    }
                }
            }
        }

        setRespList([...fList])
        setCerto([...listaAcertos])
        setCerteza('none')
        setFinal(true)
        setPontos(cont)
    }

    //function pegarVal (e) {
    //    var aux = e - 1
    //    if (e < gerar.length) {
    //        setPosicao(aux)
    //    }
    //}

    //<Charger charge={charger}></Charger>
    //<SimuladoGenerator gerado={gerar} posicao={posicao}></SimuladoGenerator>
    //simular
    return (
        <div className={s.todo} style={{backgroundColor: props.fundoCor[0], color: props.fundoCor[1]}}>
            <Certeza charge={certeza} setCerteza={setCerteza} enviado={enviado}></Certeza>
            {charger === 'block' ? <Charger charge={charger}></Charger> : final === true ?
                <div className={s.todo2}>
                    <SectionAulaEsquerda></SectionAulaEsquerda>
                    <div className={s.finalEntregar}>
                        <div className={s.finalInfos}>
                            <div className={s.finalTitle}>
                                <p>Atividade enviada</p>
                            </div>
                            <div className={s.finalImgDiv}>
                                <div className={s.finalImg}></div>
                            </div>

                        </div>
                        <div className={s.finalBtn}>
                            <div className={s.tbut}>
                                <p>Pontuação: {pontos}/{certo.length}</p>
                                <button className={s.btnFinal} onClick={() => {
                                    setFinal(false)
                                    setRevision(true)
                                }}>Revisar
                                </button>
                            </div>
                            <div className={s.finalContinue}>
                                <button className={s.btnFinal} onClick={() => {
                                    navigate('/simulados')
                                }}>Continuar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div className={s.todo}>
                    <SectionAulaEsquerda></SectionAulaEsquerda>
                    <SimuladoGenerator gerado={gerar} posicao={posicao} respList={respList} setRespList={setRespList}
                                       revision={revision} certo={certo}></SimuladoGenerator>
                    <div className={s.btns}>
                        <div className={s.controles}>
                            <div className={s.passaEsq}>
                                <button onClick={() => esquerda()}>Anterior</button>
                            </div>
                            <div className={s.infos}>
                                <p>Questão {posicao + 1} de {gerar.length}</p>
                            </div>
                        <div className={s.passaDir}>
                            <button onClick={() => direita()}>Próxima</button>
                        </div>
                    </div>
                    <div className={s.entregar}>
                        {revision === true ? <button onClick={() => {
                            navigate('/simulados')
                            } }>Voltar</button> :
                            <button onClick={() => setCerteza('block')}>Entregar</button>}
                    </div>
                </div>
                </div>}
        </div>
    )
}

export default Simulado