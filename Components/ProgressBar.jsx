import s from './ProgressBar.module.css'
import {useState} from "react";
function ProgressBar (props) {
    const [obj, setObj] = useState(props.aula)
    const [tela, setTela] = useState(window.innerWidth)
    const [frac, setFrac] = useState((tela / (obj.conteudo.length)).toString() + 'px')


    return (
        <div className={s.todo}>
            <div className={s.title}>
                <p>{obj.aula}</p>
            </div>
            <div className={s.bar}>
                {props.aula.conteudo.length > 1 && obj.conteudo.map((item, index) => (
                    <div className={s.fluido}>
                        <div>
                            {index > 0 ? item.status == 100 ? <div className={s.percorrido} style={{width: frac}}></div> : <div className={s.nonpercorrido} style={{width: frac}}></div> : console.log('')}
                        </div>
                        <div className={s.icons}>
                        {item.type == 'video' ? item.status == 100 ? <button className={s.btnIcon}><img className={s.imgsIcon} src='/img/videoicon.svg'/></button> : <button className={s.btnIconApagado}><img className={s.imgsIcon} src='/img/videoIconApagado.svg'/></button>:console.log('')}
                        {item.type == 'text' ? item.status == 100 ? <button className={s.btnIcon}><img className={s.imgsIcon} src='/img/txtVerde.svg'/></button> : <button className={s.btnIconApagado}><img className={s.imgsIcon} src='/img/txtApagado.svg'/></button>:console.log('')}
                        {item.type == 'question' ? item.status == 100 ? <button className={s.btnIcon}><img className={s.imgsIcon} src='/img/questVerde.svg'/></button> : <button className={s.btnIconApagado}><img className={s.imgsIcon} src='/img/questApagado.svg'/></button>:console.log('')}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ProgressBar