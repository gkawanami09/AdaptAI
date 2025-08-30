import css from './AlteraEmail.module.css'
import InputCadastro from "../Components/InputCadastro";
import {useEffect, useState} from "react";
import BtnSubmit from "../Components/BtnSubmit";
import {redirect, useNavigate} from "react-router-dom";
import Charger from "../Components/Charger";
import s from "./EsqueciSenha.module.css";
function AlteraEmail(props){
    const navigate = useNavigate();
    const [dSenha, setDSenha] = useState('flex')
    const [dCodigo, setDCodigo] = useState('none')
    const [dMail, setDMail] = useState('none')

    const [senha, setSenha] = useState('')
    const [codigo, setCodigo] = useState('')
    const [mail, setMail] = useState('')

    const [statusS, setStatusS] = useState('')
    const [statusE, setStatusE] = useState('')
    const [statusC, setStatusC] = useState('')

    const [charger, setCharger] = useState('none')

    useEffect(() => {
        var premissa = localStorage.getItem('emailValidation')
        var validacao = JSON.parse(localStorage.getItem('premisseE'))

        if (premissa !== null && checandoValidade(premissa) !== true){
            setDSenha('none')
            setDMail('flex')
            setDCodigo('none')
        }
        else if (validacao !== null && checandoValidade(validacao.down) !== true){
            setDSenha('none')
            setDMail('none')
            setDCodigo('flex')
        }
        else {
            setDSenha('flex')
            setDMail('none')
            setDCodigo('none')
        }
    }, []);

    async function recupera () {
        setStatusS('')
        setCharger('block')
        const data = {
            'senha':senha,
            'token': JSON.parse(localStorage.getItem('token'))
        }
        console.log(data)
        JSON.stringify(data)

        await fetch(props.api + '/senhaCheck', {
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
                console.log(acert)
                if (acert.status === true) {
                    localStorage.setItem('emailValidation', JSON.stringify(acert.resp))
                    setDSenha('none')
                    setDMail('flex')
                    setDCodigo('none')
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

    async function email () {
        setStatusE('')
        setCharger('block')
        if (localStorage.getItem('emailValidation') !== null) {
            //checando a validade da chave

            var valid = checandoValidade(JSON.parse(localStorage.getItem('emailValidation')).down)

            if (valid) {
                console.log('venceu')
                localStorage.removeItem('emailValidation')
                setDSenha('flex')
                setDMail('none')
                setDCodigo('none')
            }
            else {
                const data = {
                    'email': mail,
                    'validation': JSON.parse(localStorage.getItem('emailValidation'))
                }
                console.log(data)

                await fetch(props.api + '/geraCodeEmail', {
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
                        console.log(acert)
                        if (acert.status === true) {
                            console.log(acert.resp)
                            localStorage.setItem('premisseE', JSON.stringify(acert.resp))
                            localStorage.removeItem('emailValidation')
                            console.log(JSON.parse(localStorage.getItem('premisseE')))
                            setDSenha('none')
                            setDMail('none')
                            setDCodigo('flex')
                        }
                        else {
                            setStatusE(acert.status)
                        }

                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        }
        else {
            console.log('gerar o código antes')
        }
        setCharger('none')
    }

    async function confereCode () {
        setStatusC('')
        setCharger('block')
        if (localStorage.getItem('premisseE') !== null) {
            //checando a validade da chave

            var valid = checandoValidade(JSON.parse(localStorage.getItem('premisseE')).down)

            if (valid) {
                console.log('venceu')
                localStorage.removeItem('premisseE')
                setDSenha('flex')
                setDMail('none')
                setDCodigo('none')
            }
            else {
                const data = {
                    'code': codigo,
                    'token': JSON.parse(localStorage.getItem('premisseE')),
                    'userInfo': JSON.parse(localStorage.getItem('token'))
                }
                console.log(data)

                await fetch(props.api + '/confereCodeEmail', {
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
                        console.log(acert)
                        if (acert.status === true) {
                            localStorage.removeItem('premisseE')
                            localStorage.setItem('token', JSON.stringify(acert.resp))
                            setDSenha('none')
                            setDMail('none')
                            setDCodigo('none')
                            navigate('/perfil')
                        }
                        else {
                            setStatusC(acert.resp)
                        }

                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        }
        else {
            console.log('gerar o código antes')
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


    return(
        <div className={css.todo}>
            <Charger charge={charger}></Charger>
            <div className={css.disp} style={{display: dSenha}}>
                <form action="" className={css.form} onSubmit={(e) => {
                    e.preventDefault()
                    recupera()
                }}>
                    <InputCadastro setar={setSenha} type={'password'} label={'Informe a senha da sua conta'}
                                   align={'center'}></InputCadastro>
                    <BtnSubmit title={'Enviar'}/>
                </form>
                <p className={s.status}>{statusS}</p>
            </div>
            <div className={css.disp} style={{display: dMail}}>
                <form action="" className={css.form} onSubmit={(e) => {
                    e.preventDefault()
                    email()
                }}>
                    <InputCadastro setar={setMail} type={'email'} label={'Informe o novo E-mail da sua conta'}
                                   align={'center'}></InputCadastro>
                    <BtnSubmit title={'Enviar'}/>
                </form>
                <p className={s.status}>{statusE}</p>
            </div>
            <div className={css.disp} style={{display: dCodigo}} onSubmit={(e) => {
                e.preventDefault()
                confereCode()
            }}>
                <form action="" className={css.form}>
                    <InputCadastro setar={setCodigo} type={'number'}
                                   label={'Informe o código enviado a seu novo E-mail'}
                                   align={'center'}></InputCadastro>
                    <BtnSubmit title={'Enviar'}/>
                </form>
                <p className={s.status}>{statusC}</p>
            </div>
        </div>
    )
}

export default AlteraEmail