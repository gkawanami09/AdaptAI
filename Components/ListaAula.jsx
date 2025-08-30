import s from './ListaAula.module.css'
import ComponenteLista from "./ComponenteLista";
import TituloLista from "./TituloLista";
import {useState} from "react";

function ListaAula(props){
    const [fechado, setFechado] = useState('0px')

    return(
        <div style={{alignItems:props.alignItems}} className={s.divlista +' d-flex flex-column'}>
            <TituloLista nome={props.name} setFechado={setFechado} fechado={fechado}></TituloLista>
            <div className={s.descer} style={{height: fechado, overflow: 'hidden'}}>
            {props.aula.length > 0 && props.aula.map((item, index) => (
                <ComponenteLista nome={item.objEstudo} materia={item.materia} setEstudar={props.setEstudar} conteudo={item} type={props.type}></ComponenteLista>
            ))}
            </div>
        </div>
    )
}
export default ListaAula