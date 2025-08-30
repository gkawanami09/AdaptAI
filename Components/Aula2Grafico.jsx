import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import s from './Aula2Grafico.module.css'

function Aula2Grafico(){

    ChartJS.register(ArcElement, Tooltip, Legend);

    const data = {
        datasets: [
            {
                data: [25, 12],
                backgroundColor: [
                    'rgba(88, 227, 159, 1)',
                    'rgba(88, 227, 159, 0.6)'

                ],
                borderColor: [
                    'rgba(88, 227, 159, 1)',
                    'rgba(88, 227, 159, 0.6)'

                ],
                borderWidth: 1,
            },
        ],
    };

    return(
        <div className={s.card}>
            <div>
                <h1>Progresso total</h1>
            </div>
            <div className={s.grafico}>
                <Doughnut data={data}/>
            </div>
        </div>
    )
}

export default Aula2Grafico