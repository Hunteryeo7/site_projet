// Initialisation de la carte
var map = L.map('map').setView([5.208, -4.414], 12); // Coordonnées de Jacqueville

// Ajout de la couche de tuiles OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Exemple de données géospatiales (villages avec des informations de population et d'infrastructures)
var villageData = [
    { name: 'Village A', lat: 5.228, lon: -4.414, population: 3000, infrastructure: 5 },
    { name: 'Village B', lat: 5.238, lon: -4.424, population: 1500, infrastructure: 3 },
    { name: 'Village C', lat: 5.218, lon: -4.404, population: 4000, infrastructure: 8 }
];

// Ajout de marqueurs pour chaque village sur la carte
villageData.forEach(function(village) {
    L.marker([village.lat, village.lon]).addTo(map)
        .bindPopup('<b>' + village.name + '</b><br>Population: ' + village.population + '<br>Infrastructures: ' + village.infrastructure);
});

// Fonction de test d'éligibilité
function checkEligibility(population, infrastructure) {
    // Critères d'éligibilité (exemple)
    var minPopulation = 2000;
    var minInfrastructure = 4;

    if (population >= 2000 && infrastructure >= 10) {
        return "Éligible pour devenir une sous-préfecture.";
    } else {
        return "Non éligible. La population doit être d'au moins " + minPopulation + " et avoir au moins " + minInfrastructure + " infrastructures.";
    }
}

// Gestionnaire de soumission de formulaire
document.getElementById('eligibilityForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var population = parseInt(document.getElementById('population').value);
    var infrastructure = parseInt(document.getElementById('infrastructure').value);
    var result = checkEligibility(population, infrastructure);

    document.getElementById('result').innerText = result;
    updateCharts(population, infrastructure);
});

// Fonction de mise à jour des graphiques
function updateCharts(population, infrastructure) {
    populationChart.data.datasets[0].data.push(population);
    populationChart.update();
    infrastructureChart.data.datasets[0].data.push(infrastructure);
    infrastructureChart.update();
}

// Initialisation des graphiques avec Chart.js
var ctxPopulation = document.getElementById('populationChart').getContext('2d');
var ctxInfrastructure = document.getElementById('infrastructureChart').getContext('2d');

var populationChart = new Chart(ctxPopulation, {
    type: 'bar',
    data: {
        labels: villageData.map(v => v.name),
        datasets: [{
            label: 'Population',
            data: villageData.map(v => v.population),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

var infrastructureChart = new Chart(ctxInfrastructure, {
    type: 'bar',
    data: {
        labels: villageData.map(v => v.name),
        datasets: [{
            label: 'Infrastructures',
            data: villageData.map(v => v.infrastructure),
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
