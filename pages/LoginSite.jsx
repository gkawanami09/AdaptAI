import s from './LoginSite.module.css'
import InputCadastro from "../Components/InputCadastro";
import BtnIniciar from "../Components/BtnIniciar";
import BtnSubmit from "../Components/BtnSubmit";
import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
function LoginSite (props) {
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [charger, setCharger] = useState('none')
    const [statusS, setStatusS] = useState('')
    //verificação duas etapas
    const [confirma, setConfirma] = useState('none')
    const [statusC, setStatusC] = useState('')
    const [code, setCode] = useState('')
    useEffect(() => {
        if (localStorage.getItem('token') !== null) {
            var token = localStorage.getItem('token')
            token = JSON.parse(token)
            var vencimento = token.down

            if (compareDates(vencimento) == false){
                navigate("/aula")
            }
        }
    }, []);

    function compareDates (date) {
        let today = new Date()      // pega a data atual
        let hoje = Date.parse(today)
        let vencimento = Date.parse(date)

        if(hoje >= vencimento) {
            return true
        }
        else {
            return false
        }

    }

    async function logar () {
        setCharger('block')
        setStatusS('')

        const data = {
            'Email':email,
            'Password':senha
        }
        JSON.stringify(data)

        await fetch(props.api + '/login', {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json' // Especifique o tipo de conteúdo como JSON
            },
            body: JSON.stringify(data) // Converta o objeto em uma string JSON
        })
            .then((resp) => resp.json())
            .then(function(data) {
                let acert = data // saberemos se deu certo
                if (acert.status === true){
                    localStorage.setItem('LValidation', JSON.stringify(acert.resp))
                    setCharger('none')
                    setConfirma('flex')

                    // localStorage.setItem('token', JSON.stringify(acert.resp))
                    // setCharger('none')
                    // navigate("/aula");
                }
                else {
                    setStatusS(acert.status)
                }

            })
            .catch(function(error) {
                console.log(error);
            });
        setCharger('none')
    }

    async function confereCode () {
        setCharger('block')
        var val = checandoValidade(JSON.parse(localStorage.getItem('LValidation')).down)

        if (localStorage.getItem('LValidation') !== null && val !== true) {
            const data = {
                'code': code,
                'token': JSON.parse(localStorage.getItem('LValidation'))
            }

            await fetch(props.api + '/confereLog', {
                method: 'POST',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json' // Especifique o tipo de conteúdo como JSON
                },
                body: JSON.stringify(data) // Converta o objeto em uma string JSON
            })
                .then((resp) => resp.json())
                .then(function(data) {
                    let acert = data // saberemos se deu certo
                    if (acert.status === true) {
                        setStatusC('')
                        setConfirma('none')
                        localStorage.setItem('token', JSON.stringify(acert.resp))
                        localStorage.removeItem('LValidation')
                        setCharger('none')
                        navigate('/aula')
                    }
                    else {
                        setStatusC(acert.status)
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
        }
        else {
            setStatusC('código vencido')
        }
        setCharger('none')
    }

    function checandoValidade (date) {
        let today = new Date()
        let data2 = new Date(date)
        let timezone = today.getTimezoneOffset()
        data2.setMinutes(data2.getMinutes() + timezone)

        if (today >= data2) {
            return true
        }
        return false
    }

    return (
        <div className={s.todo + ' row-12'}>
            <div className={s.charge} style={{display: charger}}>
                <div className={s.alinhar}>
                    <div className={s.spinner}></div>
                </div>
                <div className={s.baixo}>

                </div>
            </div>
            <div className={s.conf} style={{display: confirma}}>
                <div className={s.confirmaEmail} style={{display: confirma}}>
                    <form className={s.form} onSubmit={(e) => {
                        e.preventDefault()
                        confereCode()
                    }}>
                        <InputCadastro setar={setCode} label={'Informe o código enviado por email'}
                                       align={'center'} type={'number'}></InputCadastro>
                        <BtnSubmit title={'mandar'}></BtnSubmit>
                    </form>
                    <button className={s.btnX} onClick={() => {
                        setConfirma('none')
                        localStorage.removeItem('eValidation')
                    }}>cancelar
                    </button>
                    <p className={s.stats}>{statusC}</p>
                </div>
                <div className={s.back}></div>
            </div>
            <div className={s.register + ' col-3'}>
                <div className={s.logo + ' row-12'}>
                    <figure>
                        <img src='/img/logoLight.svg'/>
                    </figure>
                </div>
                <div className={s.form + ' row-12'}>
                    <form className={s.inputs} onSubmit={(e) => {
                        e.preventDefault()
                        logar()
                    }}>
                        <InputCadastro label='Email' type='email' setar={setEmail}></InputCadastro>
                        <InputCadastro label='Senha' type='password' setar={setSenha}></InputCadastro>
                        <Link to={'/cadastro'} className={s.redic}>Não possui conta? Cadastre-se</Link>
                        <Link to={'/recuperar'} className={s.redic}>Esqueci a senha</Link>
                        <BtnSubmit title='entrar'></BtnSubmit>
                    </form>
                    <p className={s.status}>{statusS}</p>
                </div>
                <div className={s.waves + ' row-12'}>

                </div>
            </div>
            <div className={s.sideBack + ' col-9'}>

            </div>
        </div>
    )
}

export default LoginSite