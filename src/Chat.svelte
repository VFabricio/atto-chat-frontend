<script>
  import { createEventDispatcher } from 'svelte'

  export let username
  export let messages
  let message

  const dispatch = createEventDispatcher()
  const createPayload = input => ({
    message: input,
    time: Date.now(),
  })
  const handleSubmit = () => {
    dispatch('message', createPayload(message))
    message = ''
  }

  const formatTime = timestamp => {
    const options = {
      hour12: false,
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }
    const date = new Date(timestamp)
    return Intl.DateTimeFormat('en-US', options).format(date)
  }
</script>

<p>Hello, {username}!</p>

<form on:submit|preventDefault={handleSubmit}>
  <input
    bind:value={message}
    placeholder="Type your message"
  >
  <button>Send</button>
</form>

{#if messages}
  {#each messages as { message, time, sender }}
    <div class="message">
      <p>{sender} said:</p>
      <p>{message}</p>
      <p>{formatTime(time)}</p>
    </div>
  {/each}
{/if}