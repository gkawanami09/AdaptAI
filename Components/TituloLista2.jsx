import s from './TituloLista2.module.css'
function TituloLista2(props){
    return(
        <div className={s.titulolist}>
            <p>{props.nome}</p>

        </div>
    )
}
export default TituloLista2