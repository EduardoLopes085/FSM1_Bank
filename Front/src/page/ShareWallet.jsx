import AllSpents from "../components/allSpents";
import Footer from "../components/footer";
import Header from "../components/header";

function ShareWallet() {
    return (
        <div>
            <Header />
            <h1>Carteira Compartilhada:</h1>
            <AllSpents />
            <Footer />
        </div>
    );
}

export default ShareWallet;