import s from "./SimuladoGenerator.module.css"
import Callnone from "./Callnone";
import {useEffect, useState} from "react";
import Certeza from "./Certeza";
function SimuladoGenerator (props) {
    const [alpha, setAlpha] = useState(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'])
    const [explicar, setExplicar] = useState('none')



    useEffect(() => {
        if (props.revision) {
            setExplicar('block')
        }
    }, []);

    function marcar (numPergunta, index) {
        var aux = props.respList

        for (var i = 0; i < aux[numPergunta].length; i++) {
            if (aux[numPergunta][i] === s.pressed) {
                aux[numPergunta][i] = s.normal
                break
            }
        }
        aux[numPergunta][index] = s.pressed
        props.setRespList([...aux])
    }


    return (
        <div className={s.todo}>
        {props.position > props.gerado.length ?
                <div className={s.todo}>chegamos ao fim</div> :
                <div className={s.todo}>
                    <div className={s.title}>
                        <p>{props.gerado[0].objestudo} - questão - {props.posicao + 1}</p>
                    </div>
                    <div className={s.content}>
                        <div className={s.question}>
                            <div className={s.resume}>
                                {props.gerado[props.posicao].conteudo.quest.map((cadQ, num) => (
                                    <div className={s.textarea}>
                                        {cadQ.type == 'text' && <p>{cadQ.content}</p>}
                                        {cadQ.type == 'img' && <img src={cadQ.content}/>}
                                    </div>
                                ))}
                            </div>
                            <form className={s.form}>
                                {props.gerado[props.posicao].conteudo.resposta.map((cadR, num) => (
                                    <div className={s.alternativa + ' ' + props.respList[props.posicao][num]}
                                         onClick={() => marcar(props.posicao, num)}>
                                        <p className={s.ordenator}>{alpha[num]})</p>
                                        <p className={s.answer}>{cadR.alternativa}</p>
                                    </div>
                                ))}
                            </form>

                            <div className={s.res} style={{display: explicar}}>
                                {props.gerado[props.posicao].conteudo.resumo.map((cadQ, num) => (
                                    <div className={s.resumir}>
                                        {cadQ.type == 'text' && <p className={s.txtR}>{cadQ.content}</p>}
                                        {cadQ.type == 'img' && <img src={cadQ.content}/>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
        }
        </div>
    )
}

export default SimuladoGenerator