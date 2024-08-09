<script>
  import { createEventDispatcher } from 'svelte';

  export let market;
  export let action;
  export let price;
  export let userPosition = 0; // Current user position in the market

  let inputAmount = '';
  let availableAmount = 1000;
  let estimatedOutput = 0;
  let newPosition = 0;

  const dispatch = createEventDispatcher();

  function calculateEstimates() {
    if (inputAmount) {
      const amount = parseFloat(inputAmount);
      if (action === 'Long') {
        estimatedOutput = (amount / price).toFixed(4);
        newPosition = userPosition + parseFloat(estimatedOutput);
      } else {
        estimatedOutput = (amount * price).toFixed(2);
        newPosition = userPosition - amount;
      }
    } else {
      estimatedOutput = 0;
      newPosition = userPosition;
    }
  }

  function handleSubmit() {
    dispatch('trade', {
      market,
      action,
      inputAmount: parseFloat(inputAmount),
      estimatedOutput: parseFloat(estimatedOutput),
      newPosition
    });
  }

  function close() {
    dispatch('close');
  }

  $: {
    calculateEstimates();
  }
</script>

<div class="modal-backdrop" on:click|self={close}>
  <div class="modal">
    <h2>{action} {market}</h2>
    <!-- <p>Current price: ${price.toFixed(4)}</p> -->
    <form on:submit|preventDefault={handleSubmit}>
      <label>
        {action === 'Long' ? 'USDC Amount' : 'META Amount'}
        <input type="number" bind:value={inputAmount} min="0" step="0.0001" required>
      </label>
      <p>Available: {availableAmount}</p>
      <p>Estimated to receive: {estimatedOutput} {action === 'Long' ? 'META' : 'USDC'}</p>
      <p>New position after trade: {newPosition.toFixed(4)} META</p>
      <div class="button-group">
        <button type="submit">Confirm {action}</button>
        <button type="button" on:click={close}>Cancel</button>
      </div>
    </form>
  </div>
</div>

<style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .modal {
    background-color: #111;
    padding: 2rem;
    border-radius: 4px;
    width: 300px;
  }

  h2 {
    color: #FC494A;
    margin-bottom: 1rem;
  }

  form {
    display: flex;
    flex-direction: column;
  }

  label {
    margin-bottom: 1rem;
  }

  input {
    width: 100%;
    padding: 0.5rem;
    margin-top: 0.5rem;
    background-color: #222;
    border: 1px solid #444;
    color: #fff;
  }

  .button-group {
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
  }

  button {
    padding: 0.5rem 1rem;
    background-color: #FC494A;
    color: #fff;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  button:hover {
    background-color: #d63a3a;
  }

  button[type="button"] {
    background-color: #333;
  }

  button[type="button"]:hover {
    background-color: #444;
  }
</style>