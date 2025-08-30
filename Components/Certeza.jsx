import s from "./Certeza.module.css";

function Certeza (props) {
    return (
        <div className={s.charge} style={{display: props.charge}}>
            <div className={s.alinhar}>
                <div className={s.content}>
                    <div className={s.txt}>
                        <p className={s.Pmaior}>Tem certeza que deseja enviar o simulado?</p>
                        <p>Após o envio é impossível fazer alterações</p>
                    </div>
                    <div className={s.btn}>
                    <button onClick={() => props.enviado()}>Sim</button>
                        <button onClick={() => props.setCerteza('none')}>Não</button>
                    </div>
                </div>
            </div>
            <div className={s.baixo}>

            </div>
        </div>
    )
}

export default Certeza