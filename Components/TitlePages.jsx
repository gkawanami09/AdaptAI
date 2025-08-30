import s from './TitlePages.module.css'
function TitlePages (props) {
    return (
        <div className={s.todo}>
            <p>{props.title}</p>
            <div className={s.line}></div>
        </div>
    )
}

export default TitlePages