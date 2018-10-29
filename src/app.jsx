// WEBPACK DIRECTIVES
// Static imports via file-loader.
import '../style/style.scss';
import '../templates/index.html';
// Require entire static directory from project root.
require.context('../static', true, /^\.\/.*\.*/);

import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';

import { Board, Card, Hand, Tophat} from 'components';
import { flipCard } from 'actions';
import { cardFlips, decks, piles, scores } from 'game';
import { INITIAL_STATE, PLAYERS } from 'constants.js';

const log = x => { console.log(x) };

class App extends React.Component {

  constructor() {
    super();
    this.state = _.extend({}, INITIAL_STATE());
  };

  componentDidMount() {
    // State updates from game logic.
    piles.onValue(piles => {
      this.setState({ piles });
    });
    decks.onValue(deck => {
      this.setState({ deck });
    });
    scores.onValue(scores => {
      this.setState({ scores });
    });
    cardFlips.onValue(action => {
      this.setState({
        piles: _.extend({}, this.state.piles),
      });
    })
  }

  render() {
    const deck_id = _.get(this.state, 'deck.deck_id', 'no deck loaded');
    return (
      <div>
        <Tophat />
        <Board deck={this.state.deck}>
        {
          _.map(PLAYERS, (player, index) => (
            <Hand key={index} playerName={player} cards={this.state.piles[player]} score={this.state.scores[player]}>
              {
                _.map(this.state.piles[player], (card, index) =>
                  <Card key={index} flipCard={flipCard} card={card} />)
              }
            </Hand>))
        }
        </Board>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('react-main-app')
);
