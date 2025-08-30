import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginSite from "./pages/LoginSite";
import CadastroSite from "./pages/CadastroSite";
import Manutencao from "./pages/Manutencao";
import Aula from "./pages/Aula";
import Aula2 from "./pages/Aula2";
import ObjEstudo from "./pages/ObjEstudo";
import Dashboard from "./pages/Dashboard";
import {useEffect, useState} from "react";
import Perfil from "./pages/Perfil";
import EsqueciSenha from "./pages/EsqueciSenha";
import Simulados from "./pages/Simulados";
import Simulado from "./pages/Simulado";
import AlteraEmail from "./pages/AlteraEmail";

function App() {
  //<Route path="/jogo/:jogo" element={<Descricao />} />

    //https://adaptcheck.up.railway.app
    //http://127.0.0.1:5000
    const [api, setApi] = useState('https://adaptcheck.up.railway.app')
    const [estudar, setEstudar] = useState({"conteudo":[{}]})

    //{
        //'materia' : 'Matematica',
       // 'aula': 'Algebra',
      //  'conteudo' : [
     //   {'type': 'video', 'title': 'Algebra em vídeo', 'content': 'https://www.youtube.com/embed/mbCspvNM7Hw?si=TbPhSWsUcQHS9bTc', 'resumo': 'muito texto interessante para entender e aprender sobre algebra e a beleza da matemática', 'status': 0}
    //]
    //}

    //{'type': 'video', 'title': 'Algebra em vídeo', 'content': 'https://www.youtube.com/embed/mbCspvNM7Hw?si=TbPhSWsUcQHS9bTc', 'resumo': 'muito texto interessante para entender e aprender sobre algebra e a beleza da matemática', 'status': 0},
    //{'type': 'text', 'title': 'título', 'content': [ {'type': 'text', 'content': 'texto'}, {'type': 'img', 'content': 'https://static.escolakids.uol.com.br/2019/09/arvore.jpg'}], 'status': 0},
    //{'type': 'question','respondido' : false ,'quest': [{'type': 'text', 'content': 'texto'}, {'type': 'img', 'content': 'link'}], 'resposta': [{'alternativa': 'texto da resposta', 'status': 200}, {'alternativa': 'texto da resposta', 'status': 400}, {'alternativa': 'texto da resposta', 'status':400}, {'alternativa': 'texto da resposta', 'status':400}], 'resumo': [ {'type': 'text', 'content': 'texto'}, {'type': 'img', 'content': 'link'}], 'status': 0}

    const [simular, setSimular] = useState(false)
    const [corrigir, setCorrigir] = useState(false)
    const [fundoCor, setFundoCor] = useState(['#fff', '#000'])

    let objeto_semana = {
        'dias': [3,7,9,6,7,8,3]
    }

    useEffect(() => {
        infos()
    }, []);

    async function infos () {
        const data = JSON.parse(localStorage.getItem('token'))
        console.log(data)
        await fetch(api + '/perfil', {
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
                if (acert.status) {
                    if (acert.resp.tema === 'claro') {
                        var cores = ['#fff', '#000']
                        setFundoCor([...cores])
                    }
                    else {
                        var cores = ['#2F2F2F', '#fff']
                        setFundoCor([...cores])
                    }
                }
            })
            .catch(function(error) {
                console.log(error);
            });
    }

  return (
    <BrowserRouter className={'app'}>
      <Routes>
          <Route path={'/'} element={<LoginSite api={api}/> }/>
          <Route path={'/login'} element={<LoginSite api={api}/>}/>
          <Route path='/cadastro' element={<CadastroSite api={api}/>} />
          <Route path='/aula' element={<Aula api={api} setEstudar={setEstudar} fundoCor={fundoCor}/>} />
          <Route path='/dash' element={<Dashboard semana={objeto_semana} fundoCor={fundoCor}/>} />
          <Route path='/estudos' element={<ObjEstudo api={api} aula={estudar} setEstudar={setEstudar} fundoCor={fundoCor}/>} />
          <Route path='/aula2' element={<Aula2 />} fundoCor={fundoCor}/>
          <Route path='/perfil' element={<Perfil api={api} fundoCor={fundoCor} setFundoCor={setFundoCor}/>} />
          <Route path='/simulados' element={<Simulados api={api} setEstudar={setSimular} fundoCor={fundoCor} />}/>
          <Route path='/simulado' element={<Simulado api={api} setEstudar={setSimular} simular={simular} corrigir={corrigir} setCorrigir={setCorrigir} fundoCor={fundoCor} />} />
          <Route path='/recuperar' element={<EsqueciSenha api={api}/>} />
          <Route path={'*'} element={<Aula/> }/>
          <Route path={'/alteraEmail'} element={<AlteraEmail api={api}/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
