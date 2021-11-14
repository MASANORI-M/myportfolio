import React from 'react';
import { FaGithub, FaFacebook } from 'react-icons/fa';

import CoverImage from '../images/cover-img.jpg';
import ProfileImage from '../images/profile-img.png';

export const Header = () => {
    return(
       <header className="main-cover" style={{backgroundImage: `url(${CoverImage})`}}>
           <div className="overlay"></div>
           <div className="container">
               <div className="display-table">
                    <div className="display-table-contents">
                        <div className="profile-thumb" style={{backgroundImage: `url(${ProfileImage})`}}></div>
                        <h1 className="title-text">MASA's</h1>
                        <h3 className="title-text">異世界から転生したエンジニア</h3>
                        <ul className="social-icons">
                            <li className="icon-link">
                                <a href="https://github.com/MASANORI-M">
                                    <FaGithub color="white" size="2rem" />
                                </a>
                            </li>
                            <li className="icon-link">
                            <li className="icon-link">
                                <a href="https://www.facebook.com/">
                                    <FaFacebook color="white" size="2rem" />
                                </a>
                            </li>
                            </li>
                        </ul>
                    </div>
               </div>
           </div>
       </header>
    );
};