import React, { Component } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Label, Legend, Text } from 'recharts';

class PlayerGraph extends Component {

    constructor(props) {
      super(props);

      this.state = {
        selectedPlayerId: undefined,
        selectedPlayerName: undefined,
        lastPlayerId: undefined,
        chartData: [],
      };

      this.populateGraph = this.populateGraph.bind(this);
      this.loadData = this.loadData.bind(this);
      this.url = 'http://127.0.0.1:5001/api'
    }

    populateGraph(data, selectedPlayerId) {
      console.log('populateGraph')
      if (selectedPlayerId !== this.state.lastPlayerId) {
        console.log('new player ' + selectedPlayerId)
        this.setState({ lastPlayerId: selectedPlayerId})
      }
      if (data !== this.state.chartData) {
        console.log('new chartData')
        this.setState({ chartData: data})
      }
    }

    loadData(playerId) {
      if (playerId === this.state.lastPlayerId) {
          console.log('No change ' + playerId)
          return null
      }

      console.log('last player ' + this.state.lastPlayerId)
      fetch(this.url + '/' + this.endpoint + '/' + playerId)
        .then(response => response.json())
        .then(data => this.populateGraph(data, playerId))
        .catch(e => e)

      return null
    }

    // <Legend align="right" verticalAlign="middle" layout="vertical" height={36} margin={{ left: 20 }}/>

    render() {
        console.log('render', this.props.playerId, this.props.playerName)
        this.loadData(this.props.playerId)
        if (this.props.playerId === null || this.props.playerId === undefined) {
            console.log('selected player ID null or undefined')
            return null
        } else {
          return (
            <table>
            <tr><td align='Center'><font color='#000000'>{this.title}</font></td></tr>
            <tr><td>
              <LineChart width={1000} height={400} data={this.state.chartData} margin={{ top: 20, right: 0, bottom: 5, left: 0 }}>
                <Label value="Runs per At Bat" offset={0} />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <Line type="monotone" dataKey="league" stroke="#888888" dot={false}/>
                <Line type="monotone" dataKey="player" stroke={this.lineColor} dot={false}/>
                <XAxis dataKey="date" />
                <YAxis />           
                <Legend />
                <Tooltip />
              </LineChart>
            </td></tr></table>
          )
        }
    }
}

export class RunsGraph extends PlayerGraph {
  constructor(props) {
    super(props);
    this.endpoint =  'get_player_runs'
    this.lineColor =  "#0000AA"
    this.title = 'Runs per At Bat'
  }
}

export class HomeRunsGraph extends PlayerGraph {
  constructor(props) {
    super(props);
    this.endpoint = 'get_player_home_runs'
    this.lineColor = "#AA0000"
    this.title = 'Home Runs per At Bat'
  }
}

export class RBIGraph extends PlayerGraph {
  constructor(props) {
    super(props);
    this.endpoint = 'get_player_rbi'
    this.lineColor = "#00AA00"
    this.title = 'RBI per At Bat'
  }
}

export class OBPGraph extends PlayerGraph {
  constructor(props) {
    super(props);
    this.endpoint = 'get_player_obp'
    this.lineColor = "#AA00AA"
    this.title = 'On Base Percentage'
  }
}

export class SLGGraph extends PlayerGraph {
  constructor(props) {
    super(props);
    this.endpoint = 'get_player_slg'
    this.lineColor = "#00AAAA"
    this.title = 'Slugging Percentage'
  }
}

export class WinsGraph extends PlayerGraph {
  constructor(props) {
    super(props);
    this.endpoint = 'get_player_wins'
    this.lineColor = "#AA0000"
    this.title = 'Wins per Appearance'
  }
}

export class KsGraph extends PlayerGraph {
  constructor(props) {
    super(props);
    this.endpoint = 'get_player_ks'
    this.lineColor = "#0000AA"
    this.title = 'Strikeouts per Inning'
  }
}
