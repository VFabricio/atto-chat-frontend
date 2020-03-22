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
      hour: 'numeric',
      minute: 'numeric',
    }
    const date = new Date(timestamp)
    return Intl.DateTimeFormat('en-US', options).format(date)
  }
</script>

<style>
  main {
    padding: var(--spacing);
  }

  .message {
    background-color: var(--color-secondary-light);
    padding: calc(var(--spacing) / 2);
    min-width: 5em;
    width: min-content;
    margin-bottom: 1em;
  }

  .sender {
    font-size: .7em;
    margin-top: 0;
  }

  .time {
    font-size: .7em;
    margin-bottom: 0;
  }

  form input{
    width: 60vw;
  }
</style>

<main>
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
        <p class="sender">{sender} said:</p>
        <p>{message}</p>
        <p class="time">{formatTime(time)}</p>
      </div>
    {/each}
  {/if}
</main>