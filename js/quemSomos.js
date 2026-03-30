function initQuemSomos() {
  seedIfEmpty();
  renderNavbar("quemsomos");
  renderFooter();
}

document.addEventListener("DOMContentLoaded", initQuemSomos);