import s from './MateriaTitle.module.css'
function MateriaTitle (props) {
    return (
        <div className={s.todo}>
            <p className={s.txt}>{props.title}</p>
            <p className={s.txt}>{props.percent}%</p>
        </div>
    )
}

export default MateriaTitle