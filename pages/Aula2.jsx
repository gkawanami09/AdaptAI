import s from './Aula2.module.css'
import SectionAulaEsquerda from "../Components/SectionAulaEsquerda";
import SectionAula2Direita from "../Components/SectionAula2Direita";
import {useEffect} from "react";
import { useNavigate } from "react-router-dom";
function Aula2 (props) {
    //proteção de rota
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('token') == null) {
            navigate("/login");
        }
        else {
            var token = localStorage.getItem('token')
            token = JSON.parse(token)
            var vencimento = token.down
            //console.log(((vencimento.getDate() )) + "/" + ((vencimento.getMonth() + 1)) + "/" + vencimento.getFullYear() )

            if (compareDates(vencimento)){
                localStorage.removeItem('token')
                navigate("/login")
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

    //fim da proteção

    return (
        <main className={s.main + ' d-md-flex'}>
            <SectionAulaEsquerda></SectionAulaEsquerda>
            <div className={s.direita}>
                <SectionAula2Direita></SectionAula2Direita>
            </div>
        </main>
    )
}

export default Aula2