import React, { Component } from 'react';
import { RunsGraph, HomeRunsGraph, RBIGraph, SLGGraph, OBPGraph } from './playerGraph';

import AsyncSelect from 'react-select/lib/Async';


export default class PlayerSearch extends Component {

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

  // componentDidMount() {
  // }

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
          if ( this.playerData !== data) {
            this.setState({playerData: data})
          }
          return data
      })
      .catch(e => e)
    if (this.state.lastInputValue !== this.state.inputValue) {
      this.setState({lastInputValue: this.state.inputValue})
    }
    console.log('fetched ' + this.state.inputValue)
  };

  loadOptions = (inputValue, callback) => {
    // setTimeout(() => {
    //   callback(this.searchPlayers(inputValue));
    // }, 1000);

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
    if (inputValue !== this.state.lastInputValue) {
      this.setState({lastInputValue: inputValue})
    }
  };

  handleInputChange = (newValue: string) => {
    const inputValue = newValue.replace(/\W/g, '');
    if (inputValue !== this.state.inputValue) {
      this.setState({inputValue: inputValue});
    }
    return inputValue;
  };

  handleSelect = (selection) => {
    console.log(selection.value + ' ' + selection.label + ' selected')
    if (this.state.selectedPlayerId !== selection.value) {
      this.setState({selectedPlayerId: selection.value})
      this.setState({selectedPlayerName: selection.label})
    }
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
        <RunsGraph 
          playerId={this.state.selectedPlayerId}
          playerName={this.state.selectedPlayerName}
        />
        <br/><br/>
        <HomeRunsGraph 
          playerId={this.state.selectedPlayerId}
          playerName={this.state.selectedPlayerName}
        />
        <br/><br/>
        <RBIGraph 
          playerId={this.state.selectedPlayerId}
          playerName={this.state.selectedPlayerName}
        />
        <br/><br/>
        <OBPGraph 
          playerId={this.state.selectedPlayerId}
          playerName={this.state.selectedPlayerName}
        />
        <br/><br/>
        <SLGGraph 
          playerId={this.state.selectedPlayerId}
          playerName={this.state.selectedPlayerName}
        />
      </div>
    );
  }
}
