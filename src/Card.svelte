<script lang="ts" context="module">
  export const CARD_WIDTH = 60;
  export const CARD_HEIGHT = 84;
</script>

<script lang="ts">
  import { interpretValue, valueToCardText } from './functions';
  export let left = 0;
  export let top = 0;
  export let value: number;
</script>

{#if value !== -1}
  <div class='card' on:click style={`left: ${left}px; top: ${top}px; background-color: ${interpretValue(value)[1]}`}>
    <p class='cardText'>
      {valueToCardText(value)}
    </p>
  </div>
{/if}

<style>
  .card {
    position: absolute;
    width: 60px;
    height: 84px;
    padding: 0px;
    background-color: #aaaaaa;
    /* border: 1px solid white; */
    border-radius: 4px;
    filter: drop-shadow(0px 0px 4px #1f2030aa);
  }

  .cardText {
    margin-block: 0px;
    padding: 8px 0px;
    color: white;
    font-size: 22px;
    user-select: none;
  }
</style>