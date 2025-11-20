const popup = document.getElementById("popup");

const exitPopup = document.getElementById("exitPopup");

const addFormStaff = document.getElementById("addFormStaff");

const submitBtn = document.getElementById("submitBtn");

const closeStaffPopup = document.getElementById("closeStaffPopup");

const experienceContainer = document.getElementById("experience-container");

const addExperienceBtn = document.getElementById("add-experience");

const closeModal = document.getElementById("closeModal");

const ReceptionBtn = document.getElementById("ReceptionBtn");

const conferenceBtn = document.getElementById("conferenceBtn");

const serveursBtn = document.getElementById("serveursBtn");

const securiteBtn = document.getElementById("securiteBtn");

const personnelBtn = document.getElementById("personnelBtn");

const archivesBtn = document.getElementById("archivesBtn");

let allUsers = [];

exitPopup.addEventListener("click", () => {
  popup.classList.add("hidden");
});

addFormStaff.addEventListener("click", () => {
  popup.classList.remove("hidden");
});

closeStaffPopup.addEventListener("click", () => {
  document.getElementById("staffPopup").classList.add("hidden");
});

document.getElementById("image-url").addEventListener("change", () => {
  const imageUrl = this.value;
  const imageElement = document.getElementById("image");
  if (imageUrl) {
    imageElement.src = imageUrl;
  }
});

addExperienceBtn.addEventListener("click", () => {
  const block = document.createElement("div");
  block.className =
    "formExperience p-4 border border-gray-300 rounded-xl bg-gray-50";

  block.innerHTML = `
        <div class="grid grid-cols-2 gap-4">
            <div>
                <label class="text-sm font-semibold">Poste</label>
                <input type="text" name="poste[]" class="w-full mt-1 px-3 py-2 border rounded-lg" placeholder="Ex: Développeur Web">
            </div>

            <div>
                <label class="text-sm font-semibold">Entreprise</label>
                <input type="text" name="entreprise[]" class="w-full mt-1 px-3 py-2 border rounded-lg" placeholder="Ex: YouCode">
            </div>
        </div>

        <div class="grid grid-cols-2 gap-4 mt-3">
            <div>
                <label class="text-sm font-semibold">Date début</label>
                <input type="date" name="start[]" class="w-full mt-1 px-3 py-2 border rounded-lg">
            </div>

            <div>
                <label class="text-sm font-semibold">Date fin</label>
                <input type="date" name="end[]" class="w-full mt-1 px-3 py-2 border rounded-lg">
            </div>
        </div>

        <div class="mt-3">
            <label class="text-sm font-semibold">Description</label>
            <textarea name="description[]" class="w-full mt-1 px-3 py-2 border rounded-lg" rows="2" placeholder="Ex: Développement d’un site web..."></textarea>
        </div>

        <!-- Remove button -->
        <button type="button" class="remove-experience mt-3 text-red-600 hover:underline">
            Supprimer cette expérience
        </button> `;
  experienceContainer.appendChild(block);
  block.querySelector(".remove-experience").addEventListener("click", () => {
    block.remove();
  });
});

function reloadUnssignedUsers() {
  const savedUsers = JSON.parse(localStorage.getItem("Users")) || [];

  const unssignedUsers = savedUsers.filter((u) => u.unssigned === true);

  allUsers = unssignedUsers;

  const container = document.getElementById("usersToAdd");
  container.innerHTML = "";

  unssignedUsers.forEach((user) => {
    const div = document.createElement("div");
    div.className =
      "AddBtnToContainer flex items-center justify-between px-4 py-3 border rounded-lg";

    div.innerHTML = `
            <div class="flex items-center gap-3">
                <img src="${user.photoUrl}" class="w-10 h-10 rounded-full object-cover border">
                <span class="text-sm font-semibold text-gray-800">${user.nom}</span>
            </div>
        `;

    container.appendChild(div);
  });
}

reloadUnssignedUsers();

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const users = {
    nom: document.getElementById("userNom").value,
    role: document.getElementById("userRole").value,
    photoUrl: document.getElementById("image-url").value,
    email: document.getElementById("userEmail").value,
    phone: document.getElementById("userPhone").value,
    experiencesProf: [],
    unssigned: true,
  };

  const experienceBlocks =
    experienceContainer.querySelectorAll(".formExperience");

  experienceBlocks.forEach((b, index) => {
    let poste, entreprise, dateStart, dateEnd, description;

    if (index === 0) {
      poste = document.getElementById("userPost").value;
      entreprise = document.getElementById("userEntreprise").value;
      dateStart = document.getElementById("userDateStart").value;
      dateEnd = document.getElementById("userDateEnd").value;
      description = document.getElementById("userDescription").value;
    } else {
      poste = b.querySelector('input[name="poste[]"]').value;
      entreprise = b.querySelector('input[name="entreprise[]"]').value;
      dateStart = b.querySelector('input[name="start[]"]').value;
      dateEnd = b.querySelector('input[name="end[]"]').value;
      description = b.querySelector('textarea[name="description[]"]').value;
    }

    users.experiencesProf.push({
      poste,
      entreprise,
      dateStart,
      dateEnd,
      description,
    });

    if (index === 0) {
      document.getElementById("userPost").value = "";
      document.getElementById("userEntreprise").value = "";
      document.getElementById("userDateStart").value = "";
      document.getElementById("userDateEnd").value = "";
      document.getElementById("userDescription").value = "";
    } else {
      b.querySelector('input[name="poste[]"]').value = "";
      b.querySelector('input[name="entreprise[]"]').value = "";
      b.querySelector('input[name="start[]"]').value = "";
      b.querySelector('input[name="end[]"]').value = "";
      b.querySelector('textarea[name="description[]"]').value = "";
    }
  });

  popup.classList.add("hidden");
  document.getElementById("userNom").value = "";
  document.getElementById("userRole").value = "";
  document.getElementById("image-url").value = "";
  document.getElementById("userEmail").value = "";
  document.getElementById("userPhone").value = "";

  const savedUsers = JSON.parse(localStorage.getItem("Users")) || [];
  savedUsers.push(users);
  localStorage.setItem("Users", JSON.stringify(savedUsers));

  allUsers = savedUsers;
  reloadUnssignedUsers();
});

closeModal.addEventListener("click", () => {
  const profileExperiences = document.getElementById("profileExperiences");

  profileExperiences.textContent = "";

  profileModal.classList.add("hidden");
});

ReceptionBtn.addEventListener("click", () => {
  const filtered = allUsers.filter(
    (u) =>
      u.unssigned === true &&
      (u.role === "Réception" ||
        u.role === "Manager" ||
        u.role === "Nettoyage" ||
        u.role === "Visiteurs")
  );

  const container = document.getElementById("addStaffToRoom");

  container.innerHTML = "";

  document.getElementById("staffPopup").classList.remove("hidden");

  filtered.forEach((user) => {
    const div = document.createElement("div");
    div.className =
      "flex items-center justify-between px-4 py-3 border rounded-lg";

    div.innerHTML = `
            <div class="flex items-center gap-3">
                <img src="${user.photoUrl}" class="w-10 h-10 rounded-full object-cover border">
                <span class="text-sm font-semibold text-gray-800">${user.nom}</span>
            </div>

            <button class="addToRoomBtn px-3 py-1 rounded-md text-xs font-semibold text-blue-600 border border-blue-600 hover:bg-blue-600 hover:text-white transition">
                add
            </button>
        `;

    container.appendChild(div);

    const btn = div.querySelector(".addToRoomBtn");

    btn.addEventListener("click", () => {
      user.unssigned = false;

      const saved = JSON.parse(localStorage.getItem("Users")) || [];

      saved.forEach((u) => {
        if (u.email === user.email) {
          u.unssigned = false;
        }
      });

      localStorage.setItem("Users", JSON.stringify(saved));

      const receptionContainer = document.getElementById("receptionContainer");

      const item = document.createElement("div");
      item.className =
        "flex items-center gap-2 bg-gray-100 p-1 rounded shadow-sm";

      item.innerHTML = `
                <img src="${user.photoUrl}" class="w-6 h-6 rounded-full border">
                <span class="text-sm font-medium text-gray-800 truncate">${user.nom}</span>
                <button class="removeStaff text-red-500 font-bold px-1 hover:text-red-700">-</button>
            `;

      receptionContainer.appendChild(item);

      item.querySelector(".removeStaff").addEventListener("click", () => {
        item.remove();
        user.unssigned = true;
        const saved = JSON.parse(localStorage.getItem("Users")) || [];
        saved.forEach((u) => {
          if (u.email === user.email) {
            u.unssigned = true;
          }
        });

        localStorage.setItem("Users", JSON.stringify(saved));
        reloadUnssignedUsers();
      });

      document.getElementById("staffPopup").classList.add("hidden");

      reloadUnssignedUsers();
    });
  });
});

conferenceBtn.addEventListener("click", () => {
  const filtered = allUsers.filter(
    (u) =>
      u.unssigned === true &&
      (u.role === "Réception" ||
        u.role === "Manager" ||
        u.role === "Nettoyage" ||
        u.role === "Visiteurs" ||
        u.role === "IT Technique" ||
        u.role === "sécurité ")
  );

  const container = document.getElementById("addStaffToRoom");
  container.innerHTML = "";
  document.getElementById("staffPopup").classList.remove("hidden");

  filtered.forEach((user) => {
    const div = document.createElement("div");
    div.className =
      "flex items-center justify-between px-4 py-3 border rounded-lg";

    div.innerHTML = `
            <div class="flex items-center gap-3">
                <img src="${user.photoUrl}" class="w-10 h-10 rounded-full object-cover border">
                <span class="text-sm font-semibold text-gray-800">${user.nom}</span>
            </div>

            <button class="addToRoomBtn px-3 py-1 rounded-md text-xs font-semibold text-blue-600 border border-blue-600 hover:bg-blue-600 hover:text-white transition">
                add
            </button>
        `;

    container.appendChild(div);

    const btn = div.querySelector(".addToRoomBtn");

    btn.addEventListener("click", () => {
      user.unssigned = false;

      const saved = JSON.parse(localStorage.getItem("Users")) || [];

      saved.forEach((u) => {
        if (u.email === user.email) {
          u.unssigned = false;
        }
      });

      localStorage.setItem("Users", JSON.stringify(saved));

      const conférenceContainer = document.getElementById(
        "conférenceContainer"
      );

      const item = document.createElement("div");
      item.className =
        "flex items-center gap-2 bg-gray-100 p-1 rounded shadow-sm";

      item.innerHTML = `
                <img src="${user.photoUrl}" class="w-6 h-6 rounded-full border">
                <span class="text-sm font-medium text-gray-800 truncate">${user.nom}</span>
                <button class="removeStaff text-red-500 font-bold px-1 hover:text-red-700">-</button>
            `;

      conférenceContainer.appendChild(item);

      item.querySelector(".removeStaff").addEventListener("click", () => {
        item.remove();
        user.unssigned = true;
        const saved = JSON.parse(localStorage.getItem("Users")) || [];
        saved.forEach((u) => {
          if (u.email === user.email) {
            u.unssigned = true;
          }
        });

        localStorage.setItem("Users", JSON.stringify(saved));
        reloadUnssignedUsers();
      });

      document.getElementById("staffPopup").classList.add("hidden");

      reloadUnssignedUsers();
    });
  });
});

serveursBtn.addEventListener("click", () => {
  const filtered = allUsers.filter(
    (u) =>
      u.unssigned === true &&
      (u.role === "IT Technique" ||
        u.role === "Manager" ||
        u.role === "Nettoyage")
  );

  const container = document.getElementById("addStaffToRoom");
  container.innerHTML = "";
  document.getElementById("staffPopup").classList.remove("hidden");

  filtered.forEach((user) => {
    const div = document.createElement("div");
    div.className =
      "flex items-center justify-between px-4 py-3 border rounded-lg";

    div.innerHTML = `
            <div class="flex items-center gap-3">
                <img src="${user.photoUrl}" class="w-10 h-10 rounded-full object-cover border">
                <span class="text-sm font-semibold text-gray-800">${user.nom}</span>
            </div>

            <button class="addToRoomBtn px-3 py-1 rounded-md text-xs font-semibold text-blue-600 border border-blue-600 hover:bg-blue-600 hover:text-white transition">
                add
            </button>
        `;

    container.appendChild(div);

    const btn = div.querySelector(".addToRoomBtn");

    btn.addEventListener("click", () => {
      user.unssigned = false;

      const saved = JSON.parse(localStorage.getItem("Users")) || [];

      saved.forEach((u) => {
        if (u.email === user.email) {
          u.unssigned = false;
        }
      });

      localStorage.setItem("Users", JSON.stringify(saved));

      const serveursContainer = document.getElementById("serveursContainer");

      const item = document.createElement("div");
      item.className =
        "flex items-center gap-2 bg-gray-100 p-1 rounded shadow-sm";

      item.innerHTML = `
                <img src="${user.photoUrl}" class="w-6 h-6 rounded-full border">
                <span class="text-sm font-medium text-gray-800 truncate">${user.nom}</span>
                <button class="removeStaff text-red-500 font-bold px-1 hover:text-red-700">-</button>
            `;

      serveursContainer.appendChild(item);

      item.querySelector(".removeStaff").addEventListener("click", () => {
        item.remove();
        user.unssigned = true;
        const saved = JSON.parse(localStorage.getItem("Users")) || [];
        saved.forEach((u) => {
          if (u.email === user.email) {
            u.unssigned = true;
          }
        });

        localStorage.setItem("Users", JSON.stringify(saved));
        reloadUnssignedUsers();
      });

      document.getElementById("staffPopup").classList.add("hidden");

      reloadUnssignedUsers();
    });
  });
});

securiteBtn.addEventListener("click", () => {
  const filtered = allUsers.filter(
    (u) =>
      u.unssigned === true &&
      (u.role === "Manager" || u.role === "Nettoyage" || u.role === "sécurité ")
  );

  const container = document.getElementById("addStaffToRoom");
  container.innerHTML = "";
  document.getElementById("staffPopup").classList.remove("hidden");

  filtered.forEach((user) => {
    const div = document.createElement("div");
    div.className =
      "flex items-center justify-between px-4 py-3 border rounded-lg";

    div.innerHTML = `
            <div class="flex items-center gap-3">
                <img src="${user.photoUrl}" class="w-10 h-10 rounded-full object-cover border">
                <span class="text-sm font-semibold text-gray-800">${user.nom}</span>
            </div>

            <button class="addToRoomBtn px-3 py-1 rounded-md text-xs font-semibold text-blue-600 border border-blue-600 hover:bg-blue-600 hover:text-white transition">
                add
            </button>
        `;

    container.appendChild(div);

    const btn = div.querySelector(".addToRoomBtn");

    btn.addEventListener("click", () => {
      user.unssigned = false;

      const saved = JSON.parse(localStorage.getItem("Users")) || [];

      saved.forEach((u) => {
        if (u.email === user.email) {
          u.unssigned = false;
        }
      });

      localStorage.setItem("Users", JSON.stringify(saved));

      const sécuritéContainer = document.getElementById("sécuritéContainer");

      const item = document.createElement("div");
      item.className =
        "flex items-center gap-2 bg-gray-100 p-1 rounded shadow-sm";

      item.innerHTML = `
                <img src="${user.photoUrl}" class="w-6 h-6 rounded-full border">
                <span class="text-sm font-medium text-gray-800 truncate">${user.nom}</span>
                <button class="removeStaff text-red-500 font-bold px-1 hover:text-red-700">-</button>
            `;

      sécuritéContainer.appendChild(item);

      item.querySelector(".removeStaff").addEventListener("click", () => {
        item.remove();
        user.unssigned = true;
        const saved = JSON.parse(localStorage.getItem("Users")) || [];
        saved.forEach((u) => {
          if (u.email === user.email) {
            u.unssigned = true;
          }
        });

        localStorage.setItem("Users", JSON.stringify(saved));
        reloadUnssignedUsers();
      });

      document.getElementById("staffPopup").classList.add("hidden");

      reloadUnssignedUsers();
    });
  });
});

personnelBtn.addEventListener("click", () => {
  const filtered = allUsers.filter(
    (u) =>
      u.unssigned === true && (u.role === "Manager" || u.role === "Nettoyage")
  );

  const container = document.getElementById("addStaffToRoom");
  container.innerHTML = "";
  document.getElementById("staffPopup").classList.remove("hidden");

  filtered.forEach((user) => {
    const div = document.createElement("div");
    div.className =
      "flex items-center justify-between px-4 py-3 border rounded-lg";

    div.innerHTML = `
            <div class="flex items-center gap-3">
                <img src="${user.photoUrl}" class="w-10 h-10 rounded-full object-cover border">
                <span class="text-sm font-semibold text-gray-800">${user.nom}</span>
            </div>

            <button class="addToRoomBtn px-3 py-1 rounded-md text-xs font-semibold text-blue-600 border border-blue-600 hover:bg-blue-600 hover:text-white transition">
                add
            </button>
        `;

    container.appendChild(div);

    const btn = div.querySelector(".addToRoomBtn");

    btn.addEventListener("click", () => {
      user.unssigned = false;

      const saved = JSON.parse(localStorage.getItem("Users")) || [];

      saved.forEach((u) => {
        if (u.email === user.email) {
          u.unssigned = false;
        }
      });

      localStorage.setItem("Users", JSON.stringify(saved));

      const personnelContainer = document.getElementById("personnelContainer");

      const item = document.createElement("div");
      item.className =
        "flex items-center gap-2 bg-gray-100 p-1 rounded shadow-sm";

      item.innerHTML = `
                <img src="${user.photoUrl}" class="w-6 h-6 rounded-full border">
                <span class="text-sm font-medium text-gray-800 truncate">${user.nom}</span>
                <button class="removeStaff text-red-500 font-bold px-1 hover:text-red-700">-</button>
            `;

      personnelContainer.appendChild(item);

      item.querySelector(".removeStaff").addEventListener("click", () => {
        item.remove();
        user.unssigned = true;
        const saved = JSON.parse(localStorage.getItem("Users")) || [];
        saved.forEach((u) => {
          if (u.email === user.email) {
            u.unssigned = true;
          }
        });

        localStorage.setItem("Users", JSON.stringify(saved));
        reloadUnssignedUsers();
      });

      document.getElementById("staffPopup").classList.add("hidden");

      reloadUnssignedUsers();
    });
  });
});

archivesBtn.addEventListener("click", () => {
  const filtered = allUsers.filter(
    (u) => u.unssigned === true && u.role === "Manager"
  );

  const container = document.getElementById("addStaffToRoom");
  container.innerHTML = "";
  document.getElementById("staffPopup").classList.remove("hidden");

  filtered.forEach((user) => {
    const div = document.createElement("div");
    div.className =
      "flex items-center justify-between px-4 py-3 border rounded-lg";

    div.innerHTML = `
            <div class="flex items-center gap-3">
                <img src="${user.photoUrl}" class="w-10 h-10 rounded-full object-cover border">
                <span class="text-sm font-semibold text-gray-800">${user.nom}</span>
            </div>

            <button class="addToRoomBtn px-3 py-1 rounded-md text-xs font-semibold text-blue-600 border border-blue-600 hover:bg-blue-600 hover:text-white transition">
                add
            </button>
        `;

    container.appendChild(div);

    const btn = div.querySelector(".addToRoomBtn");

    btn.addEventListener("click", () => {
      user.unssigned = false;

      const saved = JSON.parse(localStorage.getItem("Users")) || [];

      saved.forEach((u) => {
        if (u.email === user.email) {
          u.unssigned = false;
        }
      });

      localStorage.setItem("Users", JSON.stringify(saved));

      const archivesContainer = document.getElementById("archivesContainer");

      const item = document.createElement("div");
      item.className =
        "flex items-center gap-2 bg-gray-100 p-1 rounded shadow-sm";

      item.innerHTML = `
                <img src="${user.photoUrl}" class="w-6 h-6 rounded-full border">
                <span class="text-sm font-medium text-gray-800 truncate">${user.nom}</span>
                <button class="removeStaff text-red-500 font-bold px-1 hover:text-red-700">-</button>
            `;

      archivesContainer.appendChild(item);

      item.querySelector(".removeStaff").addEventListener("click", () => {
        item.remove();
        user.unssigned = true;
        const saved = JSON.parse(localStorage.getItem("Users")) || [];
        saved.forEach((u) => {
          if (u.email === user.email) {
            u.unssigned = true;
          }
        });

        localStorage.setItem("Users", JSON.stringify(saved));
        reloadUnssignedUsers();
      });

      document.getElementById("staffPopup").classList.add("hidden");

      reloadUnssignedUsers();
    });
  });
});
