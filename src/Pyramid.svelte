<script lang="ts">
  import Card, { CARD_WIDTH } from './Card.svelte';
  import {cumulativeSum} from './functions';
  
  export let left = 0;
  export let top = 0;
  export let cards: Array<number | undefined> = [];
  export let tryMove: (index: number) => void;

  const SIZE = 7;
  const GAP_Y = 40;
  const GAP_X = 10;

  function calculateLeft(i: number, j: number ): number {
    const jAdjusted = j - (i / 2) - 0.5
    const anchor = left + jAdjusted * CARD_WIDTH;
    const gapOffset = GAP_X * jAdjusted;
    const result = anchor + gapOffset;
    return result;
  }
</script>

<div>
  {#each {length: SIZE} as _, i}
    {#each {length: i + 1} as _, j}
      <Card on:click={() => tryMove(cumulativeSum(i, 0) + j)} top={top + GAP_Y * i} left={calculateLeft(i, j)} value={cards[cumulativeSum(i, 0) + j] ?? 0}/>
    {/each}
  {/each}
</div>

<style>

</style>