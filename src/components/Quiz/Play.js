import React,{ Component } from 'react';
import Helmet from 'react-helmet';

class Play extends Component {


    increaseHandler = (counti) => {
        let newCounter = counti;
        newCounter++;
        this.setState({counter: newCounter});
    }

    render() { 
        return (
            <>
                <Helmet><title>Quiz Page</title></Helmet>
                <div className="questions">
                    <div className="lifeline-container">
                        <p>
                            <span className="mdi mdi-set-center mdi-24px lifeline-icon"></span>2
                        </p>
                        <p>
                            <span className="mdi mdi-lightbulb-on-outline mdi-24px lifeline-icon"></span>5
                        </p>
                    </div>
                    <div>
                        <p>Question : 
                            <span><b> 1</b> of 15 </span>
                            <span className="mdi mdi-clock-outline mdi-24px">2:15</span>
                        </p>
                    </div>
                    <h5>Google was founded in what year?</h5>
                    <div className="options-container">
                        <p className="option">1997</p>
                        <p className="option">1998</p>
                    </div>
                    <div className="options-container">
                        <p className="option">1999</p>
                        <p className="option">2000</p>
                    </div>
                    <div className="button-container">
                        <button>Previous</button>
                        <button>Next</button>
                        <button>Quit</button>
                    </div>
                </div>
            </>
         );
    }
}
 
export default Play;