<script>
  import { onMount } from 'svelte'
  import initializeObservables from './observables'
  import Container from './Container.svelte'

  let container

  let state$

  onMount(() => {
    state$ = initializeObservables(container)
  })
</script>

<Container bind:this={container} state={$state$}/>