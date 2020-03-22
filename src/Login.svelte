<script>
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()

  let username
  const handleSubmit = () => dispatch('login', { username })
</script>

<style>
  main {
    background-color: var(--color-primary-light);
    margin: 3em 0;
    padding: var(--spacing);
  }
</style>

<main>
  <p> To begin, insert your name:</p>

  <form on:submit|preventDefault={handleSubmit}>
    <input
      bind:value={username}
      placeholder="Your name here"
      minlength=1
      maxlength=32
      required
    >
    <button>
      Submit
    </button>
  </form>
</main>