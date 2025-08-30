import s from "./Charger.module.css";

function Charger (props) {
    return (
        <div className={s.charge} style={{display: props.charge}}>
            <div className={s.alinhar}>
                <div className={s.spinner}></div>
            </div>
            <div className={s.baixo}>

            </div>
        </div>
    )
}

export default Charger