import style from './EditarPerfil.module.css'
import InputCadastro from "./InputCadastro";
import {useEffect, useState} from "react";
import BtnSubmit from "./BtnSubmit";

function EditarPerfil({mostrar, setMostrar, dados, api, fundoCor}){
    const [nome, setNome]= useState('')
    const [uni, setUni] = useState('')
    const [area, setArea] = useState('')
    const [ano, setAno] = useState('')
    useEffect(() => {
        setNome(dados.nome)
        setUni(dados.universidade)
        setArea(dados.curso)
        setAno(dados.turma)
    }, [dados]);

    async function enviarDados(event){
        event.preventDefault()

        const data = {
            'nome': nome,
            'universidade': uni,
            'area': area,
            'ano':ano,
            'token': JSON.parse(localStorage.getItem('token'))
        }

        await fetch( api + '/infosperfil', {
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
            })
            .catch(function(error) {
                console.log(error);
            });


        setMostrar('none')
    }

    return(
        <div className={style.tudo+" rounded-3"} style={{display: mostrar}}>
            <div className={style.titulo+ '  p-3'}>
                <h3>Meu perfil</h3>
            </div>
            <div>
                <form action="" className={'d-flex flex-column gap-4 p-3'} onSubmit={enviarDados}>
                    <div>
                        <InputCadastro align={'start'} label={'Nome'} setar={setNome} type={'text'} valor={nome}></InputCadastro>
                    </div>
                    <div className={'d-flex flex-column'}>
                        <label htmlFor="area" className={style.label}>Área do conhecimento</label>
                        <select name="area" className={style.opcao} defaultValue={area} onChange={(e)=> setArea(e.target.value)}>
                            <option value="Área">Área</option>
                            <option value="Biologicas">Biologicas</option>
                            <option value="Exatas">Exatas</option>
                            <option value="Humanas">Humanas</option>
                            <option value="Linguagens">Linguagens</option>
                        </select>
                    </div>
                    <div>
                        <InputCadastro align={'start'} label={'Universidade'} setar={setUni} type={'text'} valor={uni}></InputCadastro>
                    </div>
                    <div className={'d-flex flex-column'}>
                        <label htmlFor="ano" className={style.label}>Ano letivo</label>
                        <select name="ano" className={style.opcao} defaultValue={ano} onChange={(e)=> setAno(e.target.value)}>
                            <option value="Ano" >Ano</option>
                            <option value="6º Ano">6º Ano</option>
                            <option value="7º Ano">7º Ano</option>
                            <option value="8º Ano">8º Ano</option>
                            <option value="9º Ano">9º Ano</option>
                            <option value="1º Ano E.M">1º Ano E.M</option>
                            <option value="2º Ano E.M">2º Ano E.M</option>
                            <option value="3º Ano E.M">3º Ano E.M</option>
                            <option value="Universitário">Universitário</option>
                        </select>
                    </div>
                    <div className={'d-flex justify-content-center'}>
                        <BtnSubmit title={'Enviar'}></BtnSubmit>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default EditarPerfil