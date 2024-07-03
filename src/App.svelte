<script lang="ts">
  import Game from './Game.svelte';
  let view = 'default';
  let init = 0;

  function startGame() {
    view = 'game';
    init++;
  }
</script>

<main>
  {#if view === 'default'}
    <h1>Welcome!</h1>
    <p>To start a new game, click <button class='new-game' on:click={startGame}>here!</button></p>
  {:else if view === 'game'}
    <Game {init}/>
  {/if}
</main>

<style>
  .new-game {
    color: #bc7df4;
    cursor: pointer;
    background-color: #00000000;
    padding: 0;
    border: none;
    outline: none;
  }
</style>
