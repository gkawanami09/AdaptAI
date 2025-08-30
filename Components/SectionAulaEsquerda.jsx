import s from './SectionAulaEsquerda.module.css'
import {useNavigate} from "react-router-dom";

function SectionAulaEsquerda (props){
    const navigate = useNavigate();

    async function deslog(){
        const data = JSON.parse(localStorage.getItem('token'))
        await fetch('https://adaptcheck.up.railway.app' + '/excluiToken', {
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
                    localStorage.removeItem('token')
                    navigate("/login")
                }
                else {
                    console.log(acert.status)
                }

            })
            .catch(function(error) {
                console.log(error);
            });
    }

    return (
        <div className={s.total}>
            <div className={ s.divinfos + ' d-flex flex-column'}>
                <div style={{borderTop: '2px solid white'}} onClick={() => {
                    navigate('/aula')
                }}>
                    <img src='/img/logoSide.png' style={{width: '170%'}} />
                </div>
                <div onClick={() => {
                    navigate('/aula')
                }}>
                    <i className="fa-solid fa-book fa-xl"></i>
                </div>
                <div onClick={() => {
                    navigate('/simulados')
                }}>
                    <i className="fa-regular fa-circle-check fa-xl"></i>
                </div>
                <div onClick={() => {
                    navigate('/perfil')
                }}>
                    <i className="fa-solid fa-gear fa-xl"></i>
                </div>
            </div>
            <div>
                <i className={s.sair + " fa-solid fa-arrow-right-from-bracket fa-xl m-3"} onClick={deslog}></i>
            </div>
        </div>
    )
}

export default SectionAulaEsquerda