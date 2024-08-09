<script>
  export let organization;

  let activeTab = 'active';

  $: activeProposals = organization.proposals.filter(p => p.status === 'active');
  $: archivedProposals = organization.proposals.filter(p => p.status === 'archived');
</script>

<div class="org-details">
  <h2>{organization.name}</h2>
  
  <div class="tabs">
    <button class:active={activeTab === 'active'} on:click={() => activeTab = 'active'}>
      Active Proposals ({activeProposals.length})
    </button>
    <button class:active={activeTab === 'archived'} on:click={() => activeTab = 'archived'}>
      Archived Proposals ({archivedProposals.length})
    </button>
  </div>

  <div class="proposals">
    {#if activeTab === 'active'}
      {#each activeProposals as proposal}
        <a href="#proposal/{organization.id}/{proposal.id}" class="proposal">
          <h3>{proposal.title}</h3>
          <p>{proposal.description}</p>
        </a>
      {/each}
    {:else}
      {#each archivedProposals as proposal}
        <a href="#proposal/{organization.id}/{proposal.id}" class="proposal">
          <h3>{proposal.title}</h3>
          <p>{proposal.description}</p>
        </a>
      {/each}
    {/if}
  </div>
</div>

<style>
  .org-details {
    background-color: #111;
    padding: 1rem;
    border-radius: 4px;
  }

  h2 {
    color: #FC494A;
    margin-bottom: 1rem;
  }

  .tabs {
    display: flex;
    margin-bottom: 1rem;
  }

  button {
    background-color: #222;
    color: #fff;
    border: none;
    padding: 0.5rem 1rem;
    margin-right: 0.5rem;
    cursor: pointer;
  }

  button.active {
    background-color: #FC494A;
  }

  .proposal {
    display: block;
    text-decoration: none;
    color: inherit;
    background-color: #1a1a1a;
    padding: 1rem;
    margin-bottom: 1rem;
    border-radius: 4px;
  }

  h3 {
    color: #FC494A;
    margin-bottom: 0.5rem;
  }

  p {
    color: #ccc;
    font-size: 0.9rem;
  }
</style>