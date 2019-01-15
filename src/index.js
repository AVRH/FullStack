import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({text}) => (
    <div>
        <h1>{text}</h1>
    </div>
)
const Button = ({handleClick, text}) => (
    
    <button onClick={handleClick}>
        {text}
    </button>
    

)
const Statistics = ({arvot}) => {
    const [hyva, neutraali, huono, keskiarvo,positiivisia] = arvot
    
    if(hyva+huono+neutraali === 0){
        return(
            <div>
                <p>Paina nappeja antaaksesi palautetta</p>
            </div>
        )
    }
    else{
    return (
    <table>
        <tbody>
            <StatItem text="hyva" value={hyva} />
            <StatItem text="neutraali" value={neutraali}/>
            <StatItem text="huono" value={huono}/>
            <StatItem text="keskiarvo" value={keskiarvo}/>
            <StatItem text="positiivisia" value={positiivisia}/>
        </tbody>
    </table>
    )
    }
    }
const StatItem = ({text, value}) => (
    <tr>
        <td>{text}</td>
        <td>{value}</td>
    </tr>
)

class App extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            hyva: 0,
            neutraali: 0,
            huono: 0,
            keskiarvo: 0,
            positiivisia: 0,
        }
    }

    //Button event handlers
    //set counters to counter + 1
   
    annaPalautetta = (mika, arvo) => {
        return () => {
            this.setState({[mika]: arvo})
            this.laskeKeskiarvo()
            this.laskePositiivisia()
        }
    }

    laskeKeskiarvo = () => {
        this.setState({keskiarvo: (this.state.hyva-this.state.huono)/(this.state.hyva+this.state.huono+this.state.neutraali)})
    }
    laskePositiivisia = () => {
        this.setState({positiivisia: (this.state.hyva/(this.state.hyva+this.state.neutraali+this.state.huono))*100+"%"})
        
    }
    render(){
        console.log(this.state.hyva)
        return(
        <div>
            <Header text="anna palautetta"/>
            <Button 
                text="hyva"
                handleClick = {this.annaPalautetta("hyva", this.state.hyva+1)}/>
            <Button 
                text="neutraali"
                handleClick = {this.annaPalautetta("neutraali", this.state.neutraali+1)}/>
            <Button
                 text="huono"
                 handleClick = {this.annaPalautetta("huono", this.state.huono+1)}/>
            <Header text="statistiikka" />
            <Statistics arvot = {[this.state.hyva, this.state.neutraali, this.state.huono, this.state.keskiarvo, this.state.positiivisia]} />
            
        </div>
        )
    }
}
ReactDOM.render(<App />, document.getElementById('root'));


