import s from './DashProgresso.module.css'
import {Doughnut} from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
function DashProgresso(props){
    ChartJS.register(ArcElement, Tooltip, Legend);

    const data = {
        datasets: [
            {
                data: [props.progresso, 100-props.progresso],
                backgroundColor: [
                    '#06D6A0',
                    'rgba(0,145,109,0.24)',
                ],
                borderColor: [
                    '#06D6A0',
                    'rgba(0,145,109,0.24)',
                ],
                borderWidth: 1,
            },
        ],
    };
    return(
            <div className={s.divgrafico}>
                <h1 className={s.tituloProgresso}>Progresso Da Semana</h1>
                <div className={s.divinterior}>
                    <Doughnut data={data} />
                    <p>{props.progresso}%</p>
                </div>
            </div>
    )
}
export default DashProgresso