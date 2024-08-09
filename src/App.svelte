<script>
  import { onMount } from 'svelte';
  import Header from './lib/Header.svelte';
  import Home from './routes/Home.svelte';
  import Organization from './routes/Organization.svelte';
  import ProposalDetail from './routes/ProposalDetail.svelte';

  let page;
  let params = {};

  let organizations = [{
      id: 1,
      name: 'DeFi Pulse',
      proposals: [
        { 
          id: 1, 
          title: 'Increase Liquidity Pool', 
          description: 'Proposal to increase the liquidity pool by 10%', 
          status: 'active',
          actions: [
            'Increase liquidity pool by 10%',
            'Adjust pool weights',
            'Update smart contract parameters'
          ],
          rationale: 'Increasing the liquidity pool will allow for larger trades with less slippage, attracting more users and improving overall market efficiency. This change is expected to boost trading volume and protocol revenue.'
        },
        {
          id: 2,
          title: 'Give Grant for SDK Development',
          description: 'Proposal to give a grant for the development of a new SDK',
          status: 'active',
          actions: [
            'Allocate $100,000 for SDK development',
          ],
          rationale: 'Hurdy gurdy'
        }
        // ... other proposals ...
      ]
    }];

  function hashchange() {
    const hash = window.location.hash.slice(1);
    const [route, id, subId] = hash.split('/');
    page = route || 'home';
    params = { id, subId };
  }

  onMount(() => {
    window.addEventListener('hashchange', hashchange);
    hashchange();
    return () => window.removeEventListener('hashchange', hashchange);
  });
</script>

<Header />
<main>
  {#if page === 'home'}
    <Home />
  {:else if page === 'organization'}
    <Organization organization={organizations[params.id-1]} />
  {:else if page === 'proposal'}
    <ProposalDetail proposal={organizations[params.id-1].proposals[params.subId-1]} />
  {:else}
    <p>404 Not Found</p>
  {/if}
</main>

<style>
  :global(body) {
    background-color: #000;
    color: #fff;
    font-family: 'Roboto Mono', monospace;
    margin: 0;
    padding: 0;
  }

  main {
    width: 100%;
    height: calc(100vh - 60px); /* Adjust based on your header height */
    overflow: hidden;
  }
</style>
<!-- 
<style>

  :global(body) {
    background-color: #000;
    color: #fff;
    font-family: 'Roboto Mono', monospace;
    margin: 0;
    padding: 0;
  }

  main {
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem;
  }
</style> -->