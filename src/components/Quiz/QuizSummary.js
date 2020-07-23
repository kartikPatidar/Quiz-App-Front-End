import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

class QuizSummary extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            score: 0,
            numberOfQuestions: 0,
            numberOfAnsweredQuestions: 0,
            correctAnswers: 0,
            wrongAnswers : 0,
            fiftyFiftyUsed: 0,
            hintsUsed: 0
         }
    }

    componentDidMount() {
        const { state } = this.props.location;
        if (state) {
            this.setState({ 
                score: (state.score / state.numberOfQuestions) * 100,
                numberOfQuestions: state.numberOfQuestions,
                numberOfAnsweredQuestions: state.numberOfAnsweredQuestions,
                correctAnswers: state.correctAnswers,
                wrongAnswers : state.wrongAnswers,
                fiftyFiftyUsed: state.fiftyFiftyUsed,
                hintsUsed: state.hintsUsed
            });
        }
    }

    render() {
        const { state } = this.props.location;
        let stats;
        if (stats !== undefined) {
            stats = (<h1>Stats is available</h1>)
        } else {
            stats = (<h1>No stats Available. Please take a quiz.</h1>)
        }
        return ( 
            <>
                <Helmet><title>Quiz Summary</title></Helmet>
                {stats}
            </>
        );
    }
}
 
export default QuizSummary;