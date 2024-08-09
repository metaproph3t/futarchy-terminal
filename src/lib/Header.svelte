<script>
  const logoPath = '/logo.png';
</script>

<header>
  <div class="header-content">
    <div class="logo-container">
      <img src={logoPath} alt="Decision Market Platform Logo" />
      <h1>Decision Markets</h1>
    </div>
    <nav>
      <a href="#home">Home</a>
      <a href="#positions">Positions</a>
      <!-- Add more nav items here as needed -->
    </nav>
  </div>
</header>

<style>
  header {
    background-color: #111;
    border-bottom: 1px solid #FC494A;
    padding: 0.5rem 1rem;
  }

  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
  }

  .logo-container {
    display: flex;
    align-items: center;
  }

  img {
    height: 40px;
    margin-right: 1rem;
  }

  h1 {
    font-size: 1.5rem;
    color: #FC494A;
    margin: 0;
  }

  nav {
    display: flex;
    gap: 1rem;
  }

  a {
    color: #fff;
    text-decoration: none;
    font-size: 1rem;
    transition: color 0.3s ease;
  }

  a:hover {
    color: #FC494A;
  }
</style>