import s from './Grafico.module.css'
import {useState} from "react";
import {Doughnut} from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

function Grafico(props){

    const [semana, setSemana] = useState(props.semana.dias)
    var maior =  Math.max.apply(null,semana)
    var maiorBarra = 90/maior
    var soma = semana.reduce(function(soma, i) {
        return soma + i;
    });
    console.log(soma)
    ChartJS.register(ArcElement, Tooltip, Legend);

     const data = {
        labels: [],
        datasets: [
            {
                label: 'Horas Estudadas',
                data: [semana[0],semana[1], semana[2], semana[3],semana[4],semana[5],semana[6]],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };




    return(
        <div className={s.divgrafico}>
            <div className={s.graficoesquerda}>
                <div className={s.divnome}>
                    Horas Por Semana
                </div>
                <div className={s.inverte}>
                    <div className={s.divbarras}>
                        <div style={{height:maiorBarra*semana[0] + '%'}} className={s.divbarra}>
                            <p style={{textAlign:'center'}}>{semana[0]}h <br/> Dom</p>
                        </div>
                        <div style={{height:maiorBarra*semana[1] + '%'}} className={s.divbarra}>
                            <p style={{textAlign:'center'}}>{semana[1]}h <br/> Seg</p>
                        </div>
                        <div style={{height:maiorBarra*semana[2] + '%'}} className={s.divbarra}>
                            <p style={{textAlign:'center'}}>{semana[2]}h <br/> Ter</p>
                        </div>
                        <div style={{height:maiorBarra*semana[3] + '%'}} className={s.divbarra}>
                            <p style={{textAlign:'center'}}>{semana[3]}h <br/> Qua</p>
                        </div>
                        <div style={{height:maiorBarra*semana[4] + '%'}} className={s.divbarra}>
                            <p style={{textAlign:'center'}}>{semana[4]}h <br/> Qui</p>
                        </div>
                        <div style={{height:maiorBarra*semana[5] + '%'}} className={s.divbarra}>
                            <p style={{textAlign:'center'}}>{semana[5]}h <br/> Sex</p>
                        </div>
                        <div style={{height:maiorBarra*semana[6] + '%'}} className={s.divbarra}>
                            <p style={{textAlign:'center'}}>{semana[6]}h <br/> Sab</p>
                        </div>
                    </div>
                    <Doughnut className={s.rosquinha} data={data} />
                    <div className={s.graficodireita}>
                        <h1>{soma}</h1>
                        <p>Horas Estudadas</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Grafico