import s from './CadastroBar.module.css'
import {useEffect, useState} from "react";
function CadastroBar ({senha, setPermitirCad}) {
    const [message, setMessage] = useState('')
    const [conclued, setConclued] = useState(0)
    const [color, setColor] = useState('')

    useEffect(() => {
        setPermitirCad(false)
        const hasUpper = (str) => /[A-Z]/.test(str)
        const hasletter = (str) => /[a-z]/.test(str)
        const hasnumber = (str) => /[0-9]/.test(str)

        let regex = /^(?=.*[@!#$%&*/=_+-])/

        if (hasletter(senha) === false) {
            setMessage('adicione pelo menos uma letra minuscula')
            setConclued('0')
            setColor('')
        }
        else if(hasUpper(senha) === false) {
            setMessage('adicione uma letra maiuscula')
            setConclued('20%')
            setColor('#EF476F')
        }
        else if(hasnumber(senha) === false) {
            setMessage('adicione um número')
            setConclued('40%')
            setColor('#EF476F')
        }
        else if (regex.test(senha) === false) {
            setMessage('adicione algum caractere espescial')
            setConclued('60%')
            setColor('#FFD166')
        }
        else if(senha.length < 8) {
            setMessage('a senha deve ter no mínimo 8 caracteres')
            setConclued('80%')
            setColor('#FFD166')
        }
        else {
            setMessage('senha forte')
            setConclued('100%')
            setColor('#06D6A0')
            setPermitirCad(true)
        }


    }, [senha]);

    return (
        <div className={s.todo}>
            <div className={s.mess}>
                <p>{message}</p>
            </div>
            <div className={s.bar}>
                <div className={s.couter} style={{width: conclued, backgroundColor: color}}></div>
            </div>
        </div>
    )
}

export default CadastroBar