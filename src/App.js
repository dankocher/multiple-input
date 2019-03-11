import React, { Component } from 'react';
import './App.css';
import MultipleInput from './components/multiple-input'

class App extends Component {

  state = {
    office: {}
  };


  onChangeMultipleInput = async (data) => {
    await this.setState(prevState => ({office: {...prevState.office, data}}));
    console.log(this.state);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div style={{width: 400, height: 400, padding: 5, backgroundColor: 'white'}}>
            <MultipleInput
                data={this.state.office.phone}
                onChange={this.onChangeMultipleInput}
                max={5}
                maxLength={20}
                placeholder={'Добавить номер'}
                size='large'
            />
          </div>
        </header>
      </div>
    );
  }
}

export default App;
