import React, { Component } from 'react';
import { WinsGraph, KsGraph } from './playerGraph';

import AsyncSelect from 'react-select/lib/Async';


export default class PlayerSearchP extends Component {

  constructor(props) {
    super(props);

    // inputValue: null
    this.state = {
      inputValue: null,
      lastInputValue: null,
      playerData: null,
      selectedPlayer: null,
      runsData: null
    };

    this.searchPlayers = this.searchPlayers.bind(this);
    this.loadOptions = this.loadOptions.bind(this);
  }

  searchPlayers() {
    console.log(this.state.inputValue + ' - ' + this.state.lastInputValue)
    if (this.state.inputValue === this.state.lastInputValue) {
      console.log('duplicate')
      return null
    }
    console.log('searching ' + this.state.inputValue)
    fetch(`http://127.0.0.1:5001/api/search_players/` + this.state.inputValue)
      .then(response => response.json())
      .then(data => {
          this.setState({playerData: data})
          return data
      })
      .catch(e => e)
    this.setState({lastInputValue: this.state.inputValue})
    console.log('fetched ' + this.state.inputValue)
  };

  loadOptions = (inputValue, callback) => {

    if (inputValue.length < 3) {
      console.log(inputValue + ' too short')
      return null      
    }

    console.log(inputValue + ' - ' + this.state.lastInputValue)
    if (inputValue === this.state.lastInputValue) {
      console.log('duplicate')
      return null
    }

    console.log('searching ' + inputValue)
    fetch(`http://127.0.0.1:5001/api/search_players/` + inputValue)
      .then(response => response.json())
      .then(data => callback(data))
      .catch(e => e)
    this.setState({lastInputValue: inputValue})
  };

  handleInputChange = (newValue: string) => {
    const inputValue = newValue.replace(/\W/g, '');
    this.setState({inputValue: inputValue});
    return inputValue;
  };

  handleSelect = (selection) => {
    console.log(selection.value + ' ' + selection.label + ' selected')
    this.setState({selectedPlayerId: selection.value})
    this.setState({selectedPlayerName: selection.label})
    // console.log(selection)
  }

  render() {
    return (
      <div>
        <AsyncSelect
          cacheOptions
          loadOptions={this.loadOptions}
          // defaultOptions={this.defopt}
          onInputChange={this.handleInputChange}
          onChange={this.handleSelect}
        />
        <br/>
        <WinsGraph 
          playerId={this.state.selectedPlayerId}
          playerName={this.state.selectedPlayerName}
        />
        <br/>
        <KsGraph 
          playerId={this.state.selectedPlayerId}
          playerName={this.state.selectedPlayerName}
        />
      </div>
    );
  }
}
