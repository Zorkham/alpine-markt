document.addEventListener("alpine:init", () => {
  Alpine.data("boardGameExplorer", () => ({
    games: [],
    search: Alpine.$persist(""),
    sortByRating: Alpine.$persist("none"),
    sortByComplexity: Alpine.$persist("none"),

    init() {
      fetch("board-games.json")
        .then((response) => response.json())
        .then((data) => {
          this.games = data.items.map((item) => ({
            id: item.id,
            name: item.product.title,
            year: item.product.year_published,
            minPlayers: item.product.detail.min_players,
            maxPlayers: item.product.detail.max_players,
            minPlayTime: item.product.detail.min_play_time,
            maxPlayTime: item.product.detail.max_play_time,
            complexity: item.product.detail.bgg_complexity,
            rating: item.product.detail.bgg_geek_rating,
            image: item.product.media.source.href,
          }));
        });
    },

    get filteredGames() {
      if (this.search !== "") {
        return this.games.filter((game) =>
          game.name.toLowerCase().includes(this.search.toLowerCase())
        );
      }
      return this.games;
    },

    get sortedGames() {
      let sorted = [...this.filteredGames];

      if (this.sortByRating === "asc") {
        sorted.sort((a, b) => a.rating - b.rating);
      } else if (this.sortByRating === "desc") {
        sorted.sort((a, b) => b.rating - a.rating);
      }

      if (this.sortByComplexity === "asc") {
        sorted.sort((a, b) => a.complexity - b.complexity);
      } else if (this.sortByComplexity === "desc") {
        sorted.sort((a, b) => b.complexity - a.complexity);
      }

      return sorted;
    },

    searchGames() {
      this.sortByRating = "none";
      this.sortByComplexity = "none";
    },

    clearFilter() {
      this.search = "";
      this.searchGames();
    },
  }));
});
