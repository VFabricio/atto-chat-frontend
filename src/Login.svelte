<script>
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()

  let username
  const handleSubmit = () => dispatch('login', { username })
</script>

<form on:submit|preventDefault={handleSubmit}>
  <input
    bind:value={username}
    placeholder="Insert your name"
    minlength=1
    maxlength=32
    required
  >
  <button>
    Submit
  </button>
</form>