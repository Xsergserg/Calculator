import React from 'react';
import './App.css';

const pads = [{
  keyCode: 8,
  keyTrigger: 'AC',
  id: 'clear'
}, {
  keyCode: 111,
  keyTrigger: '/',
  id: 'divide',
  className: 'signs'
},{
  keyCode: 106,
  keyTrigger: '*',
  id: 'multiply',
  className: 'signs'
},{
  keyCode: 103,
  keyTrigger: '7',
  id: 'seven',
  className: 'nums'
},{
  keyCode: 104,
  keyTrigger: '8',
  id: 'eight',
  className: 'nums'
},{
  keyCode: 105,
  keyTrigger: '9',
  id: 'nine',
  className: 'nums'
},{
  keyCode: 109,
  keyTrigger: '-',
  id: 'subtract',
  className: 'signs'
},{
  keyCode: 100,
  keyTrigger: '4',
  id: 'four',
  className: 'nums'
},{
  keyCode: 101,
  keyTrigger: '5',
  id: 'five',
  className: 'nums'
},{
  keyCode: 102,
  keyTrigger: '6',
  id: 'six',
  className: 'nums'
},{
  keyCode: 107,
  keyTrigger: '+',
  id: 'add',
  className: 'signs'
},{
  keyCode: 97,
  keyTrigger: '1',
  id: 'one',
  className: 'nums'
},{
  keyCode: 98,
  keyTrigger: '2',
  id: 'two',
  className: 'nums'
},{
  keyCode: 99,
  keyTrigger: '3',
  id: 'three',
  className: 'nums'
},{
  keyCode: 13,
  keyTrigger: '=',
  id: 'equals'
},{
  keyCode: 96,
  keyTrigger: '0',
  id: 'zero',
  className: 'nums'
},{
  keyCode: 110,
  keyTrigger: '.',
  id: 'decimal',
  className: 'nums'
}];

const dgts = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const operands = ['-', '+', '*', '/'];
const opsWDSub = ['+', '*', '/'];
const priors = {
                '+': 1,
                '-': 1,
                '*': 2,
                '/': 2
              };
const oper = {
                '+': (x, y) => (x+y),
                '-': (x, y) => (x-y),
                '*': (x, y) => (x*y),
                '/': (x, y) => (x/y),
              }

class Pad extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      style: ['Pads', this.props.className].join(' '),
    };
    this.handleClick = this.handleClick.bind(this);
    this.styleChanger = this.styleChanger.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress(event){
    if (event.keyCode === this.props.padKey){
      this.handleClick();
    }
  }

  styleChanger() {
    document.getElementById(this.props.padId).style.backgroundColor !== 'orangered' ? document.getElementById(this.props.padId).style.backgroundColor = 'orangered' : document.getElementById(this.props.padId).style=this.state.style;
  }

  handleClick() {
    this.props.handleInput(this.props.value);
    this.styleChanger();
    setTimeout(() => this.styleChanger(), 100);
  }

  render(){
    return(
      <div id={this.props.padId} className={this.state.style} onClick={this.handleClick}>{this.props.value}</div>
    )
  }
}

class App extends React.Component {
  constructor () {
    super();
    this.state = {
      input: '',
      currentInput: '0',
      displayResult: false
    };
    this.handleCurrentInput = this.handleCurrentInput.bind(this);
    this.calculator = this.calculator.bind(this);
    this.strMod = this.strMod.bind(this);
    this.massCreator = this.massCreator.bind(this);
    this.polNotantion = this.polNotantion.bind(this);
    this.polCalc = this.polCalc.bind(this);
  }
    handleCurrentInput (num){
      if (this.state.displayResult === true){
        this.setState({displayResult: false});
        if (dgts.indexOf(num) === -1 && num !== '.'){
          this.setState(function (prevState){
            return {
              input: prevState.input + prevState.currentInput,
              currentInput: ''  
            }
          })
        }else if (num === '.'){
          this.setState({
            input: '',
            currentInput: '0.'
          });
          return;
        } else {
          this.setState({
            input: '',
            currentInput: ''
          });
        }

      }
      if (num === 'AC'){
        this.setState({
          input: '',
          currentInput: '0'
        })
        return;
      }
      if ((this.state.currentInput === '0' || (this.state.currentInput === '-' && this.state.input.slice(-1) === '-')) && (opsWDSub.indexOf(num) !== -1 || num === '=')){
        if (this.state.currentInput === '-' && this.state.input.slice(-1) === '-' && (operands.indexOf(num) !== -1)){
          this.setState(function (prevState){
            return {
              input: prevState.input.slice(0, -1),
              currentInput: num
            }
          });
        }
        return;
      }
      if (num === '-' && this.state.currentInput === '-' && (this.state.input.slice(-1) === '-' || this.state.input === '' || this.state.input.slice(-1) === '+' || this.state.input.slice(-1) === '*' || this.state.input.slice(-1) === '/')) {
        return;
      }
      if (num === '.' && this.state.currentInput.indexOf('.') !== -1) {
        return;
      }
      if (this.state.currentInput === '0'){
        if (num === '.'){
          this.setState({currentInput: '0' + num})  
        } else{
        this.setState({currentInput: num})
        }
        return;
      }
      if (dgts.indexOf(this.state.currentInput.slice(-1)) === -1 && num === '.') {
        console.log(dgts.indexOf(this.state.currentInput.slice(-1)))
        this.setState(function (prevState){
          return {
            currentInput: prevState.currentInput + '0' + num
          }
        })
        return;
      }
      if (num === '-') {
        this.setState(function (prevState){
          return {
            input: prevState.input + prevState.currentInput,
            currentInput: num
          }
        });
      return;
      }
      if (operands.indexOf(num) !== -1 && operands.indexOf(this.state.currentInput.slice(-1)) === -1){
        this.setState(function (prevState){
          return {
            input: prevState.input + prevState.currentInput,
            currentInput: num
          }
        });
        return;
      }
    if ((num === '+' || num === '/' || num === '*' || num === '-') && this.state.currentInput === '-' && this.state.currentInput.slice(-1) !== '-'){
      this.setState({currentInput: num});
        return;
      }
      if ((num === '*' || num === '+' || num === '/') && (this.state.currentInput === '/' || this.state.currentInput === '*' || this.state.currentInput === '+' || (this.state.currentInput === '-' && operands.indexOf(this.state.input.slice(-1)) === -1 && this.state.input !== ''))){
        this.setState({currentInput: num});
        return;
      }
      if (operands.indexOf(num) === -1){
        this.setState(function (prevState){
          return {
            currentInput: prevState.currentInput + num
          }
        });
      }
      if (num === '='){
        console.log('here, blya')
        this.setState(function (prevState){
          return {
            input: prevState.input + prevState.currentInput,
            currentInput: this.calculator(prevState.input + prevState.currentInput),
            displayResult: true
          }
      });
    }

    if (operands.indexOf(num) !== -1 && this.state.currentInput === '-' && operands.indexOf(this.state.input.slice(-1)) !== -1){
      this.setState(function (prevState){
        return {
          input: prevState.input.slice(0, -1),
          currentInput: num
        }
      });
    }
  }
  calculator (str) {
    let res = this.polCalc(this.polNotantion(this.massCreator(this.strMod(str))));
    return res;
  }
  strMod (str){
    str = str.slice(0, -1);
    if (str.indexOf('=') !== -1) {
      str = str.slice(str.lastIndexOf('=') + 1);
    }
    return str;
  }
  massCreator(str){
    let mass = [''];

    let m = 0;
    for (let i=0; i<str.length; i++) {
      if ((str[i] >= '0' && str[i] <= '9') || str[i] === '.' || ((i === 0 || dgts.indexOf(str[i-1]) === -1) && str[i] === '-')){
        mass[m] += str[i];
      }else{
        mass[m+=1] = str[i];
        mass[m+=1] = '';
      }
    }
    return mass;
  }
  polNotantion(mass) {
    let exMass = [];
    let stack = [];
    // eslint-disable-next-line
    mass.map((item)=>{
      if (operands.indexOf(item) === -1) {
        exMass.push(parseFloat(item));
      }else{
        if (stack.length === 0 || priors[item] > priors[stack[stack.length-1]]){
          stack.push(item);
        }else {
          for (let i=stack.length - 1; i>= 0; i--){
            if (priors[item] <= priors[stack[i]])
            {
              exMass.push(stack[i]);
              stack.pop();
            }
            if (priors[item] > priors[stack[i]] || i === 0){
              stack.push(item);
              break;
            }
          }
        }
      }
    });
    exMass= [...exMass, ...stack.reverse()];
    console.log('final exMass: ', exMass);
    return exMass;
  }
  polCalc(mass){
    let stack = [];
    let operRes = 0;
    for (let i=0; i<mass.length; i++){
      if (operands.indexOf(mass[i]) === -1){
        stack.push(mass[i]);
      } else{
        console.log(stack.length);
        operRes = oper[mass[i]](stack[stack.length-2], stack[stack.length-1]);
        stack.pop();
        stack.pop();
        stack.push(operRes);
      }
      console.log(stack);
    }
    return String(stack[0]);
  }
  render(){
    return (
      <div className="App">
        <div id="calcHead">
    <div id="input">{this.state.input+this.state.currentInput}</div>
    <div id="display">{this.state.currentInput}</div>
        </div>
        {pads.map((item, i) => {
          return (
            <Pad 
              padId={item.id}
              padKey={item.keyCode}
              value={item.keyTrigger}
              className={item.className}
              key={i}
              handleInput={this.handleCurrentInput}
            />
            )
          })
        }
      </div>
    );
  }
}

export default App;
