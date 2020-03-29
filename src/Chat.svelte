<script>
  import { afterUpdate, createEventDispatcher } from 'svelte'

  export let username
  export let messages
  let message

  const dispatch = createEventDispatcher()
  const createPayload = input => ({
    message: input,
    time: Date.now(),
  })
  const handleSubmit = () => {
    if (message.trimStart()) {
      dispatch('message', createPayload(message))
      message = ''
    }
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

  const scrollMessages = () => {
    const messagesArea = document.querySelector('.messages')
    const { height } = messagesArea.getBoundingClientRect()
    messagesArea.scrollBy({ top: height, behavior: 'smooth' })
  }

  afterUpdate(scrollMessages)
</script>

<style>
  .contents {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    height: 100%;
  }

  .name-display {
    height: 25px;
    padding: var(--spacing);
  }

  .messages {
    flex-grow: 1;
    flex-shrink: 1;
    width: 100%;
    overflow: auto;
    margin: 20px 0;
    padding-top: 10px;
    padding-left: var(--spacing)
  }

  .message {
    background-color: var(--color-secondary-light);
    padding: calc(var(--spacing) / 2);
    margin-bottom: 1em;
    border-radius: 8px;
    max-width: max-content;
    min-width: 10em;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3)
  }

  .sender {
    font-size: .7em;
    margin-top: 0;
  }

  .time {
    font-size: .7em;
    margin-bottom: 0;
  }

  form {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 15px var(--spacing);
    background-color: var(--color-primary-dark)
  }

  form button {
    margin: 0 0 0 10px;
    border-radius: 6px;
    background-color: var(--color-primary-light)
  }

  form input{
    margin: 0;
    border-radius: 8px;
    flex-grow: 1;
  }

  p {
    margin: 0;
  }
</style>

<div class="contents">
  <p class="name-display">You are logged in as {username}!</p>

  <div class="messages">
    {#if messages}
      {#each messages as { message, time, sender }}
        <div class="message">
          <p class="sender">{sender} said:</p>
          <p>{message}</p>
          <p class="time">{formatTime(time)}</p>
        </div>
      {/each}
    {/if}
  </div>

  <form on:submit|preventDefault={handleSubmit}>
    <input
      aria-label="Type your message"
      bind:value={message}
      placeholder="Type your message"
    >
    <button>Send</button>
  </form>
</div>