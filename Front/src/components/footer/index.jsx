import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons'

import './footer.css'


function Footer() {
    return (
        <div className='Footer'>

            <div className='Column'>
                <div className='ColumnContent'>
                    <h1>Company</h1>
                    <nav>
                        <a href="">About Us</a>
                        <a href="">Our Services</a>
                        <a href="">Privacy Policy</a>
                        <a href="">Afiliate Program</a>
                    </nav>
                </div>
            </div>

            <div className="Column">
                <div className='ColumnContent'>
                    <h1>Get Help</h1>
                    <nav>
                        <a href="">FAQ</a>
                        <a href="">Payment Options</a>
                        <a href="">Privacy Policy</a>
                        <a href="">Afiliate Program</a>
                    </nav>
                </div>
            </div>

            <div className="Column">
                <div className='ColumnContent'>
                    <h1>Online Shop</h1>
                    <nav>
                        <a href="">Watch</a>
                        <a href="">Our Services</a>
                        <a href="">Privacy Policy</a>
                        <a href="">Afiliate Program</a>
                    </nav>
                </div>
            </div>

            <div className="Column">
                <div className='ColumnMedia'>
                    <h1>Follow Us</h1>
                    <nav>
                        <a href="">
                            <FontAwesomeIcon icon={faFacebook} className='FaIcon' />
                        </a>
                        <a href="">
                            <FontAwesomeIcon icon={faTwitter} className='FaIcon' />
                        </a>
                        <a href="">
                            <FontAwesomeIcon icon={faInstagram} className='FaIcon'/>
                        </a>
                        <a href="">
                            <FontAwesomeIcon icon={faLinkedinIn} className='FaIcon'/>
                        </a>
                    </nav>
                </div>
            </div>



        </div>
    )
}

export default Footer
