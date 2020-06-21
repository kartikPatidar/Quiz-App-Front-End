import React,{ Component } from 'react';
import Helmet from 'react-helmet';
import M from 'materialize-css';

import questions from '../../Questions/questions.json';
import isEmpty from '../../utils/is-empty';
import correctSound from '../../assets/audio/correct.mp3';
import incorrectSound from '../../assets/audio/incorrect.mp3';
import buttonSound from '../../assets/audio/button-clicked.mp3';

class Play extends Component {
    state = {
        questions,
        currentQuestion: {},
        nextQuestion: {},
        previousQuestion: {},
        answer: '',
        numberOfQuestions: 0,
        numberOfAnsweredQuestions: 0,
        currentQuestionIndex: 0,
        score: 0,
        wrongAnswers: 0,
        hints: 5,
        fiftyFifty: 2,
        usedFiftyFifty: false,
        previousRandomNumbers: [],
        time: {
            minutes:3,
            seconds:0
        }
    };
    interval = null;

    componentDidMount() {
        const { questions, currentQuestion, previousQuestion, nextQuestion } = this.state;
        this.displayQuestions(questions, currentQuestion, nextQuestion, previousQuestion);
        this.startTimer();
    }

    displayQuestions = (questions = this.state.questions, currentQuestion, nextQuestion, previousQuestion) => {
        // let { currentQuestionIndex } = this.state;
        if(!isEmpty(this.state.questions)){
            let { currentQuestionIndex } = this.state;
            questions = this.state.questions;
            currentQuestion = questions[currentQuestionIndex];
            nextQuestion = questions[currentQuestionIndex + 1];
            previousQuestion = questions[currentQuestion - 1];
            const answer = currentQuestion.answer;
            this.setState({
                currentQuestion,
                nextQuestion,
                previousQuestion,
                numberOfQuestions: questions.length,
                answer,
                previousRandomNumbers: []
            }, () => {
                this.showOptions();
            })
        }
    };

    optionClickHandler = (e) => {
        if ( e.target.innerHTML.toLowerCase() === this.state.answer.toLowerCase() ){
            document.getElementById('correct-sound').play();
            this.correctAnswer();
        } else {
            document.getElementById('incorrect-sound').play();
            this.wrongAnswer();
        }
    }

    correctAnswer = () => {
        M.toast({
            html: 'Correct Answer!',
            classes: 'toast-valid',
            displayLength: 500
        });
        this.setState(previousState => ({
            score: previousState.score + 1,
            currentQuestionIndex: previousState.currentQuestionIndex + 1,
            numberOfAnsweredQuestions: previousState.numberOfAnsweredQuestions + 1
        }), () => {
            this.displayQuestions(this.state.questions, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion);
        });
    }

    wrongAnswer = () => {
        navigator.vibrate(1000); // Vibrates for 1000ms in mobile devices
        M.toast({
            html: 'Wrong Answer!',
            classes: 'toast-invalid',
            displayLength: 1000
        });
        this.setState(previousState => ({
            wrongAnswers: previousState.wrongAnswers + 1,
            currentQuestionIndex: previousState.currentQuestionIndex + 1,
            numberOfAnsweredQuestions: previousState.numberOfAnsweredQuestions + 1
        }), () => {
            this.displayQuestions();
        });
    }

    nextButtonHandler = () => {
        if (this.state.nextQuestion !== undefined) {
            this.playButtonSound();
            this.setState(prevState => ({
                currentQuestionIndex: prevState.currentQuestionIndex + 1
            }), () => {
                this.displayQuestions();
            });
        }
    }

    prevButtonHandler = () => {
        if (this.state.currentQuestionIndex !== 0) {
            this.playButtonSound();
            this.setState(prevState => ({
                currentQuestionIndex: prevState.currentQuestionIndex - 1
            }), () => {
                this.displayQuestions();
            });
        }
    }

    quitButtonHandler = () => {
        this.playButtonSound();
        if(window.confirm('Are you sure you want to quit?')) {
            this.props.history.push('/');
        }
    }

    playButtonSound = () => {
        document.getElementById('button-sound').play();
    }

    showOptions = () => {
        const options = Array.from(document.querySelectorAll('.option'));
        options.forEach(option => {
            option.style.visibility = 'visible';
        });
        this.setState({usedFiftyFifty: false});
    }

    hintsHandler = () => {
        if (this.state.hints > 0) {
            const options = Array.from(document.querySelectorAll('.option'));
            let indexOfAnswer;
    
            options.forEach((option, index) => {
                if (option.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) {
                    indexOfAnswer = index;
                }            
            });
    
            while(true) {
                const randomNumber = Math.round(Math.random() * 3);
                if (randomNumber !== indexOfAnswer  && !this.state.previousRandomNumbers.includes(randomNumber)) {
                    options.forEach((option, index) => {
                        if (index === randomNumber) {
                            option.style.visibility = 'hidden';
                            this.setState((prevState) => ({
                                hints: prevState.hints - 1,
                                previousRandomNumbers: prevState.previousRandomNumbers.concat(randomNumber)
                            }));
                        }
                    });
                    break;
                }
                if (this.state.previousRandomNumbers.length >=3 ) break;
            }
        }
    }

    fiftyFiftyHandler = () => {
        if (this.state.fiftyFifty > 0 && this.state.usedFiftyFifty === false) {
            const options = Array.from(document.querySelectorAll('.option'));
            const randomNumbers = [];
            let indexOfAnswer;

            options.forEach((option, index) => {
                if (option.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) {
                    indexOfAnswer = index;
                }
            });

            let count = 0;
            while(count < 2) {
                const randomNumber = Math.round(Math.random() * 3);
                if (randomNumber !== indexOfAnswer) {
                    if (randomNumbers.length < 2 && !randomNumbers.includes(randomNumber) && !randomNumbers.includes(indexOfAnswer)) {
                        randomNumbers.push(randomNumber);
                        count++;
                    } else {
                        while (true) {
                            const newRandomNumber = Math.round(Math.random() * 3);
                            if (!randomNumbers.includes(newRandomNumber) && !randomNumbers.includes(indexOfAnswer)) {
                                randomNumbers.push(newRandomNumber);
                                count++;
                                break;
                            }
                        }
                    }
                }
            }
            options.forEach((option, index) => {
                if (randomNumbers.includes(index)) {
                    option.style.visibility = 'hidden';
                }
            });
            this.setState(prevState => ({
                fiftyFifty: prevState.fiftyFifty -1,
                usedFiftyFifty: true
            }));
        }
    }

    startTimer = () => {
        const countDownTime = Date.now() + 180000;
        this.interval = setInterval(() => {
            const now = new Date();
            const distance = countDownTime - now;
            console.log(distance);
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / (1000 ));
            console.log(minutes);
            console.log(seconds);

            if(distance < 0) {
                clearInterval(this.interval);
                this.setState({
                    time: {
                        minutes: 0,
                        seconds: 0
                    }
                }, () => {
                    alert('Quiz has ended!');
                    this.props.history.push('/');
                })
            } else {
                this.setState({
                    time: {
                        minutes,
                        seconds
                    }
                });
            }
        }, 1000);
    }

    render() {
        
        const { currentQuestion, currentQuestionIndex, numberOfQuestions, hints, fiftyFifty, time} = this.state;
        return (
            <>
                <Helmet><title>Quiz Page</title></Helmet>
                <>
                    <audio id="correct-sound" src={correctSound}></audio>
                    <audio id="incorrect-sound" src={incorrectSound}></audio>
                    <audio id="button-sound" src={buttonSound}></audio>
                </>
                <div className="question">
                    <div>
                        <h2>Quiz Mode</h2>
                    </div>
                    <div className="lifeline-container">
                        <p>
                            <span onClick={this.fiftyFiftyHandler} className="mdi mdi-set-center mdi-24px lifeline-icon"></span>
                            <span className="lifeline">{fiftyFifty}</span>
                        </p>
                        <p>
                            <span onClick={this.hintsHandler} className="mdi mdi-lightbulb-on-outline mdi-24px lifeline-icon"></span>
                            <span className="lifeline">{hints}</span>
                        </p>
                    </div>
                    <div>
                        <p> 
                            <span className="left">Question :<b> {currentQuestionIndex + 1}</b> of {numberOfQuestions} </span>
                            <span className="mdi mdi-clock-outline mdi-24px right clock-icon">
                            <span className="clock-timer">{time.minutes}:{time.seconds}</span>
                            </span>
                        </p>
                    </div>
                    <h5>{currentQuestion.question}</h5>
                    <div className="options-container">
                        <p onClick={this.optionClickHandler} className="option">{currentQuestion.optionA}</p>
                        <p onClick={this.optionClickHandler} className="option">{currentQuestion.optionB}</p>
                    </div>
                    <div className="options-container">
                        <p onClick={this.optionClickHandler} className="option">{currentQuestion.optionC}</p>
                        <p onClick={this.optionClickHandler} className="option">{currentQuestion.optionD}</p>
                    </div>
                    <div className="button-container">
                        <button onClick={this.prevButtonHandler}>Previous</button>
                        <button onClick={this.nextButtonHandler}>Next</button>
                    </div>
                    <div className="quit-button-container">
                        <button onClick={this.quitButtonHandler}>Quit</button> 
                    </div>
                </div>
            </>
         );
    }
}
 
export default Play;