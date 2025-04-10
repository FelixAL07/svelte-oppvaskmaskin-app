<script lang="js">
  import { onMount } from "svelte";

  function parseCSV(csv) {
    const rows = csv.trim().split("\n");

    const data = rows.slice(1).map((row, index) => {
      const values = row.split(",").map((val) => val.trim());
      let obj = {
        name: values[0],
        nameTo: values[1],
      };
      pairs.push(obj);
    });
  }


  //Funksjon hentet fra netttet for å gi uke nummer
  function getWeekNumber(d) {
    // Copy date so don't modify original
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    // Get first day of year
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    // Calculate full weeks to nearest Thursday
    var weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
    // Return array of year and week number
    return [weekNo];
  }


  // Function to create display rows based on the current week and schedule
  function createDisplayrows(weeksToShow, currentWeek) {
    // currentWeek[0] is the current calendar week
    const currentWeekNum = currentWeek[0];

    // Build the full schedule covering a full year (or enough weeks)
    let fullSchedule = [];
    for (let i = 0; i < 52; i++) {
        let week = startWeek + i * step;
        if (week > 52) week = week - 52; // wrap around into next year
        fullSchedule.push(week);
    }
    
    // Adjust schedule numbers so that weeks wrapped into next year count as > 52
    const adjustedSchedule = fullSchedule.map(w => w < startWeek ? w + 52 : w);
    const adjustedCurrent = currentWeekNum < startWeek ? currentWeekNum + 52 : currentWeekNum;

    // Filter scheduled weeks that occur after the current week
    let filteredSchedule = [];
    adjustedSchedule.forEach((adjWeek, index) => {
        if (adjWeek > adjustedCurrent) {
            filteredSchedule.push(fullSchedule[index]);
        }
    });
    
    // Slice to the desired number of weeks from the current week
    filteredSchedule = filteredSchedule.slice(0, weeksToShow);
    
    // Build display rows by assigning pairs in a rotating fashion
    displayRows = filteredSchedule.map((w, idx) => {
        return { week: `Uke ${w}`, pair: pairs[idx % pairs.length] };
    });
    
    console.log("displayRows", displayRows);
}

  let pairs = [];
  let displayRows = [];
  let weeks = [];

  // --- Settings
  const startWeek = 2;
  const sheetUrl =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vQLpWu6sI99utqsllpp-ZjsTvQ1Bww1PkEH-iDfzzXE5-v8qKx4QucxdbMWf0dsh9PFLnoEeSdfriED/pub?output=csv";
  let step = 2;
  let weeksToShow = 14;

  // --- Load CSV data on mount
  onMount(async () => {
    // fetch the CSV file
    const res = await fetch(sheetUrl);

    // convert to text
    const csv = await res.text();

    parseCSV(csv);
    const currentWeek = getWeekNumber(new Date());

    createDisplayrows(weeksToShow, currentWeek);
  });
  // --- Create display rows
</script>

<!-- UI -->
<div class="container">
  <h2>Oversikt kjøkkenvakt {new Date().getFullYear()}</h2>
  <p>
    Oppgave: Sette på oppvaskmaskin og rydde på plass. Tørke over kjøkkenbenk.
  </p>

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
          <td>{row.week}</td>
          <td>{row.pair?.name ?? "Ingen"}</td>
          <td>{row.pair?.nameTo ?? ""}</td>
        </tr>
      {/each}
      {#if displayRows.length === 0}
    <tr>
      <td colspan="3">Laster data...</td>
    </tr>
{/if}

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
