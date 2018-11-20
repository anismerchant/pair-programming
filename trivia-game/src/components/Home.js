import React, { Component } from 'react';
import decoder from 'html-decoder';
// import Anime from 'react-anime';

class Home extends Component {

  // Establish state
  state = {
    currentCategory: "General Knowledge",
    questions: [],
    currentIndex: 0,
    score: 0
  }

  // Decode questions
  decodeQuestions(questions) {
    let result = questions.map((q) => {
      return {
        ...q, 
        question: decoder.decode(q.question),
        correct_answer: decoder.decode(q.correct_answer),
        incorrect_answers: q.incorrect_answers.map(decoder.decode)
      };
    });
    return result;
  }

  // Fetch data from API and set state
  componentDidMount() {
    let currentCategory = fetch(this.getCategoryUrl(this.state.currentCategory));
    currentCategory.then((response) => {
      return response.json();
        }).then((data) => {
          this.setState({
            questions: this.decodeQuestions(data.results)
          })
      }).catch(err => console.log(err));

  }

  // Change category and its associated questions
  componentDidUpdate(prevProps, prevState) {
    if(prevState.currentCategory !== this.state.currentCategory) {
      let computers = fetch(this.getCategoryUrl(this.state.currentCategory));
      computers.then((response) => {
        return response.json();
          }).then((data) => {
            this.setState({
              questions: this.decodeQuestions(data.results)
            })
        }).catch(err => console.log(err));
    }

    if (prevState.score !== this.state.score) {
      console.log(this.state.score);
    }
  } 
  
  // Advance to next question
  nextQuestion = () => {
    this.setState({
      currentIndex: this.state.currentIndex + 1
    })
    document.getElementById("answerStatus").innerHTML = "";
  }

  // Change category by setting current category to the one that's selected
  category = (e) => {
    this.setState({
      currentCategory: e.target.value
    })
  }

  // API endpoints of categories
  getCategoryUrl = (category) => {
    let categories = {
      "Board Games": "https://opentdb.com/api.php?amount=10&category=16&difficulty=easy&type=multiple",
      "Books": "https://opentdb.com/api.php?amount=10&category=10&difficulty=easy&type=multiple",
      "Computers": "https://opentdb.com/api.php?amount=25&category=18&difficulty=easy&type=multiple",
      "Film": "https://opentdb.com/api.php?amount=25&category=11&difficulty=easy&type=multiple",
      "General Knowledge": "https://opentdb.com/api.php?amount=25&category=9&difficulty=easy&type=multiple",
      "Geography": "https://opentdb.com/api.php?amount=25&category=22&difficulty=easy&type=multiple",
      "Music": "https://opentdb.com/api.php?amount=25&category=12&difficulty=easy&type=multiple",
      "Mythology": "https://opentdb.com/api.php?amount=25&category=20&type=multiple",
      "Video Games": "https://opentdb.com/api.php?amount=25&category=15&difficulty=easy&type=multiple",
     }
     return categories[category];
  }

  // Category Button Names
  makeCategory = () => {
    let categoryArray = [
      'Board Games',
      'Books',
      'Computers',
      'Film',
      'General Knowledge',
      'Geography',
      'Music',
      'Mythology',
      'Video Games',
    ]
    return categoryArray.map((categoryName, key) => {
      return <button key={key} onClick={this.category} value={categoryName}>{categoryName}</button>
    })
  }

  getChoices(question) {
    // Put all of the choices in choices array    
    let choices = [];
      
    question.incorrect_answers.map( (incorrect) => {
      return choices.push(incorrect);
    });
    
    choices.push(question.correct_answer);

    // Randomize order
    for (let a = choices.length-1; a > 0; a--) {
      let b = Math.floor(Math.random() * (a + 1));
      let c = choices[a];
      choices[a] = choices[b];
      choices[b] = c;
    }

  return choices;
}

getAnswer = (e) => {
  if(this.state.questions[this.state.currentIndex].correct_answer === e.target.value ) {
    // increment score in state
    this.setState({
      score: this.state.score + 100
    });
       // show correct animation
       //setImmediate(() => alert("Correct"));
       document.getElementById("answerStatus").innerHTML = "Correct";
    return;
  } else {
    // move to next question
    // show incorrect animation
    //  setImmediate(() => alert(`Nah yo fam, the correct answer is: ${this.state.questions[this.state.currentIndex].correct_answer}`));
    document.getElementById("answerStatus").innerHTML = `Nah yo fam, the correct answer is: ${this.state.questions[this.state.currentIndex].correct_answer}`;
    return;
  }
}

  render() {
    
    // Loop through all the questions
    const currentQuestion = this.state.questions[this.state.currentIndex];

    if (currentQuestion != null) {
      return (
        <div className ="trivia-game">
          <div className = "trivia-game__category">
            {this.makeCategory()}
          </div>
          
          <div className = "trivia-game__current-question">
            <h1 className = "trivia-game__current-question--heading">{currentQuestion.question}</h1>
            {
              this.getChoices(currentQuestion).map((choice, key )=> {
                return <div key={key}><button onClick={this.getAnswer} name="choice" value={choice}>{choice}</button></div>;
              })
            }
            
            <button className = "trivia-game__current-question--next" onClick={this.nextQuestion}>Next Question?</button>
            <div id="answerStatus" className = "trivia-game__current-question--answer-status"></div>
          </div>
          <div className = "trivia-game__score" >
            {this.state.score}
          </div>
        </div>
      );
    } else {
      return <h1>Loading...</h1>;
    }
  }
}

export default Home;