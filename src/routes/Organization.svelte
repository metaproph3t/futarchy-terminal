<script>
  import { onMount } from 'svelte';
  import OrganizationDetails from '../lib/OrganizationDetails.svelte';

  export let organization;
    
</script>

<a href="#home">Back to List</a>

{#if organization}
  <OrganizationDetails {organization} />
{:else}
  <p>Loading...</p>
{/if}

<style>
  a {
    display: inline-block;
    background-color: #FC494A;
    color: #fff;
    text-decoration: none;
    padding: 0.5rem 1rem;
    margin-bottom: 1rem;
    border-radius: 4px;
  }
</style>