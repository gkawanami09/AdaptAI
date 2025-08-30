import s from './CadastroSite.module.css'
import InputCadastro from "../Components/InputCadastro";
import BtnSubmit from "../Components/BtnSubmit";
import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import CadastroBar from "../Components/CadastroBar";

function CadastroSite (props) {
    const navigate = useNavigate();
    const [nome, setNome] = useState()
    const [email, setEmail] = useState()
    const [senha, setSenha] = useState()
    const [confirmaSenha, setConfirmaSenha] = useState()
    const [statusC, setStatusC] = useState('')
    const [statusCad, setStatusCad] = useState('')
    const [code, setCode] = useState('')
    const [confirma, setConfirma] = useState('none')
    const [charger, setCharger] = useState('none')
    const [permitirCad, setPermitirCad] = useState(false)

    useEffect(() => {
        if (localStorage.getItem('token') !== null) {
            var token = localStorage.getItem('token')
            token = JSON.parse(token)
            var vencimento = token.down

            if (compareDates(vencimento) == false){
                navigate("/aula")
            }
        }
        else if (localStorage.getItem('eValidation') !== null && checandoValidade(JSON.parse(localStorage.getItem('eValidation')).down) === false) {
            setConfirma('flex')
        }
    }, []);

    useEffect(() => {

    }, [senha]);

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

    async function cadastrar () {
        setCharger('block')
        if (senha === confirmaSenha && permitirCad){
            setStatusCad('')
            const data = {
                'Name':nome,
                'Email':email,
                'Password':senha
            }

           await fetch(props.api + '/cadastro', {
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
                       console.log('código enviado')
                       localStorage.setItem('eValidation', JSON.stringify(acert.resp))
                       setCharger('none')
                       setConfirma('flex')
                   }
                   else {
                       setStatusCad(acert.status)
                   }
               })
               .catch(function(error) {
                   console.log(error);
               });
        }
        else if (permitirCad === false) {
            setStatusCad('Crie uma senha forte')
        }
        else{
            setStatusCad('as senhas precisam ser iguais')
        }
        setCharger('none')
    }

    async function confereCode () {
        setCharger('block')
        var val = checandoValidade(JSON.parse(localStorage.getItem('eValidation')).down)

        if (localStorage.getItem('eValidation') !== null && val !== true) {
            const data = {
                'code': code,
                'token': JSON.parse(localStorage.getItem('eValidation'))
            }

            await fetch(props.api + '/confereCad', {
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
                        localStorage.removeItem('eValidation')
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
                    <p className={s.status}>{statusC}</p>
                </div>
                <div className={s.back}></div>
            </div>
            <div className={s.sideBack + ' col-9'}>

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
                        cadastrar()
                    }}>
                        <InputCadastro label='Nome' type='txt' setar={setNome}></InputCadastro>
                        <InputCadastro label='Email' type='email' setar={setEmail}></InputCadastro>
                        <InputCadastro label='Senha' type='password' setar={setSenha}></InputCadastro>
                        <CadastroBar senha={senha} setPermitirCad={setPermitirCad}></CadastroBar>
                        <InputCadastro label='Confirmar Senha' type='password' setar={setConfirmaSenha}></InputCadastro>
                        <Link to={'/login'} className={s.redic}>Já tem conta? Login</Link>
                        <BtnSubmit cadastrar={cadastrar} title='entrar'></BtnSubmit>
                        <p className={s.stats}>{statusCad}</p>
                    </form>
                </div>
                <div className={s.waves + ' row-12'}>

                </div>
            </div>
        </div>
    )
}

export default CadastroSite