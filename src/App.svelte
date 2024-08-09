<script>
  import { onMount } from "svelte";
  import Header from "./lib/Header.svelte";
  import Home from "./routes/Home.svelte";
  import Organization from "./routes/Organization.svelte";
  import ProposalDetail from "./routes/ProposalDetail.svelte";

  let page;
  let params = {};

  let organizations = [
    {
      id: 1,
      name: "DeFi Pulse",
      proposals: [
        {
          id: 1,
          title: "Increase Liquidity Pool",
          description: "Proposal to increase the liquidity pool by 10%",
          status: "active",
          actions: [
            "Increase liquidity pool by 10%",
            "Adjust pool weights",
            "Update smart contract parameters",
          ],
          rationale:
            "Increasing the liquidity pool will allow for larger trades with less slippage, attracting more users and improving overall market efficiency. This change is expected to boost trading volume and protocol revenue.",

          metric: "Price",
          markets: [
            {
              condition: "Pass",
              asset: "META",
              buyPrice: 0.66,
              sellPrice: 0.64,
              color: "#4caf50",
            },
            {
              condition: "Fail",
              asset: "META",
              buyPrice: 0.6,
              sellPrice: 0.58,
              color: "#fc494a",
            },
          ],
          positions: [
            {
              side: "Long",
              market: "Pass",
              asset: "META",
              quantity: 100,
              avg: 0.59,
              current: 0.65,
            },
            {
              side: "Short",
              market: "Fail",
              asset: "META",
              quantity: 50,
              avg: 0.64,
              current: 0.59,
            },
          ],
          trades: [
            {
              market: "Pass",
              action: "Buy",
              asset: "META",
              amount: 60,
              price: 0.58,
              total: 34.8,
            },
            {
              market: "Pass",
              action: "Buy",
              asset: "META",
              amount: 40,
              price: 0.62,
              total: 24.8,
            },
            {
              market: "Fail",
              action: "Sell",
              asset: "META",
              amount: 50,
              price: 0.64,
              total: 32,
            },
          ],
        },
        {
          id: 2,
          title: "Give Grant for SDK Development",
          description:
            "Proposal to give a grant for the development of a new SDK",
          status: "active",
          actions: ["Allocate $100,000 for SDK development"],
          rationale: "Hurdy gurdy",
          metric: "Effectiveness",
          markets: [
            {
              condition: "Give $100,000",
              asset: "E-UP",
              buyPrice: 0.76,
              sellPrice: 0.74,
              color: "#3498db",
            },
            {
              condition: "Give $100,000",
              asset: "E-DOWN",
              buyPrice: 0.22,
              sellPrice: 0.2,
              color: "#e74c3c",
            },
            {
              condition: "Give $50,000",
              asset: "E-UP",
              buyPrice: 0.84,
              sellPrice: 0.82,
              color: "#2ecc71",
            },
            {
              condition: "Give $50,000",
              asset: "E-DOWN",
              buyPrice: 0.15,
              sellPrice: 0.13,
              color: "#f39c12",
            },
          ],
          positions: [
            {
              side: "Long",
              market: "Give $100,000",
              asset: "E-UP",
              quantity: 1000,
              avg: 0.61,
              current: 0.75,
            },
            {
              side: "Short",
              market: "Give $50,000",
              asset: "E-UP",
              quantity: 2000,
              avg: 0.64,
              current: 0.83,
            },
          ],
          trades: [
            {
              market: "Pass",
              action: "Buy",
              asset: "E-UP",
              amount: 800,
              price: 0.58,
              total: 34.8,
            },
            {
              market: "Pass",
              action: "Buy",
              asset: "E-UP",
              amount: 200,
              price: 0.62,
              total: 24.8,
            },
            {
              market: "Fail",
              action: "Sell",
              asset: "E-UP",
              amount: 2000,
              price: 0.64,
              total: 32,
            },
          ],
        },
        // ... other proposals ...
      ],
    },
  ];

  function hashchange() {
    const hash = window.location.hash.slice(1);
    const [route, id, subId] = hash.split("/");
    page = route || "home";
    params = { id, subId };
  }

  onMount(() => {
    window.addEventListener("hashchange", hashchange);
    hashchange();
    return () => window.removeEventListener("hashchange", hashchange);
  });
</script>

<Header />
<main>
  {#if page === "home"}
    <Home />
  {:else if page === "organization"}
    <Organization organization={organizations[params.id - 1]} />
  {:else if page === "proposal"}
    <ProposalDetail
      proposal={organizations[params.id - 1].proposals[params.subId - 1]}
    />
  {:else}
    <p>404 Not Found</p>
  {/if}
</main>

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

<style>
  :global(body) {
    background-color: #000;
    color: #fff;
    font-family: "Roboto Mono", monospace;
    margin: 0;
    padding: 0;
  }

  main {
    width: 100%;
    height: calc(100vh - 60px); /* Adjust based on your header height */
    overflow: hidden;
  }
</style>
