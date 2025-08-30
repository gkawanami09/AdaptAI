import s from './ComponenteLista2.module.css'
function ComponenteLista2(props){
    return(
        <div className={s.fazer}>
            <p>{props.nome}</p>
            <button className={s.buttonlista}>Iniciar</button>
        </div>
    )
}
export default ComponenteLista2