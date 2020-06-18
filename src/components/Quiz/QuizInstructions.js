import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
 
const quizInstructions = () => ( 
        <>
            <Helmet><title>Quizzee-Instructions</title></Helmet>
            <div className="instructions container">
                <h1>How to play the Game</h1>
                <p>Ensure you read this guide from start to finish.</p>
                <ul className="browser-default" id="main-list">
                    <li>The game has a duration of 15 minutes and ends as soon as your time elapses.</li>
                    <li>Each game consists of 15 questions.</li>
                    <li>Every question contains 4 options.</li>
                    <li>Select the option which best answers the question by clicking it.</li>
                    <li>Each game has 2 lifelines namely:</li>
                        <ul id="sublist">
                            <li>2 50-50 chances</li>
                            <li>5 Hints</li>
                        </ul>
                    <li>Selecting a 50-50 lifeline by clicking the 
                        <span className="mdi mdi-set-center mdi-24px lifeline-icon"></span>
                        icon will remove 2 wrong answers,leaving the correct and one incorrect option.</li>
                    <li>Using a hint by clicking the 
                        <span className="mdi mdi-lightbulb-on mdi-24px lifeline-icon"></span>
                        icon will remove one wrong answer leaving two wrong and one correct option.</li>
                    <li>Feel free to quit the game at any time. In that case your score will be revealed afterwards.</li>
                    <li>The timer starts as soon as the game loads.</li>
                    <li>Let's do this if you think you've got what it takes?</li>
                </ul>
                <div>
                    <span className="left"><Link to="/">No take me back</Link></span>
                    <span className="right"><Link to="/play/quiz">Okay, Let's do this</Link></span>
                </div>
            </div>
        </>
);

 
export default quizInstructions;