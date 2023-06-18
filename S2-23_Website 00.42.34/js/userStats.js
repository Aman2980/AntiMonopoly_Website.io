import {gamesJson} from "../db/db.js";

document.addEventListener('DOMContentLoaded', function () {
    const dataContainer = document.getElementById('dataContainer');
    const form = document.querySelector('form');
    const gameIdInput = document.getElementById('id');
    const playerName = document.getElementById('player-name');
    const role = document.getElementById('role');
    const score = document.getElementById('score');
    const balance = document.getElementById('balance');
    const win = document.getElementById('win');


    // Create table element and header
    const table = document.createElement('table');
    table.classList.add('game-table');

    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');

    const headings = ['Game ID', 'Player Name', 'Role', 'Balance', 'Games Played', 'Games Won', 'Game Time', 'Total Points'];

    headings.forEach(heading => {
        const th = document.createElement('th');
        th.textContent = heading;
        headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Create table body
    const tbody = document.createElement('tbody');

    gamesJson.forEach(game => {
        const gameData = [
            {label: 'Game ID', value: game.game_id},
            {label: 'Player Name', value: game.player_name},
            {label: 'Role', value: game.role},
            {label: 'Balance', value: game.balance},
            {label: 'Games Played', value: game.games_played},
            {label: 'Games Won', value: game.games_won},
            {label: 'Game Time', value: game.total_game_time},
            {label: 'Total Points', value: game.total_points}
        ];

        const row = document.createElement('tr');

        gameData.forEach(data => {
            const cell = document.createElement('td');
            cell.textContent = data.value;
            row.appendChild(cell);
        });

        tbody.appendChild(row);
    });

    table.appendChild(tbody);
    dataContainer.appendChild(table);


    // Add event listener to the form submit button
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const filterValue = parseInt(gameIdInput.value);
        const filterPlayerName = playerName.value.trim().toLowerCase();
        const filterRole = role.value.trim().toLowerCase();
        const filterScore = parseInt(score.value);
        const filterBalance = parseInt(balance.value);
        const filterWins = win.checked;


        // Clear the table body
        tbody.innerHTML = '';


        // Filter the games based on the input values
        const filteredGames = gamesJson.filter(game => {
            const matchesGameId = game.game_id === filterValue || isNaN(filterValue);
            const matchesPlayerName = game.player_name.toLowerCase().includes(filterPlayerName);
            const matchesRole = game.role.toLowerCase().includes(filterRole);
            const matchesScore = game.total_points === filterScore || isNaN(filterScore);
            const matchesBalance = game.balance === filterBalance || isNaN(filterBalance);
            const matchesWins = game.games_won > 0 || (!filterWins && game.games_won === 0);

            return matchesGameId && matchesPlayerName && matchesRole && matchesScore && matchesBalance && matchesWins;
        });

        filteredGames.forEach(filtered => {
            const gameData = [
                {label: 'Game ID', value: filtered.game_id},
                {label: 'Player Name', value: filtered.player_name},
                {label: 'Role', value: filtered.role},
                {label: 'Balance', value: filtered.balance},
                {label: 'Games Played', value: filtered.games_played},
                {label: 'Games Won', value: filtered.games_won},
                {label: 'Game Time', value: filtered.total_game_time},
                {label: 'Total Points', value: filtered.total_points}
            ];

            const row = document.createElement('tr');

            gameData.forEach(data => {
                const cell = document.createElement('td');
                cell.textContent = data.value;
                row.appendChild(cell);
            });

            tbody.appendChild(row);
        });
    });
});
