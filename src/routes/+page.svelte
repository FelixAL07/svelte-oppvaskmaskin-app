<script>
  let pairs = [];
  let displayRows = [];

  // --- Settings
  const sheetUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQLpWu6sI99utqsllpp-ZjsTvQ1Bww1PkEH-iDfzzXE5-v8qKx4QucxdbMWf0dsh9PFLnoEeSdfriED/pub?output=csv";
  let startWeek = 2;
  let step = 2;
  let weeksToShow = 26;

  // On component mount
  onMount(async () => {
    const res = await fetch(sheetUrl);
    const csv = await res.text();
    pairs = parseCSV(csv);
    renderTable();
  });

  import { onMount } from "svelte";

  function parseCSV(csv) {
    const lines = csv.trim().split("\n");
    const headers = lines[0].split(",");
    return lines.slice(1).map(line => {
      const values = line.split(",");
      let obj = {};
      headers.forEach((h, i) => {
        obj[h.trim()] = values[i]?.trim() ?? '';
      });
      return obj;
    });
  }

  function getCurrentWeek(date = new Date()) {
    const januaryFirst = new Date(date.getFullYear(), 0, 1);
    const daysSinceJan1 = Math.floor((date - januaryFirst) / (24 * 60 * 60 * 1000));
    return Math.ceil((daysSinceJan1 + januaryFirst.getDay() + 1) / 7);
  }

  function getPairIndex(weekNumber) {
    let diff = weekNumber - startWeek;
    let stepCount = Math.floor(diff / step);
    let index = stepCount % pairs.length;
    if (index < 0) index += pairs.length;
    return index;
  }

  function renderTable() {
    const currentWeek = getCurrentWeek();
    const startingWeek = startWeek;
    displayRows = [];

    for (let i = 0; i < weeksToShow; i++) {
      const weekNumber = startingWeek + (i * step);
      const wrappedWeek = ((weekNumber - 1) % 52) + 1;
      const index = getPairIndex(weekNumber);

      displayRows.push({
        uke: wrappedWeek,
        navn: pairs[index].navn,
        navnTo: pairs[index].navnTo
      });
    }
  }
</script>

<!-- UI -->
<div class="container">
  <h2>Oversikt kjøkkenvakt {new Date().getFullYear()}</h2>
  <p>Oppgave: Sette på oppvaskmaskin og rydde på plass. Tørke over kjøkkenbenk.</p>

  <table>
    <thead>
      <tr>
        <th>Uke</th>
        <th>Navn</th>
        <th></th>
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
