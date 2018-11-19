import React, { Component } from 'react';

class Home extends Component {

  // Establish state
  state = {
    currentCategory: "generalKnowledge",
    questions: [],
    currentIndex: 0
  }

  // Grab questions
  displayQuestion(data) {
    let dataArray = data.results;
    return dataArray.map((question) => {
      return question;
    });
  }

  // Fetch data from API and set state
  componentDidMount() {
    let computers = fetch(this.getCategoryUrl(this.state.currentCategory));
    computers.then((response) => {
      return response.json();
        }).then((data) => {
          this.setState({
            questions: this.displayQuestion(data)
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
              questions: this.displayQuestion(data)
            })
        }).catch(err => console.log(err));
    }
  } 
  
  // Advance to next question
  nextQuestion = () => {
    this.setState({
      currentIndex: this.state.currentIndex + 1
    }) 
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
      generalKnowledge: "https://opentdb.com/api.php?amount=25&category=9&difficulty=easy&type=multiple",
      books: "https://opentdb.com/api.php?amount=10&category=10&difficulty=easy&type=multiple",
      film: "https://opentdb.com/api.php?amount=25&category=11&difficulty=easy&type=multiple",
      computers: "https://opentdb.com/api.php?amount=25&category=18&difficulty=easy&type=multiple",
      music: "https://opentdb.com/api.php?amount=25&category=12&difficulty=easy&type=multiple",
      geography: "https://opentdb.com/api.php?amount=25&category=22&difficulty=easy&type=multiple",
      mythology: "https://opentdb.com/api.php?amount=25&category=20&type=multiple",
      videoGames: "https://opentdb.com/api.php?amount=25&category=15&difficulty=easy&type=multiple",
      boardGames: "https://opentdb.com/api.php?amount=10&category=16&difficulty=easy&type=multiple"
     }
     console.log(category);
     return categories[category];
  }

  // Category Button Names
  makeCategory = () => {
    let categoryArray = [
      'generalKnowledge',
      'books',
      'film',
      'computers',
      'music',
      'geography',
      'mythology',
      'videoGames',
      'boardGames'
    ]
    return categoryArray.map((categoryName) => {
      return <button onClick={this.category} value={categoryName}>{categoryName}</button>
    })
  }

  render() {
    // Loop through all the questions
    const currentQuestion = this.state.questions[this.state.currentIndex];
    console.log(currentQuestion);
    if (currentQuestion != null) {
      return (
        <div>
          {this.makeCategory()}
          <h1>{currentQuestion.question}</h1>
          {
            getChoices(currentQuestion).map((choice, key )=> {
              return <div key={key}><input type="radio" name="choice" value={choice}/>{choice}</div>;
            })
          }
          <button onClick={this.nextQuestion}>Next</button>
        </div>
      );
    } else {
      return <h1>Loading...</h1>;
    }

  }
}

function getChoices(question) {
    // Put all of the choices in choices array    
    let choices = [];
      
    question.incorrect_answers.map( (incorrect) => {
      return choices.push(incorrect);
    });
    
    choices.push(question.correct_answer)

    // Randomize order
    for (let a = choices.length-1; a > 0; a--) {
      let b = Math.floor(Math.random() * (a + 1));
      let c = choices[a];
      choices[a] = choices[b];
      choices[b] = c;
    }

  return choices;
}

export default Home;