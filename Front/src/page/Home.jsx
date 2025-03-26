import React from 'react'

import Header from '../components/header';
import Footer from '../components/footer';
import AllWallets from '../components/allWallets';
import ShareWalletForm from '../components/ShareWalletForm';


function Home() {
  return (
    <div>
        <Header/>
        <ShareWalletForm />
        <AllWallets/>
        <Footer/>
    </div>
  )
}

export default Home
