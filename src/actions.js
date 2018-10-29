import Bacon from 'baconjs';

// Bus of game actions.
export const actions = new Bacon.Bus();

// Action types.
export const Action = {
  newDeck   : 'newDeck',
  drawCards : 'drawCards',
  flipCard  : 'flipCard',
};

/** Start a new game. */
export const startGame = () => {
  actions.push({
    type: Action.newDeck,
  });
};

/** Fetch new cards from api and distribute to players. */
export const drawCards = (deck_id, count) => {
  actions.push({
    type: Action.drawCards,
    deck_id,
    count,
  });
};

/** Flip card around. */
export const flipCard = (card) => {
  actions.push({
    type: Action.flipCard,
    card,
  });
};
