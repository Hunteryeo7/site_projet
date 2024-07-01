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

    if (population >= minPopulation && infrastructure >= minInfrastructure) {
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
});
