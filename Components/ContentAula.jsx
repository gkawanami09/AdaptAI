import s from './ContentAula.module.css'
import {useEffect, useState} from "react";
import Callnone from "./Callnone";
import {Link, useNavigate} from "react-router-dom";
import BtnIniciar from "./BtnIniciar";
function ContentAula (props) {
    const navigate = useNavigate();
    const [obj, setObj] = useState(props.aula)
    const [alpha, setAlpha] = useState(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'])
    const [checkedAlternative, setCheckedAlternative] = useState([])
    const [statusList, setStatusList] = useState([])
    const [formControl, setFormControl] = useState(-1)
    const [load, setLoad] = useState(false)
    const [chargeHt, setChargeHt] = useState(false)
    const [anteriorPoint, setAnteriorPoint] = useState([false, false])
    const [respondido, setRespondido] = useState(false)
    const [explicar, setExplicar] = useState('none')

    //function randomizer (lis) {
    //    console.log(lis)
    //    lis.sort(() => Math.random() - 0.5)
    //    console.log(lis)
    //    setRandomList(lis)
    //}

    useEffect(() => {
        esperar()
    }, []);

    async function esperar () {
       await process()
        setLoad(true)
    }

    function process () {
        var aux = []
        for (var i = 0; i < props.aula.conteudo.length; i++){
            var intermed = []
            if (props.aula.conteudo[i].type === 'question'){
                props.setEtapaQ(i)
                for (var j = 0; j < props.aula.conteudo[i].resposta.length; j++){
                    intermed.push('normal')
                }
                aux.push(intermed)
            }
        }
        setStatusList([...aux])
    }

    function check () {
        if (respondido === false){
            if (checkedAlternative[0].status === 200) {
                var aux = statusList
                aux[checkedAlternative[1]][checkedAlternative[2]] = s.corretc
                setStatusList([...aux])
            }
            else {
                var aux = statusList
                aux[checkedAlternative[1]][checkedAlternative[2]] = s.errado
                setStatusList([...aux])
            }

            setRespondido(true)
            setExplicar('block')
            props.setEtapaQ(false)
        }
    }

    function alteraStatus (index, listan) {
        if (respondido === false) {
            var aux = statusList

            if (anteriorPoint[0] !== false) {
                var listaAnt = anteriorPoint[0]
                var indexAnt = anteriorPoint[1]

                aux[listaAnt][indexAnt] = s.normal
            }

            setAnteriorPoint([listan, index])
            aux[listan][index] = s.pressed
            setStatusList([...aux])
        }
    }

    function onlibert (line, col) {
        if (chargeHt) {
            return statusList[line][col]
        }
        return s.normal
    }

    return (
        <div className={s.todo}>
            <div className={s.slider}
                 style={{left: 'calc(' + (props.etapa * 100 * -1).toString() + 'vw + ' + (props.etapa * 100).toString() + 'px)'}}>
                {obj.conteudo.map((item, index) => (
                    <div className={s.generated}>
                        {item.type == 'video' &&
                            <div className={s.vid}>
                                <div className={s.video}>
                                    <iframe
                                            src = {item.content}
                                            title="YouTube video player" frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            allowFullScreen>
                                    </iframe>
                                </div>
                                <div className={s.resumo}>
                                    <p className={s.title}>{item.title}</p>
                                    <p>{item.resumo}</p>
                                </div>
                            </div>
                        }

                        {item.type == 'text' &&
                            <div className={s.txt}>
                                <div className={s.folha}>
                                    <p className={s.title}>{item.title}</p>
                                    {item.content.map((cadTex, num) => (
                                        <div className={s.textarea}>
                                            {cadTex.type == 'text' && <p>{cadTex.content}</p>}
                                            {cadTex.type == 'img' && <img src={cadTex.content}/>}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        }

                        {item.type == 'question' &&

                            <div className={s.question}>
                                <Callnone val={formControl} setar={setFormControl} esperar={esperar} load={load} htt={false}></Callnone>
                                <div className={s.resume}>
                                    {item.quest.map((cadQ, num) => (
                                        <div className={s.textarea}>
                                            {cadQ.type == 'text' && <p>{cadQ.content}</p>}
                                            {cadQ.type == 'img' && <img src={cadQ.content}/>}
                                        </div>
                                    ))}
                                </div>
                                <form className={s.form}>
                                    {item.resposta.map((cadR, num) => (
                                        <label onClick={() => {
                                            setCheckedAlternative([cadR, formControl, num])
                                            alteraStatus(num, formControl)
                                        }} className={s.alternativa + ' ' + onlibert(formControl,num)}>
                                            <p className={s.ordenator}>{alpha[num]})</p>
                                            <p className={s.answer}>{cadR.alternativa}</p>
                                        </label>
                                    ))}
                                </form>
                                <button className={s.sendR} onClick={() => check()}>mandar respostas</button>

                                <div className={s.res} style={{display: explicar}}>
                                    {item.resumo.map((cadQ, num) => (
                                        <div className={s.resumir}>
                                            {cadQ.type == 'text' && <p>{cadQ.content}</p>}
                                            {cadQ.type == 'img' && <img src={cadQ.content}/>}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        }
                    </div>
                ))}
                <Callnone htt={true} setChargeHt={setChargeHt}></Callnone>
                <div className={s.finalizar}>
                    <div className={s.fim}>
                        <div className={s.tip}>
                            <p>Aula finalizada!!</p>
                        </div>
                        <div className={s.img}>

                        </div>
                        <div className={s.voltar}>
                            <button onClick={() => {
                                navigate('/aula')
                            }}>Voltar para aulas</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContentAula