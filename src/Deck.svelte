<script lang="ts">
  import Card from './Card.svelte';

  export let left = 0;
  export let top = 0;
  export let cards: number[] = [];
</script>

<Card {...{left, top}} on:click value={cards[cards.length - 1]}/>

<style>

</style>

