<script>
  import DAOItem from './DAOItem.svelte';

  export let organizations = [];
</script>

<div class="dao-list">
  <h2>Organizations</h2>
  <div class="dao-grid">
    {#each organizations as organization (organization.id)}
      <DAOItem {organization} />
    {/each}
  </div>
</div>

<style>
  .dao-list {
    margin-top: 1rem;
  }

  h1 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: #FC494A;
  }

  .dao-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
  }
</style>