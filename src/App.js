import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'; 
import Home from './components/Home';
import QuizInstructions from './components/Quiz/QuizInstructions';
import Play from './components/Quiz/Play';
import QuizSummary from './components/Quiz/QuizSummary';

function App() {
  return (
    <Router>
      <Route path="/" exact component={Home} />
      <Route path="/play/instructions" exact component={QuizInstructions} />
      <Route path="/play/quiz" exact component={Play} />
      <Route path="/play/quizSummary" exact component={QuizSummary} />
    </Router>
  );
}

export default App;
