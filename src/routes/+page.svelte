<script>
  // --- 1) Define the pairs in the exact order you want them rotating:
  let pairs = [
    { navn: 'Vegar',      navnTo: 'Ragnar K' },
    { navn: 'Asle',       navnTo: 'Fredrik' },
    { navn: 'Simen',      navnTo: 'Håkon' },
    { navn: 'Ingunn',     navnTo: 'Einar' },
    { navn: 'Jørn Ivar',  navnTo: 'Lasse' },
    { navn: 'Kristian B', navnTo: 'Niels' },
    { navn: 'Kjetil',     navnTo: 'Tarjei' },
    { navn: 'Øyvind',     navnTo: 'Eldar' },
    { navn: 'Lars',       navnTo: 'Kristian E' },
    { navn: 'Simeon',     navnTo: 'Eyerusalem' },

  ];

  // --- 2) Configuration variables:
  let startWeek   = 2;   // The week number where your rotation officially begins
  let step        = 2;    // Every 2 weeks, move to the next pair
  let weeksToShow = 26;   // How many future entries to list in the table

  // --- 3) Calculate current calendar week:
  function getCurrentWeek(date = new Date()) {
    const januaryFirst = new Date(date.getFullYear(), 0, 1);
    const daysSinceJan1 = Math.floor((date - januaryFirst) / (24 * 60 * 60 * 1000));
    return Math.ceil((daysSinceJan1 + januaryFirst.getDay() + 1) / 7);
  }
  let currentWeek = getCurrentWeek();

  // Use the larger of currentWeek and startWeek so that the table starts at week 14 if currentWeek < 14
  const startingWeek = startWeek;

  // --- 4) Helper to figure out which pair index for a given “week number”
  function getPairIndex(weekNumber) {
    let diff = weekNumber - startWeek;
    let stepCount = Math.floor(diff / step);
    let index = stepCount % pairs.length;
    if (index < 0) {
      index += pairs.length;
    }
    return index;
  }

  // --- 5) Build the table data for the upcoming rotations
  let displayRows = [];
  for (let i = 0; i < weeksToShow; i++) {
    const weekNumber = startingWeek + (i * step);
    // Wrap week number between 1 and 52
    const wrappedWeek = ((weekNumber - 1) % 52) + 1;
    const index      = getPairIndex(weekNumber);

    displayRows.push({
      uke:    wrappedWeek,
      navn:   pairs[index].navn,
      navnTo: pairs[index].navnTo
    });
  }
</script>

<!-- --- 6) Display the table in Svelte --- -->
<div class="container">
  <h2>Oversikt kjøkkenvakt {new Date().getFullYear()}</h2>
  <p>Oppgave: Sette på oppvaskmaskin og rydde på plass. Tørke over kjøkkenbenk.</p>

  <table>
    <thead>
      <tr>
        <th>Uke</th>
        <th>Navn</th>
        <th>Partner</th>
      </tr>
    </thead>
    <tbody>
      {#each displayRows as row}
        <tr>
          <td>{row.uke}</td>
          <td>{row.navn}</td>
          <td>{row.navnTo}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style>
  .container {
    padding: 1rem;
    max-width: 600px;
    margin: 0 auto;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    background-color: white;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    overflow: hidden;
  }

  thead {
    background: linear-gradient(to right, #4299e1, #5a67d8);
    color: white;
  }

  th {
    padding: 0.75rem 1.5rem;
    text-align: left;
    font-size: 0.75rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  td {
    padding: 1rem 1.5rem;
    white-space: nowrap;
    font-size: 0.875rem;
    color: #4a5568;
  }

  tbody tr {
    border-bottom: 1px solid #e2e8f0;
  }

  tbody tr:hover {
    background-color: #f7fafc;
    transition: background-color 150ms ease;
  }

  tbody tr:last-child {
    border-bottom: none;
  }
</style>