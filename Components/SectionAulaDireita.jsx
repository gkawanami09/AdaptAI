import s from './SectionAulaDireita.module.css'
import ListaAula from "./ListaAula";

function SectionAulaDireita(props){
    return (
        <div className={s.divtudo + ' d-flex flex-column align-items-center'}>
            <div className={s.divtitulo + ' d-flex align-items-end'}>
                <h1>{props.titulo}</h1>
            </div>
            <div className={s.divbaixo + ' d-flex mt-4 pt-5'}>
                {props.aula.length > 0 && props.aula.map((item, index) =>(
                    <ListaAula name={item[0].materia} aula={item} setEstudar={props.setEstudar} type={props.type}></ListaAula>
                ))}
            </div>
        </div>
    )
}

export default SectionAulaDireita