<script>
  import { createEventDispatcher } from 'svelte'

  export let username
  let message

  const dispatch = createEventDispatcher();
  const createPayload = input => ({
    message: input,
    time: Date.now(),
  })
  const handleSubmit = () => dispatch('message', createPayload(message))
</script>

<p>Hello, {username}!</p>

<form on:submit|preventDefault={handleSubmit}>
  <input
    bind:value={message}
    placeholder="Type your message"
  >
  <button>Send</button>
</form>