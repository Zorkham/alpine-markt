document.addEventListener("alpine:init", () => {
  Alpine.data("markt", () => ({
    search: Alpine.$persist(""),
    sortByPrice: Alpine.$persist("none"),
    products: [],
    cart: Alpine.$persist([[]]),
    cartOpen: Alpine.$persist(false),
    currentTab: Alpine.$persist("home"),

    // Initialize app and fetch products
    init() {
      this.fetchProducts();
    },

    // Fetch products from the API
    async fetchProducts() {
      const response = await fetch("https://dummyjson.com/products/category/mobile-accessories");
      const data = await response.json();
      this.products = data.products.map((product) => ({
        id: product.id,
        title: product.title,
        description: product.description,
        thumbnail: product.thumbnail,
        price: product.price,
      }));
    },

    // Filter products by search and sorting
    get filteredProducts() {
      let result = [...this.products];

      if (this.search) {
        result = result.filter((product) =>
          product.title.toLowerCase().includes(this.search.toLowerCase())
        );
      }

      if (this.sortByPrice === "asc") {
        result = result.sort((a, b) => a.price - b.price);
      } else if (this.sortByPrice === "desc") {
        result = result.sort((a, b) => b.price - a.price);
      }

      return result;
    },

    // Add product to the cart or update quantity if it already exists
    addToCart(product) {
      const existingItem = this.cart.find((item) => item.id === product.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        this.cart.push({ ...product, quantity: 1 });
      }
      this.toggleCart();
    },

    // Remove a product from the cart
    removeFromCart(product) {
      this.cart = this.cart.filter((item) => item.id !== product.id);
    },

    // Calculate the total number of items in the cart
    cartTotalItems() {
      return this.cart.reduce((total, item) => total + item.quantity, 0);
    },

    // Calculate the total price of the cart
    cartTotal() {
      return this.cart.reduce((total, item) => total + item.price * item.quantity, 0);
    },

    // Toggle Cart Drawer
    toggleCart() {
      this.cartOpen = !this.cartOpen;
    },

    clearCart() {
      this.cart = [];
    },

    // Close Cart Drawer
    closeCart() {
      this.cartOpen = false;
    },

    // Clear the search input
    clearSearch() {
      this.search = "";
    },

    // Clear filters (search and sorting)
    clearFilters() {
      this.clearSearch();
      this.sortByPrice = "none";
    },
  }));
});
