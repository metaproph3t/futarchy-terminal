<script>
  export let organization;
</script>

<a href="#organization/{organization.id}" class="dao-item">
  <h2>{organization.name}</h2>
  <div class="dao-stats">
    <div class="stat">
      <span class="label">Total Proposals:</span>
      <span class="value">{organization.totalProposals}</span>
    </div>
    <div class="stat">
      <span class="label">Active Proposals:</span>
      <span class="value">{organization.activeProposals}</span>
    </div>
    <div class="stat">
      <span class="label">Market Cap:</span>
      <span class="value">{organization.marketCap}</span>
    </div>
    <div class="stat">
      <span class="label">24h Volume:</span>
      <span class="value">{organization.volume24h}</span>
    </div>
  </div>
</a>

<style>
  .dao-item {
    background-color: #111;
    border: 1px solid #333;
    padding: 1rem;
    border-radius: 4px;
    cursor: pointer;
    text-decoration: none;
    color: inherit;
    display: block;
  }

  .dao-item:hover {
    background-color: #1a1a1a;
  }

  h2 {
    margin: 0 0 0.5rem 0;
    font-size: 1rem;
    color: #FC494A;
  }

  .dao-stats {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
  }

  .stat {
    font-size: 0.8rem;
  }

  .label {
    color: #888;
  }

  .value {
    color: #fff;
    font-weight: bold;
  }
</style>