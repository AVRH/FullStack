import React from 'react'
import ReactDOM from 'react-dom'
import './App.css';

const Button = ({handleClick, text}) => (
    <button className="button" onClick={handleClick}>
        {text}
    </button>
)

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      votes: [0,0,0,0,0,0],
      maxIndex: 0
    }
  }

  generateRandomNumber = () => {
    return Math.floor(Math.random() * (6 - 0) + 0)
  }

  buttonClick = () => {
      this.setState({selected: this.generateRandomNumber()})
    }

  voteButtonClick = (index) => {
    return () => {
    const kopio = [...this.state.votes]
    kopio[index]  += 1
    let maxIndex = this.findMaxIndex(kopio)
    this.setState({
        votes: kopio,
        maxIndex: maxIndex
    })
    }
  }

  findMaxIndex = (array) => {
      let max = Math.max.apply(null, array)
      
      function findMax(element) {
          return element === max
      }

      return array.findIndex(findMax)
      
  }

  render() {
    return (
      <div className = 'App'>
      <h1>Anecdotes about programming</h1>
      <div className='anecdote'>

        <p className='anecdoteText'>{this.props.anecdotes[this.state.selected]}</p>
        <p>has {this.state.votes[this.state.selected]} votes</p>

        <Button 
        text = "next anecdote"
        handleClick = {this.buttonClick}
      />
      <Button
        text="vote"
        handleClick = {this.voteButtonClick(this.state.selected)}
      />
      </div>
      
      <h2>Anecdote with the most votes: </h2>

      <div className='anecdote'>
      <p className='anecdoteText'>{this.props.anecdotes[this.state.maxIndex]}</p>
      <p>has {this.state.votes[this.state.maxIndex]} votes</p>
      </div>

      </div>

    )
  }
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)

