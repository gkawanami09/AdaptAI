import s from './InputCadastro.module.css'
import {useState} from "react";
function InputCadastro ({align, label, type, setar, valor = 0}) {
    const [tip, setTip] = useState(type)
    function validaCarac (e) {
        if (type === 'email' || type === 'password'){
            if (e.target.value.match(' ')){
                return false
            }else{
                return true
            }
        }
        return true
    }

    return (
        <div className={s.todo} style={{alignItems: align}}>
            <div className={s.title}>
                <p>{label}</p>
            </div>
            {type !== 'password' ?
            <div className={s.inp}>
                {valor === 0 ? <input onChange={(e) => {
                    if (validaCarac(e)) {
                        setar(e.target.value)
                    }
                    else {
                        let str = e.target.value
                        str = str.replace(' ', '')
                        e.target.value = str
                    }
                } } type={type} required /> :
                    <input onChange={(e) => setar(e.target.value)} type={type} required value={valor}/>}
            </div>
            :
                <div className={s.senhaInpt}>
                    <input onChange={(e) => {
                        if (validaCarac(e)) {
                            setar(e.target.value)
                        } else {
                            let str = e.target.value
                            str = str.replace(' ', '')
                            e.target.value = str
                        }
                    }} type={tip} required/>
                    <button type='button' className={s.eye} onClick={() => {
                        if (tip === 'password') {
                            setTip('text')
                        } else {
                            setTip('password')
                        }
                    }}>{tip === 'password' ? <i className={"fa-solid fa-eye" + ' ' + s.icon}></i> :
                        <i className={"fa-solid fa-eye-slash" + ' ' + s.icon}></i>}</button>
                </div>
            }
        </div>
    )
}

export default InputCadastro