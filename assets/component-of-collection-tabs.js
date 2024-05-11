document.addEventListener("DOMContentLoaded", function () {
  const tabs = document.querySelectorAll(".of-collection-tabs .tab");
  addCollectionTabsEvent();
});

/* ============== Event listener on body for dropdown ============== */

document.addEventListener("click", (e) => {
  const closestOfDropdown = e.target.closest("[data-of-dropdown]");
  const isOfDropdownButton = e.target.matches("[data-of-dropdown-button]");

  if (!isOfDropdownButton && closestOfDropdown != null) return;

  if (isOfDropdownButton) {
    closestOfDropdown.classList.toggle("active");
  } else {
    const activeDropdown = document.querySelector("[data-of-dropdown]");
    activeDropdown.classList.remove("active");
  }
});

/* ============== Additional funtions ============== */

function addCollectionTabsEvent() {
  const tabs = document.querySelectorAll(".of-collection-tabs .tab");

  tabs.forEach((tab) => {
    // Add click event listener
    tab.addEventListener("click", function () {
      renderCollection(tab.dataset.collectionHandle);
    });
  });
}

// Function to fetch and render collection data
function renderCollection(collectionId) {
  const loader = document.querySelector(".loader");
  loader.classList.add("active");
  
  fetch("/collections/" + collectionId + "?view=section")
    .then((response) => response.text())
    .then((html) => {
      let tempDiv = document.createElement("div");
      tempDiv.innerHTML = html;

      let newContent = tempDiv.querySelector("#MainContent").innerHTML;
      document.querySelector("#MainContent").innerHTML = newContent;

      history.replaceState(null, null, collectionId);
      addCollectionTabsEvent();
    })
    .catch((error) => {
      console.error("Error fetching collection:", error);
    })
    .finally(() => loader.classList.remove("active"));
}
