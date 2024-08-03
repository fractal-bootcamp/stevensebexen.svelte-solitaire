<script lang="ts">
  import Deck from './Deck.svelte';
  import Pyramid from './Pyramid.svelte';
  import { CARD_WIDTH } from './Card.svelte';
  import { toPyramidCoords, fromPyramidCoords, cardsAdjacent } from './functions';

  export let init;
  $: if (init) start();

  let pyramid: Array<number | undefined> = Array(28).fill(0);
  let deck: number[] = [];
  let waste: number[] = [];

  function start() {
    let cardPool = Array(52).fill(0).map((_, i) => i);
    pyramid.forEach((_, i) => {
      const choice = Math.floor(Math.random() * cardPool.length);
      pyramid = pyramid.with(i, cardPool[choice]);
      cardPool = [...cardPool.slice(0, choice), ...cardPool.slice(choice + 1)];
    });
    deck = cardPool.slice(1);
    waste = [cardPool[0]];
    shuffle(deck);
  }

  function drawCard() {
    if (deck.length <= 0) return;
    waste = [...waste, deck[deck.length - 1]];
    deck = deck.slice(0, deck.length - 1);
  }

  function shuffle(arr: number[]) {
    let currentIndex = arr.length;
    while (currentIndex != 0) {

      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [arr[currentIndex], arr[randomIndex]] = [
        arr[randomIndex], arr[currentIndex]];
    }
  }
  
  

  function isUncovered(index: number): boolean {
    const [i, j] = toPyramidCoords(index);
    if (i === 6) return true;
    const [x0, x1] = [fromPyramidCoords(i + 1, j), fromPyramidCoords(i + 1, j + 1)];
    if (pyramid[x0] !== -1 || pyramid[x1] !== -1) return false;
    return true;
  }

  function tryMove(index: number) {
    if (pyramid[index] === undefined) return;
    if (!isUncovered(index)) return;
    if (!cardsAdjacent(pyramid[index], waste[waste.length - 1])) return;
    waste = [...waste, pyramid[index]];
    pyramid = pyramid.with(index, -1);
  }
</script>

<div class='game-container'>
  <Deck left={400 - CARD_WIDTH - 10} top={370} on:click={drawCard} cards={deck}/>
  <Deck left={400} top={370} cards={waste}/>
  <Pyramid left={400} top={20} cards={pyramid} {tryMove} />
  <p class='cards-remaining'>Remaining: {deck.length}</p>
</div>

<style>
  .game-container {
    position: relative;
    width: 800px;
    height: 600px;
    outline: solid 2px #aaaaaa;
  }

  .cards-remaining {
    position: absolute;
    text-align: center;
    width: 100%;
    left: -5px;
    top: 440px;
    font-size: 20px;
    user-select: none;
  }
</style>