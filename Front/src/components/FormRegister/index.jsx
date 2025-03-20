import './FormRegister.css'
import Logo from '/coin.png'

function FormRegister() {
    return (
        <div id='divCadastro'>
            <img className='Logo' src={Logo} alt="" />
            <form id='formCadastro'>
                <h1 >Crie uma Conta</h1>
                <input className='input' type="text" name='nome' placeholder='Digite seu nome' required />

                <input className='input' type="text" name='idade' placeholder='Digite sua idade' required />

                <input className='input' type="email" name='email' placeholder='Digite seu email' required />

                <input className='input' type="password" name='senha' placeholder='Digite sua senha' required />

                <button type='submit'>Cadastrar</button>
            </form>
        </div>
        
    );
}

export default FormRegister;