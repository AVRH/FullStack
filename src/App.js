import React from 'react';
import axios from 'axios';
import './App.css'
import Country from './components/Country'
import Search from './components/Search'



class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      searchTerm: '',
      countries: [],
      showIndex: null
    }
  }
  componentDidMount(){
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => 
        this.setState({countries: response.data })
      )
  }

  onCountryClick = (name) => () => {
      this.setState({searchTerm: name})
  }
  

  onSearchChange = (event) => {
    this.setState({searchTerm:event.target.value})
  }

  render() {
    const showedCountries = this.state.countries.filter(country => country.name.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
    return (
      <div className="App">
        find countries: <input
        value = {this.state.searchTerm}
        onChange = {this.onSearchChange}
         />
         {showedCountries.length === 1 ? <Country country={showedCountries[0]}/> : <Search countries={showedCountries} handleCountryClick={this.onCountryClick}/>}
         
      </div>
    );
  }
}

export default App;
