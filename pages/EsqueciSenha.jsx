import s from './EsqueciSenha.module.css'
import InputCadastro from "../Components/InputCadastro";
import {useEffect, useState} from "react";
import BtnSubmit from "../Components/BtnSubmit";
import {json, Link, redirect, useNavigate} from "react-router-dom";
import style from "../Components/Config.module.css";
function EsqueciSenha (props) {
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [code, setCode] = useState('')
    const [password, setPassword] = useState('')
    const [confirmedPassword, setConfirmedPassword] = useState('')
    const [charger, setCharger] = useState('none')

    //display useState
    const [dEmail, setDEmail] = useState('none')
    const [dCode, setDCode] = useState('none')
    const [dSenha, setDSenha] = useState('none')

    //status useState
    const [statusE, setStatusE] = useState('')
    const [statusC, setStatusC] = useState('')
    const [statusS, setStatusS] = useState('')

    //carregando etapa que parou
    useEffect(() => {
        var premissa = localStorage.getItem('premisse')
        var validacao = JSON.parse(localStorage.getItem('validation'))

        if (premissa !== null && checandoValidade(premissa) !== true){
            setDEmail('none')
            setDCode('none')
            setDSenha('flex')
        }
        else if (validacao !== null && checandoValidade(validacao.down) !== true){
            setDEmail('none')
            setDCode('flex')
            setDSenha('none')
        }
        else {
            setDEmail('flex')
            setDCode('none')
            setDSenha('none')
        }
    }, []);

    async function recupera () {
        setCharger('block')
        const data = {
            'Email':email,
        }
        JSON.stringify(data)

        await fetch(props.api + '/code', {
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
                    setStatusE('')
                    localStorage.setItem('validation', JSON.stringify(acert.resp))
                    setDEmail('none')
                    setDCode('flex')
                    setDSenha('none')
                }
                else {
                    setStatusE(acert.status)
                }

            })
            .catch(function(error) {
                console.log(error);
            });
        setCharger('none')
    }

    async function confereCode () {
        setCharger('block')
        if (localStorage.getItem('validation') !== null) {
            //checando a validade da chave

            var valid = checandoValidade(JSON.parse(localStorage.getItem('validation')).down)

            if (valid) {
                localStorage.removeItem('validation')
            }
            else {
                const data = {
                    'code': code,
                    'validation': JSON.parse(localStorage.getItem('validation'))
                }
                JSON.stringify(data)

                await fetch(props.api + '/verifica', {
                    method: 'POST',
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json' // Especifique o tipo de conteúdo como JSON
                    },
                    body: JSON.stringify(data) // Converta o objeto em uma string JSON
                })
                    .then((resp) => resp.json())
                    .then(function (data) {
                        let acert = data // saberemos se deu certo
                        if (acert.status === true) {
                            setStatusC('')
                            localStorage.setItem('premisse', acert.resp.toString())
                            setDEmail('none')
                            setDCode('none')
                            setDSenha('flex')
                        } else {
                            setStatusC(acert.resp)
                        }

                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        }
        else {
            console.log('gerar o código ante4s')
        }
        setCharger('none')
    }

    async function mudarSenha () {
        setCharger('block')
        if (localStorage.getItem('premisse') !== null) {
            // checando vencimento
            var valid = checandoValidade(localStorage.getItem('premisse'))

            if (valid) {
                console.log('venceu')
            }
            else {
                if (password === confirmedPassword) {
                    const data = {
                        'email': email,
                        'senha': password
                    }
                    JSON.stringify(data)

                    await fetch(props.api + '/changeWord', {
                        method: 'POST',
                        headers: {
                            'Access-Control-Allow-Origin': '*',
                            'Content-Type': 'application/json' // Especifique o tipo de conteúdo como JSON
                        },
                        body: JSON.stringify(data) // Converta o objeto em uma string JSON
                    })
                        .then((resp) => resp.json())
                        .then(function (data) {
                            let acert = data // saberemos se deu certo
                            localStorage.removeItem('validation')
                            localStorage.removeItem('premisse')
                            setDEmail('none')
                            setDCode('none')
                            setDSenha('none')
                            setCharger('none')
                            navigate("/login")

                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                } else {
                    alert('as senhas não batem')
                }
            }
        }
        else {
            console.log('o código de confirmação ainda não foi validado')
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
        <div className={s.todo}>
            <div className={s.charge} style={{display: charger}}>
                <div className={s.alinhar}>
                    <div className={s.spinner}></div>
                </div>
                <div className={s.baixo}>

                </div>
            </div>
            <div className={s.informar + ' ' + s.disp} style={{display: dEmail}}>
                <form className={s.form} onSubmit={(e) => {
                    e.preventDefault()
                    recupera()
                }}>
                    <InputCadastro setar={setEmail} type={'email'} label={'Informe o email da sua conta'}
                                   align={'center'}></InputCadastro>
                    <BtnSubmit title={'mandar'}></BtnSubmit>
                </form>
                <p className={s.status}>{statusE}</p>
            </div>
            <div className={s.code + ' ' + s.disp} style={{display: dCode}}>
                <form className={s.form} onSubmit={(e) => {
                    e.preventDefault()
                    confereCode()
                }}>
                    <InputCadastro setar={setCode} label={'Informe o código enviado por email'}
                                   align={'center'} type={'number'}></InputCadastro>
                    <BtnSubmit title={'mandar'}></BtnSubmit>
                </form>
                <p className={s.status}>{statusC}</p>
            </div>
            <div className={s.senha + ' ' + s.disp} style={{display: dSenha}}>
                <form className={s.form} onSubmit={(e) => {
                    e.preventDefault()
                    mudarSenha()
                }}>
                    <InputCadastro setar={setPassword} label={'Nova Senha'} align={'center'}></InputCadastro>
                    <InputCadastro setar={setConfirmedPassword} label={'Confirmar Senha'}
                                   align={'center'}></InputCadastro>
                    <BtnSubmit title={'Mudar senha'}></BtnSubmit>
                </form>
                <p className={s.status}>{statusS}</p>
            </div>

        </div>
    )
}

export default EsqueciSenha