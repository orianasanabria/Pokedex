$('document').ready(function () {
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
      for (const i of pokeNames)
        $("#select-poke").append(`
        <option value= ${i}> ${i} </option>
      `)
    }
  })
});