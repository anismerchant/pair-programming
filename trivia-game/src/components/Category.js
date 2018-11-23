import React, { Component } from 'react';
import decoder from 'html-decoder';

class Home extends Component {

  // Establish state
  state = {
    currentCategory: "General Knowledge",
    questions: [],
    resultMessage: "",
    currentIndex: 0,
    score: 0
  }

  // Decode questions
  processQuestions(questions) {
    return questions.map((q) => {
      let decoded = {
        ...q, 
        question: decoder.decode(q.question),
        correct_answer: decoder.decode(q.correct_answer),
        incorrect_answers: q.incorrect_answers.map(decoder.decode),
      };

      decoded.choices = this.getChoices(decoded);
      return decoded;
    });
  }

  // Fetch data from API and set state
  componentDidMount() {
    let currentCategory = fetch(this.getCategoryUrl(this.state.currentCategory));
    currentCategory.then((response) => {
      return response.json();
        }).then((data) => {
          this.setState({
            questions: this.processQuestions(data.results)
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
              questions: this.processQuestions(data.results)
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
      return <button className = "trivia-game__category--buttons" key={key} onClick={this.category} value={categoryName}>{categoryName}</button>
    })
  }

  getChoices(question) {
    // Put all of the choices in choices array    
    let choices = [];
      
    question.incorrect_answers.map( (incorrect) => {
      return choices.push({
        choiceText: incorrect,
        isSelected: false,
        isCorrect: false 
        });
    });
    
    choices.push({
      choiceText: question.correct_answer,
      isSelected: false,
      isCorrect: true
    });

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
      // e.target.style.color = '#32CD32';
      // e.target.style.borderColor = '#FF1461';
      this.setState({
        score: this.state.score + 100
      });
      this.setState({
        resultMessage: "Correct"
      });
      let intervalId = setInterval(() => {
        let elem = document.getElementById('score');
        elem.innerHTML = Number(elem.innerHTML) + 1;
        if(Number(elem.innerHTML) === this.state.score) {
          clearInterval(intervalId);
          setTimeout(() =>{
            this.nextQuestion()
          }, 3000);
        }
      }, 10);        
    } else {
      // e.target.style.color = '#FF1461';
      // e.target.style.borderColor = '#FF1461';
      this.setState({
        resultMessage: `The correct answer is: ${this.state.questions[this.state.currentIndex].correct_answer}`
      })
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
            <div className = "trivia-game__current-question--heading-container">
              <h1 className = "trivia-game__current-question--heading">{currentQuestion.question}</h1>
            </div>
            <div className = "trivia-game__current-question__buttons">
              {
                currentQuestion.choices.map((choice, key ) => {
                  // TODO write a function that returns the className string for the `button` given the choice object
                  // if the choice object isSelected and isCorrect, add a class name that makes the button red, otherwise just return "trivia-game__current-question__buttons--choices"
                  return <button className={"trivia-game__current-question__buttons--choices"} key={key} onClick={this.getAnswer} name="choice"  value={choice.choiceText}>{choice.choiceText}</button>;
                })
              }
              <button className = "trivia-game__current-question__buttons--next" onClick={this.nextQuestion}>Next Question</button>
            </div>
            <div id="answerStatus" className = "trivia-game__current-question--answer-status">{this.state.resultMessage}</div>
          </div>
          <div className = "trivia-game__score" >
            <h1 className="trivia-game__score--heading">Score: <span id='score'>0</span></h1>
          </div>
        </div>
      );
    } else {
      return <h1>Loading...</h1>;
    }
  }
}

export default Home;