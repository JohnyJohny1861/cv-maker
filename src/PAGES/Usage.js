import React from 'react'
import './Usage.css';

import bg from '../assets/img/bg.jpg'

const Usage = () => {
    return (
        <div className="Usage" style={{backgroundImage: `url(${bg})`}}>
            <div className="container mt-5">
                <div className="jumbotron mt-5">
                    <h1 className="display-2 text-center">CV Maker App</h1>
                    <p className="lead text-center">Currently we have only one design and simple features (sorry for that) but you can creeate your first CV and near future we will expand and add pdf/word file maker, new designs and much more </p>
                    <hr className="my-4"/>
                    <h1 className="text-center display-4">How To Use This App</h1>
                    <ul className="list-group">
                        <li className="list-group-item">You need to sign up or sign in first to start your CV. After authentication you are directed to main page</li>
                        <li className="list-group-item">Click the edit button to build your CV</li>
                        <li className="list-group-item">You can create <i>New Section</i> like Work Experiences or Education etc.</li>
                        <li className="list-group-item">If you want to add <i>Skill Bar</i> just toggle and add you skills</li>
                        <li className="list-group-item">If you don't have any idea how CV looks you can see the <i>Example CV</i></li>
                        <li className="list-group-item">If you want to change any text just double click the text you want to change</li>
                        <li className="list-group-item">You can add fields or lists by clicking plus icon or remove by trash icon</li>
                        <li className="list-group-item">After finishing you CV don't forget to save otherwise all data will be gone to trash and you need create again.</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Usage
