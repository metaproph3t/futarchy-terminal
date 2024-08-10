<script>
  import { onMount } from 'svelte';
  import DAOList from '../lib/DAOList.svelte';
  import { walletStore } from '@aztemi/svelte-on-solana-wallet-adapter-core';
  // import { FutarchyRPCClient } from '@metadaoproject/futarchy-sdk';

  let organizations = [];

  // let rpcClient = new FutarchyRPCClient();
  // console.log(rpcClient)

  onMount(async () => {
    // Simulate fetching data from an API
    organizations = [
      {
        id: 1,
        name: 'DeFi Pulse',
        totalProposals: 15,
        activeProposals: 3,
        marketCap: '$1.2B',
        volume24h: '$45M',
      },
      // Add more organizations here
    ];
  });

  $: if ($walletStore.connected) {
    console.log("Wallet connected, fetching organizations...");
    console.log($walletStore);
    // fetchOrganizations().then(data => {
    //   organizations = data;
    // });
  } else {
    console.log("Wallet disconnected, clearing organizations...");
    // organizations = [];
  }
</script>

{#if $walletStore.connected}
  <p>Connected to wallet: {$walletStore.wallet?.name}</p>
{:else}
  <p>Not connected to a wallet</p>
{/if}

<DAOList {organizations} />