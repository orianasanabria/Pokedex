$('document').ready(function () {

/* Carga de Pokemones al Select */

  $.ajax({
    url: "https://pokeapi.co/api/v2/pokemon?limit=151&offset=0",
    type: "GET",
    dataType: "JSON",
    success: function (data) {
      const pokemons = data.results;
      const pokeNames = pokemons.map(function (e) {
        let pokeNamesUp = e.name.toUpperCase();
        return pokeNamesUp;
      })
      pokeNames.forEach(function(el){
        $("#pokeSelect").append(`
          <option value= ${el}> ${el} </option>
        `)
      })
    }
  })

  /* Cambios de Data */
-
  $('#pokeSelect').on('change', function(i){
    if (i.target.value != '0'){
      const selectedPoke = i.target.value;
      const selectedPokeLC = selectedPoke.toLowerCase();

      $.ajax({
        url: `https://pokeapi.co/api/v2/pokemon/${selectedPokeLC}`,
        type: "GET",
        dataType: "JSON",
        success: function(data) {

          const pokeName = data.name.toUpperCase();
          $("#pokeTitle").text(pokeName);

          const imgFront = data.sprites.front_shiny;
          $("#pokeFront").attr("src", imgFront);

          const imgBack = data.sprites.back_shiny;
          $("#pokeBack").attr("src", imgBack);

          const pokeID = data.id;
          $("#pokeID").text(pokeID);

          const pokeType = data.types[0].type.name;
          $("#pokeType").text(pokeType);

          const pokeSkill = data.abilities[0].ability.name;
          $("#pokeSkills").text(pokeSkill);

          const pokeMoves = data.moves[0].move.name;
          $("#pokeMoves").text(pokeMoves);

          const pokeAttack = data.stats[4].base_stat;
          $("#pokeAttack").text(pokeAttack);

          const pokeDeffense = data.stats[3].base_stat;
          $("#pokeDeffense").text(pokeDeffense);

          const pokeSpeed = data.stats[0].base_stat;
          $("#pokeSpeed").text(pokeSpeed);

          const pokeHealth = data.stats[5].base_stat;
          $("#pokeHealth").text(pokeHealth);

          /* Gráfico */

          var graphStats = [
            pokeAttack,
            pokeDeffense,
            pokeSpeed,
            pokeHealth
          ];

          var graphNames = [
            'Attack', 
            'Deffense',
            'Speed',
            'Health'
          ];

          var ctx = $('#pokeGraph');

          var pokeGraph = new Chart(ctx, {
            type: 'doughnut',
            data: {
              labels: graphNames,
              datasets: [{
                data: graphStats,
                label: pokeName,
                backgroundColor: [
                  '#FFCD56',
                  '#36A2EB',
                  '#FF3D67',
                  '#00B798'
                ],
              }]
            },
          });
        }
      })
    }
  })
});