import s from './ListaAula2.module.css'
import ComponenteLista2 from "./ComponenteLista2";
import TituloLista2 from "./TituloLista2";

function ListaAula2(props){
    return(
        <div className={s.divlista +' d-flex flex-column'}>
            <TituloLista2 nome={'Procurar aula'}></TituloLista2>
            <ComponenteLista2 nome={'Algebra'}></ComponenteLista2>
            <ComponenteLista2  nome={'Logaritimo'}></ComponenteLista2>
            <ComponenteLista2  nome={'Fração'}></ComponenteLista2>
            <ComponenteLista2  nome={'Geometria'}></ComponenteLista2>
            <ComponenteLista2  nome={'Radiciação'}></ComponenteLista2>
        </div>
    )
}
export default ListaAula2