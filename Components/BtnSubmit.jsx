import s from './BtnSubmit.module.css'
function BtnSubmit (props) {
    return (
        <button className={s.btn} type='submit'>
            {props.title}
        </button>
    )
}

export default BtnSubmit