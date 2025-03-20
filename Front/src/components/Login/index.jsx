import '../Login/login.css'
import Logo from '/coin.png'

function Login() {
    return (
        <div id='divLogin'>
            <img className='imgLogin' src={Logo} alt="" />
            <form id='formLogin'>
                <h1>Login</h1>
                <input className='inputLogin' type="text" name='nome' placeholder='Usuário' required />

                <input className='inputLogin' type="password" name='senha' placeholder='Senha' required />

                <button id='botaoLogin' type='submit'>Entrar</button>
            </form>
        </div>
    );
}

export default Login;