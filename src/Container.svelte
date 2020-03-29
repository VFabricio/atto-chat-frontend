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
   flex: 0 0 100px;
 }

 main {
   width: 100%;
   flex: 1 1 auto;
   overflow: hidden;
 }

</style>

<div class="container">
  {#if state && state.loggedIn}
    <main>
      <Chat on:message messages={state.messages} username={state.username}/>
    </main>
  {:else}
    <header>
      <Header/>
    </header>
    <main>
      <Login on:login/>
    </main>
  {/if}
</div>