async function fetchUsers() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!response.ok) {
      throw new Error("Kunde inte hämta data från API:et");
    }

    const users = await response.json();
    displayUsers(users);
  } catch (error) {
    console.error("Något gick fel:", error);
    document.getElementById("users").innerHTML = `
          <div class="error">
              <p>Kunde inte ladda användardata. Försök igen senare.</p>
          </div>
      `;
  }
}

function displayUsers(users) {
  const usersContainer = document.getElementById("users");
  usersContainer.innerHTML = "";

  users.forEach((user) => {
    const userCard = document.createElement("div");
    userCard.className = "user-card";

    userCard.innerHTML = `
          <div class="user-name">${user.name}</div>
          <div class="user-username">@${user.username}</div>
          <div class="user-email">${user.email}</div>
          
          <button class="show-details-btn" data-userid="${user.id}">Visa mer information</button>
          
          <div class="user-details" id="details-${user.id}">
              <p><strong>Stad:</strong> ${user.address.city}</p>
              <p><strong>Telefon:</strong> ${user.phone}</p>
              <p><strong>Företag:</strong> ${user.company.name}</p>
          </div>
      `;

    usersContainer.appendChild(userCard);
  });

  addButtonEventListeners();
}

function addButtonEventListeners() {
  const buttons = document.querySelectorAll(".show-details-btn");

  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      const userId = this.getAttribute("data-userid");
      const detailsElement = document.getElementById(`details-${userId}`);

      if (detailsElement.style.display === "block") {
        detailsElement.style.display = "none";
        this.textContent = "Visa mer information";
      } else {
        detailsElement.style.display = "block";
        this.textContent = "Dölj information";
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", fetchUsers);
