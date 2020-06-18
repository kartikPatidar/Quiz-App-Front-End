import React,{ Component } from 'react';
import Helmet from 'react-helmet';
import questions from '../../Questions/questions.json';
import isEmpty from '../../utils/is-empty';

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
        correctAnswers: 0,
        wrongAnswers: 0,
        hints: 5,
        fiftyFifty: 2,
        usedFiftyFifty: false,
        time: {}
    };

    componentDidMount() {
        const { questions, currentQuestion, previousQuestion, nextQuestion } = this.state;
        this.displayQuestions(questions, currentQuestion, nextQuestion, previousQuestion);
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
                answer
            })
        }
    };

    render() {
        
        const { currentQuestion } = this.state;
        return (
            <>
                <Helmet><title>Quiz Page</title></Helmet>
                <div className="question">
                    <div>
                        <h2>Quiz Mode</h2>
                    </div>
                    <div className="lifeline-container">
                        <p>
                            <span className="mdi mdi-set-center mdi-24px lifeline-icon"></span>
                            <span className="lifeline">2</span>
                        </p>
                        <p>
                            <span className="mdi mdi-lightbulb-on-outline mdi-24px lifeline-icon"></span>
                            <span className="lifeline">5</span>
                        </p>
                    </div>
                    <div>
                        <p> 
                            <span className="left">Question :<b> 1</b> of 15 </span>
                            <span className="mdi mdi-clock-outline mdi-24px right">
                            <span className="lifeline">2:15</span>
                            </span>
                        </p>
                    </div>
                    <h5>{currentQuestion.question}</h5>
                    <div className="options-container">
                        <p className="option">{currentQuestion.optionA}</p>
                        <p className="option">{currentQuestion.optionB}</p>
                    </div>
                    <div className="options-container">
                        <p className="option">{currentQuestion.optionC}</p>
                        <p className="option">{currentQuestion.optionD}</p>
                    </div>
                    <div className="button-container">
                        <button>Previous</button>
                        <button>Next</button>
                    </div>
                    <div className="quit-button-container">
                        <button>Quit</button> 
                    </div>
                </div>
            </>
         );
    }
}
 
export default Play;