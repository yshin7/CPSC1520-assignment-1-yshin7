// Selecting form elements
const albumForm = document.querySelector("#album-form");
const albumTitleInput = document.querySelector("#album-title");
const albumTitleError = document.querySelector("#album-title-error");

const albumDescriptionInput = document.querySelector("#album-description");
const albumDescriptionError = document.querySelector(
  "#album-description-error"
);

const albumArtSelect = document.querySelector("#album-art");
const albumArtError = document.querySelector("#album-art-error");

// Adding event listeners for real-time validation
albumTitleInput.addEventListener("input", validateAlbumTitle);
albumDescriptionInput.addEventListener("input", validateAlbumDescription);
albumArtSelect.addEventListener("change", validateAlbumArt);

// Function to validate album title
function validAlbumTitle(title) {
  return title.trim() !== "" && title.length <= 15;
}

// Function to validate album description
function validAlbumDescription(description) {
  return description.trim() !== "" && description.length <= 30;
}

// Function to validate album art
function validAlbumArt(selectedAlbumArt) {
  return selectedAlbumArt !== "";
}

// Event handler for album title input
function validateAlbumTitle() {
  const title = albumTitleInput.value.trim();

  if (validAlbumTitle(title)) {
    albumTitleInput.classList.remove("is-invalid");
    albumTitleError.textContent = "";
  } else {
    albumTitleInput.classList.add("is-invalid");
    albumTitleError.textContent = "Invalid Album Name";
  }
}

// Event handler for album description input
function validateAlbumDescription() {
  const description = albumDescriptionInput.value.trim();

  if (validAlbumDescription(description)) {
    albumDescriptionInput.classList.remove("is-invalid");
    albumDescriptionError.textContent = "";
  } else {
    albumDescriptionInput.classList.add("is-invalid");
    albumDescriptionError.textContent = "Invalid Description Name";
  }
}

// Event handler for album art selection
function validateAlbumArt() {
  const selectedAlbumArt = albumArtSelect.value;

  if (validAlbumArt(selectedAlbumArt)) {
    albumArtSelect.classList.remove("is-invalid");
    albumArtError.textContent = "";
  } else {
    albumArtSelect.classList.add("is-invalid");
    albumArtError.textContent = "Select album art";
  }
}

// Function to handle form submission
function onCreateNewAlbum(e) {
  e.preventDefault();

  const title = albumTitleInput.value.trim();
  const description = albumDescriptionInput.value.trim();
  const selectedAlbumArt = albumArtSelect.value;

  // Reset error messages
  albumTitleInput.classList.remove("is-invalid");
  albumDescriptionInput.classList.remove("is-invalid");
  albumArtSelect.classList.remove("is-invalid");
  albumTitleError.textContent = "";
  albumDescriptionError.textContent = "";
  albumArtError.textContent = "";

  // Validate album title
  if (!validAlbumTitle(title)) {
    albumTitleInput.classList.add("is-invalid");
    albumTitleError.textContent = "Invalid Album Name";
  }

  // Validate album description
  if (!validAlbumDescription(description)) {
    albumDescriptionInput.classList.add("is-invalid");
    albumDescriptionError.textContent = "Invalid Description Name";
  }

  // Validate album art
  if (!validAlbumArt(selectedAlbumArt)) {
    albumArtSelect.classList.add("is-invalid");
    albumArtError.textContent = "Select album art";
  }

  // If all inputs valid, render template
  if (
    validAlbumTitle(title) &&
    validAlbumDescription(description) &&
    validAlbumArt(selectedAlbumArt)
  ) {
    renderAlbumTemplate(title, description, selectedAlbumArt);
    albumForm.reset(); // Reset form after successful submission
  }
}

// Function to render album template
function renderAlbumTemplate(title, description, albumArt) {
  const template = `
    <div class="col">
        <div class="card shadow-sm">
            <img class="bd-placeholder-img card-img-top" src="img/${albumArt}" />
            <div class="card-body">
                <h5 class="card-title">${description}</h5>
                <p class="card-text">${title}</p>
            </div>
        </div>
    </div>
    `;
  document
    .querySelector("#all-albums-list")
    .insertAdjacentHTML("beforeend", template);
}

// Adding event listener for form submission
albumForm.addEventListener("submit", onCreateNewAlbum);
