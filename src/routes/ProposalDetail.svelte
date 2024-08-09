<script>
  import { onMount } from "svelte";
  import { createChart, LineStyle } from "lightweight-charts";
  import TradeModal from "../lib/TradeModal.svelte";
  export let proposal;

  let markets = proposal.markets;
  let positions = proposal.positions;
  let trades = proposal.trades;

  let priceChartData = {};
  let groupedMarkets = {};

  let showModal = false;
  let selectedMarket = null;
  let selectedAction = null;
  let selectedPrice = null;
  let chartContainer;
  let chart;

  onMount(async () => {
    groupedMarkets = groupMarketsByCondition(markets);
    const currentDate = new Date();

    Object.keys(groupedMarkets).forEach((condition) => {
      priceChartData[condition] = Array(30)
        .fill(0)
        .map((_, i) => ({
          time: new Date(currentDate.getTime() - (29 - i) * 24 * 60 * 60 * 1000)
            .toISOString()
            .split("T")[0],
          value: Math.random() * 0.5 + 0.25,
        }));
    });

    chart = createChart(chartContainer, {
      layout: {
        background: { type: "solid", color: "#222" },
        textColor: "#DDD",
      },
      grid: {
        vertLines: { color: "#444" },
        horzLines: { color: "#444" },
      },
      width: chartContainer.clientWidth,
      height: chartContainer.clientHeight,
    });

    Object.entries(groupedMarkets).forEach(([condition, markets]) => {
      const series = chart.addLineSeries({
        color: markets[0].color,
        lineWidth: 2,
        title: condition,
      });
      series.setData(priceChartData[condition]);
    });

    chart.timeScale().fitContent();
  });

  function groupMarketsByCondition(markets) {
    return markets.reduce((acc, market) => {
      if (!acc[market.condition]) {
        acc[market.condition] = [];
      }
      acc[market.condition].push(market);
      return acc;
    }, {});
  }

  function calculateMetric(markets) {
    console.log(markets);
    const upMarket = markets.find((m) => m.asset.includes("UP"));
    return upMarket
      ? (upMarket.buyPrice * 100).toFixed(1) + "%"
      : "$" + ((markets[0].buyPrice + markets[0].sellPrice) / 2).toFixed(2);
    // const downMarket = markets.find(m => m.asset.includes("DOWN"));
    // if (upMarket && downMarket) {
    //   return ((upMarket.buyPrice + downMarket.sellPrice) / 2 * 100).toFixed(1) + '%';
    // }
    // return 'N/A';
  }

  function handleResize() {
    if (chart) {
      chart.applyOptions({
        width: chartContainer.clientWidth,
        height: chartContainer.clientHeight,
      });
    }
  }

  function handleTrade(market, action) {
    selectedMarket = `${market.condition}-${market.asset}`;
    selectedAction = action;
    selectedPrice = action === "Buy" ? market.buyPrice : market.sellPrice;
    showModal = true;
  }

  function handleTradeSubmit(event) {
    console.log("Trade submitted:", event.detail);
    showModal = false;
    // Here you would typically update the positions and trades arrays
  }

  function closeModal() {
    showModal = false;
  }

  function calculatePnL(position) {
    const pnl =
      position.side === "Short"
        ? (position.avg - position.current) * position.quantity
        : (position.current - position.avg) * position.quantity;
    return pnl.toFixed(2);
  }
</script>

<svelte:window on:resize={handleResize} />

{#if showModal}
  <TradeModal
    market={selectedMarket}
    conditions={Object.keys(groupedMarkets)}
    action={selectedAction}
    price={selectedPrice}
    on:trade={handleTradeSubmit}
    on:close={closeModal}
  />
{/if}

<div class="proposal-detail">
  <div class="left-panel">
    <div class="panel-content">
      <h2>{proposal ? proposal.title : "Loading..."}</h2>
      {#if proposal}
        <section>
          <h3>Action(s) if Rejected</h3>
          <ul>
            {#each proposal.actions as action}
              <li>{action}</li>
            {/each}
          </ul>
        </section>
        <section>
          <h3>Rationale</h3>
          <p>{proposal.rationale}</p>
        </section>
      {/if}
    </div>
  </div>
  <div class="right-panel">
    <div class="top-right">
      <div class="panel-content">
        <h3>Price Chart</h3>
        <div class="chart-container" bind:this={chartContainer}></div>
      </div>
    </div>
    <div class="bottom-right">
      <div class="panel-content">
        <div class="markets">
          <h3>Markets</h3>
          <table>
            <thead>
              <tr>
                <th>Condition</th>
                <th>{proposal.metric}</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {#each Object.entries(groupedMarkets) as [condition, markets]}
                <tr>
                  <td>{condition}</td>
                  <td>{calculateMetric(markets)}</td>
                  <td class="actions-cell">
                    {#each markets as market}
                      <div class="market-actions">
                        <button
                          class="buy"
                          on:click={() => handleTrade(market, "Buy")}
                        >
                          Buy {market.asset} ${market.buyPrice.toFixed(2)}
                        </button>
                        <button
                          class="sell"
                          on:click={() => handleTrade(market, "Sell")}
                        >
                          Sell {market.asset} ${market.sellPrice.toFixed(2)}
                        </button>
                      </div>
                    {/each}
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
        <div class="positions">
          <h3>Positions</h3>
          <table>
            <thead>
              <tr>
                <th>Side</th>
                <th>Qty</th>
                <th>Condition</th>
                <th>Asset</th>
                <th>Avg</th>
                <th>Current</th>
                <th>Conditional P&L</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {#each positions as position}
                <tr>
                  <td>{position.side}</td>
                  <td>{position.quantity}</td>
                  <td>{position.market}</td>
                  <td>{position.asset}</td>
                  <td>${position.avg.toFixed(2)}</td>
                  <td>${position.current.toFixed(2)}</td>
                  <td>${calculatePnL(position)}</td>
                  <td><button class="close-position">Close</button></td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
        <div class="trades">
          <h3>Trades</h3>
          <table>
            <thead>
              <tr>
                <th>Action</th>
                <th>Qty</th>
                <th>Condition</th>
                <th>Asset</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {#each trades as trade}
                <tr>
                  <td>{trade.action}</td>
                  <td>{trade.amount}</td>
                  <td>{trade.market}</td>
                  <td>{trade.asset}</td>
                  <td>${trade.price.toFixed(2)}</td>
                  <td>${(trade.price * trade.amount).toFixed(2)}</td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .proposal-detail {
    display: flex;
    height: calc(100vh - 60px);
    overflow: hidden;
  }

  .left-panel,
  .right-panel {
    flex: 1;
    overflow-y: auto;
  }

  .left-panel {
    background-color: #111;
    border-right: 1px solid #333;
  }

  .right-panel {
    display: flex;
    flex-direction: column;
  }

  .top-right,
  .bottom-right {
    background-color: #111;
  }

  .top-right {
    flex: 0 0 350px;
    border-bottom: 1px solid #333;
  }

  .bottom-right {
    flex: 1;
  }

  .panel-content {
    padding: 1rem;
  }

  h2,
  h3,
  h4 {
    color: #fc494a;
    margin-bottom: 1rem;
  }

  ul {
    list-style-type: none;
    padding-left: 1rem;
  }

  li::before {
    content: "•";
    color: #fc494a;
    display: inline-block;
    width: 1em;
    margin-left: -1em;
  }

  .markets,
  .positions,
  .trades {
    margin-bottom: 2rem;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.9rem;
  }

  th,
  td {
    text-align: left;
    padding: 0.5rem;
    border-bottom: 1px solid #333;
  }

  th {
    color: #fc494a;
  }

  .chart-container {
    width: 100%;
    height: 300px;
  }

  .actions-cell {
    display: flex;
    gap: 1rem;
  }

  .market-actions {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  button {
    background-color: transparent;
    border: 1px solid #fc494a;
    color: #fc494a;
    padding: 0.5rem;
    font-size: 0.9rem;
    transition:
      background-color 0.3s ease,
      color 0.3s ease;
    cursor: pointer;
    white-space: nowrap;
  }

  button:hover {
    background-color: #fc494a;
    color: #fff;
  }

  button.buy {
    border-color: #4caf50;
    color: #4caf50;
  }

  button.buy:hover {
    background-color: #4caf50;
    color: #fff;
  }

  button.sell {
    border-color: #fc494a;
    color: #fc494a;
  }

  button.sell:hover {
    background-color: #fc494a;
    color: #fff;
  }

  button.close-position {
  background-color: transparent;
  border: 1px solid #fc494a;
  color: #fc494a;
  padding: 0.25rem 0.5rem;
  font-size: 0.8rem;
  transition: background-color 0.3s ease, color 0.3s ease;
  cursor: pointer;
  white-space: nowrap;
}

button.close-position:hover {
  background-color: #fc494a;
  color: #fff;
}
</style>
