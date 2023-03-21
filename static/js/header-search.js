const searchWindow = document.querySelector(".search-window");
const searchWindowOverlay = document.querySelector(".js-search-overlay");
const searchButtons = document.querySelectorAll(".js-search-button");
const searchInput = document.querySelector(".js-search-input");
const searchResults = document.querySelector(".search-results");
const searchCloseButton = document.querySelector(".js-close-search-button");
const searchClearButton = document.querySelector(".js-clear-input-button");

const closeSearchWindow = () => {
    searchWindow.classList.remove("open");
}

const openSearchWindow = () => {
    searchWindow.classList.add("open");
}

const searchWindowIsOpen = () => {
    return searchWindow.classList.contains("open");
}

searchInput.addEventListener("input", () => {
    if (searchInput.value.length > 0) {
        searchClearButton.classList.add("show");
    } else {
        searchClearButton.classList.remove("show");
    }
})

searchClearButton.addEventListener("click", () => {
    searchInput.value = "";
    searchResults.innerHTML = "";
    searchInput.focus();
    searchClearButton.classList.remove("show");
})

searchCloseButton.addEventListener("click", () => {
    closeSearchWindow();
})

searchButtons.forEach((searchButton) => {
    searchButton.addEventListener("click", () => {
        openSearchWindow();
    });
})

searchWindowOverlay.addEventListener("click", () => {
    closeSearchWindow();
});

const searchResultsList = document.querySelector(".search-results-list");
const searchResultsElements = document.querySelectorAll(".search-result");

const selectSearchResultElement = (element) => {
    searchResultsElements.forEach((searchResultElement) => {
        searchResultElement.setAttribute("aria-selected", "false");
    });
    element.setAttribute("aria-selected", "true");
}

searchResultsElements.forEach((searchResultElement) => {
    // on hover set aria-selected to true and remove from other elements
    searchResultElement.addEventListener("mouseenter", () => {
        selectSearchResultElement(searchResultElement);
    })

    // on touch set aria-selected to true and remove from other elements
    searchResultElement.addEventListener("touchstart", () => {
        selectSearchResultElement(searchResultElement);
    })
})

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeSearchWindow();
    }

    if (searchWindowIsOpen) {
        const searchResultActiveElement = document.querySelector(".search-result[aria-selected='true']");
        if (searchResultActiveElement) {
            if (event.key === "ArrowUp") {
                const previousElement = searchResultActiveElement.previousElementSibling;
                if (previousElement) {
                    selectSearchResultElement(previousElement)
                } else {
                    selectSearchResultElement(searchResultsList.lastElementChild)
                }

                event.preventDefault()
            }

            if (event.key === "ArrowDown") {
                const nextElement = searchResultActiveElement.nextElementSibling;
                if (nextElement) {
                    selectSearchResultElement(nextElement)
                } else {
                    selectSearchResultElement(searchResultsList.firstElementChild)
                }

                event.preventDefault()
            }
        }
    }
})

const setNoResults = () => {
    searchResults.classList.add("no-results-found");
}

document.addEventListener("keydown", (event) => {
    if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        openSearchWindow();
    }
})

document.addEventListener("DOMContentLoaded", () => {
    const ctrlKey = document.querySelector(".ctrl-key");
    const platform = navigator.platform.toLowerCase();
    if (platform.includes("mac") || platform.includes("ios")) {
        ctrlKey.textContent = "⌘";
    }
})
