<script>
  import Login from './Login.svelte'
  import Chat from './Chat.svelte'

  let loggedIn = false

  const handleLogin = () => {
    loggedIn = true
  }
</script>

{#if !loggedIn}
  <Login on:login={handleLogin}/>
{:else}
  <Chat/>
{/if}