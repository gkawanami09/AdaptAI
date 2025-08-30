import s from './TituloLista.module.css'
function TituloLista(props){
    function mudar () {
        var aux = props.fechado
        if (aux === '0px') {
            props.setFechado('fit-content')
        }
        else {
            props.setFechado('0px')
        }
    }

    return(
        <div className={s.titulolist} onClick={() => mudar()}>
            <p>{props.nome}</p>

        </div>
    )
}
export default TituloLista