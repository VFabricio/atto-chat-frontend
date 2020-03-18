<script>
  import { createEventDispatcher } from 'svelte'

  export let username
  let message

<<<<<<< HEAD
  const dispatch = createEventDispatcher()
=======
  const dispatch = createEventDispatcher();
>>>>>>> 9ce980269d34e34632d26d547eadea124c96b977
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