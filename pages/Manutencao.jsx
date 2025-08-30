import s from './Manutencao.module.css'
function Manutencao(){
    return(
        <body>
        <header>
            <img className={s.img} src="img/logoLight.svg" alt=""/>
        </header>
        <main className={s.mainMan}>
            <p>Infelizmente, o site está em manutenção, estamos trabalhando nisso, por favor aguarde.</p>
            <i className={s.giras +" fa-solid fa-gear"}></i>
        </main>
        </body>
    )
}

export default Manutencao