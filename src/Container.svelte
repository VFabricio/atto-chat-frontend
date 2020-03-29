<script>
  import Header from './Header.svelte'
  import Login from './Login.svelte'
  import Chat from './Chat.svelte'

  export let state
</script>

<style>
 .container {
   display: flex;
   flex-direction: column;
   align-items: center;
   width: 100%;
   height: 100%;
 }

 header {
   width: 100%;
   height: 100px;
 }

 main {
   width: 100%;
   flex-grow: 1;
 }

</style>

<div class="container">
  <header>
    <Header/>
  </header>
  <main>
    {#if state && state.loggedIn}
      <Chat on:message messages={state.messages} username={state.username}/>
    {:else}
      <Login on:login/>
    {/if}
  </main>
</div>