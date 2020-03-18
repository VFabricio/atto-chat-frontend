<script>
  import Login from './Login.svelte'
  import Chat from './Chat.svelte'

  export let state

</script>

{#if state && state.loggedIn}
  <Chat username={state.username}/>
{:else}
  <Login on:login/>
{/if}