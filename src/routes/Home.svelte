<script>
  import { onMount } from 'svelte';
  import DAOList from '../lib/DAOList.svelte';

  let organizations = [];

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
</script>

<DAOList {organizations} />