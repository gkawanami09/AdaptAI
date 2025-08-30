import s from './Dashboard.module.css'
import SectionAulaEsquerda from "../Components/SectionAulaEsquerda";
import {useEffect, useState} from "react";
import SectionDashDireita from "../Components/SectionDashDireita";
import {useNavigate} from "react-router-dom";

function Dashboard(props){
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

    const [porcento, setPorcento] = useState(60)
    return(
        <main className={s.mainDash}>
            <SectionAulaEsquerda></SectionAulaEsquerda>
            <SectionDashDireita semana={props.semana} progesso={porcento}></SectionDashDireita>
        </main>
    )
}
export default Dashboard