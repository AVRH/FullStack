import React from 'react';
import './App.css'
import Persons from './components/persons'
import AddForm from './components/AddForm'
import SearchForm from './components/SearhForm'
import NumberService from './services/numbers'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [ ],
      newName: 'Add a new person...',
      newNumber: 'Add phone number...',
      error: null,
      searchTerm: ''
    }
  }
  componentDidMount(){
    NumberService
      .getAll()
      .then(persons => 
        this.setState({persons})
        )
  }

  addPerson = (event) => {
    event.preventDefault()

    if(this.state.persons.map(p => p.name).indexOf(this.state.newName) !== -1){
      const response = window.confirm(`${this.state.newName} is already in the phone book, do you want to replace the phone number?`)
      if(response){
        const person = this.state.persons.find(person => person.name === this.state.newName)
        const changedPerson = {...person, number: this.state.newNumber}

        NumberService
          .changeNumber(changedPerson.id, changedPerson)
          .then(response => 
            this.setState({
              persons: this.state.persons.map(p => p.name !== changedPerson.name ? p : response),
              newName: '',
              newNumber: '',
              error: "Numero vaihdettiin onnistuneesti"
            })
            )
          .catch(error => {
            this.setState({
              error: "This person has already been deleted from the server",
              persons: this.state.persons.filter(p => p.name !== changedPerson.name)
            })
          })
          setTimeout(() => {
            this.setState({error: null})
          },5000)
      
    }
    }else{
      const newPerson = {
        name: this.state.newName,
        number: this.state.newNumber,
      }

      NumberService
        .createNew(newPerson)
        .then(addedPerson => {
          this.setState(
            {
              persons: this.state.persons.concat(addedPerson),
              newName: '',
              newNumber: '',
              searchTerm: '',
              error: "Succesfully added a new person!"
            }
          )
        })
        setTimeout(() => {
          this.setState({error: null})
        },5000)

      }
  }
  deletePerson = (name,id) => () => {
    const result = window.confirm(`Do you want to delete: '${name}'`)
    if(result){
      NumberService
        .deleteNumber(id)
        .then(response => {
          this.setState({
            persons: this.state.persons.filter(p => p.id !== id),
            error: "The person has been succesfully deleted!"
          })
        })
        setTimeout(() => {
          this.setState({error: null})
        },5000)
    }
  }

  handlePersonChange = (event) => {
    this.setState( {newName: event.target.value})
  }
  handleNumberChange = (event) => {
    this.setState({newNumber: event.target.value})
  }
  handleSearchChange = (event) => {
    this.setState({searchTerm: event.target.value})
  }
  render() {
    const showedItems = this.state.persons.filter(person => person.name.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
    return (
      <div className = "App">
        <h1>Puhelinluettelo</h1>
      <div className = "flex-container">
        
        <SearchForm
          searchTerm={this.state.searchTerm}
          handleChange={this.handleSearchChange}
        />
        <Persons persons={showedItems} handleDelete={this.deletePerson} />
        <AddForm 
          message={this.state.error}
          addPerson={this.addPerson}
          nameValue={this.state.newName}
          handlePersonChange={this.handlePersonChange}
          numberValue={this.state.newNumber}
          handleNumberChange={this.handleNumberChange}
        />

      </div>
      </div>
    )
  }
}

export default App

