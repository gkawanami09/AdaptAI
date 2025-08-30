import s from './SectionAula2Direita.module.css'
import ListaAula2 from "./ListaAula2";
import ListaAula from "./ListaAula";
import Aula2Grafico from "./Aula2Grafico";

function  SectionAula2Direita(props){


    return (
        <div style={{width: props.width}} className={s.divtudo + ' d-flex flex-column align-items-center'}>
            <div className={s.divtitulo + ' d-flex align-items-end'}>
                <h1>Matematica</h1>
            </div>
            <div className={s.divbaixo + ' mt-4 pt-5'}>
                <div className={'d-flex'}>
                    <ListaAula2 alignItems={"center"} className={s.listacima} nome={props.nome}></ListaAula2>
                    <Aula2Grafico></Aula2Grafico>
                </div>
                <div className={'d-flex'}>
                    <ListaAula2 nome={props.nome}></ListaAula2>
                </div>
            </div>
        </div>
    )
}

export default SectionAula2Direita