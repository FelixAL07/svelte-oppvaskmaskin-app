<script lang="js">
  import { onMount } from "svelte";
  import { getWeekNumber, parseCSV, createDisplayrows } from "$lib/utils";

  let pairs = [];
  let displayRows = [];
  let loading = true;  // Add loading state


  // --- Settings
  const startWeek = 2;
  const sheetUrl =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vQLpWu6sI99utqsllpp-ZjsTvQ1Bww1PkEH-iDfzzXE5-v8qKx4QucxdbMWf0dsh9PFLnoEeSdfriED/pub?output=csv";
  let step = 2;
  let weeksToShow = 14;

  // --- Load CSV data on mount
  onMount(async () => {
    const res = await fetch(sheetUrl);
    const csv = await res.text();
    pairs = parseCSV(csv);
    const currentWeek = getWeekNumber(new Date());
    displayRows = createDisplayrows(
      weeksToShow,
      currentWeek,
      startWeek,
      step,
      pairs
    );
    loading = false; // Set loading to false after data is fetched
  });
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
        <th colspan="2">Navn</th>
      </tr>
    </thead>
    <tbody>
      {#if loading} <!-- Check if loading -->
        {#each Array(weeksToShow) as _, index}
          <tr>
            <td colspan="3"><span class="skeleton"></span></td>
          </tr>
        {/each}
      {:else}
        {#each displayRows as row}
          <tr>
            <td>{row.week}</td>
            <td>{row.pair.name}</td>
            <td>{row.pair.nameTo}</td>
          </tr>
        {/each}
      {/if}
    </tbody>
  </table>
</div>


<style>
  .container {
    padding: 2rem;
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
    background: linear-gradient(to right, #008a93, #00b4d8);
    color: white;
    border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

  th {
    text-align: left;
    font-size: 0.75rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  td, th {
    padding: 1rem
  }

  td {
    white-space: nowrap;
    font-size: 0.875rem;
    color: #4a5568;
  }

  tbody tr {
    border-bottom: 2px solid #fade29;
  }

  tbody tr:hover {
  background-color: #f1f1f1; /* Slightly warmer than #f7fafc */
  transition: background-color 0.2s ease, transform 0.2s ease;
  transform: scale(1.02); /* Slight zoom effect on hover */
}

  tbody tr:last-child {
    border-bottom: none;
  }


  .skeleton {
  display: inline-block;       /* Ensures element is rendered appropriately */
  height: 0.75rem;              /* Visible height */
  width: 100%;                 /* Full width as set */
  border-radius: 0.25rem;      /* Rounded corners if desired */
  background: linear-gradient(90deg, 
              hsl(200, 20%, 80%) 25%, 
              hsl(200, 20%, 95%) 50%, 
              hsl(200, 20%, 80%) 75%);
  background-size: 200% 100%;  /* Makes the gradient wide enough for the animation */
  animation: shimmer 1.4s ease-in infinite;
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}
</style>
