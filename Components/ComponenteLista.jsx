import s from './ComponenteLista.module.css'
import { useNavigate } from "react-router-dom";
import {useEffect, useState} from "react";
function ComponenteLista(props){
    const navigate = useNavigate();

    const [obj, setObj] = useState({})

    useEffect(() => {
        if (props.type === 'aula') {
            var object = {
                'materia': props.materia,
                'aula': props.nome,
                'conteudo': JSON.parse(props.conteudo.conteudo).conteudo
            }
            setObj(object)
        }
        else if (props.type === 'simulado') {
            var object = props.conteudo
            setObj(object)
        }
    }, []);

    return(
        <div className={s.fazer}>
            <p>{props.nome}</p>
            <button className={s.buttonlista} onClick={() => {
                props.setEstudar(obj)
                if (props.type === 'aula') {
                    navigate("/estudos")
                }
                else if (props.type === 'simulado') {
                    navigate("/simulado")
                }
            }}>Iniciar</button>
        </div>
    )
}
export default ComponenteLista