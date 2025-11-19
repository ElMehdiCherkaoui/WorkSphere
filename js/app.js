const popup = document.getElementById("popup");
const exitPopup = document.getElementById("exitPopup");
const addFormStaff = document.getElementById("addFormStaff");
const submitBtn = document.getElementById("submitBtn");
const closeStaffPopup = document.getElementById("closeStaffPopup");
exitPopup.addEventListener("click", () => {
    popup.classList.add("hidden");
});
addFormStaff.addEventListener("click", () => {
    popup.classList.remove("hidden");
});
closeStaffPopup.addEventListener("click", () => {
    document.getElementById("staffPopup").classList.add("hidden");
})
document.getElementById("image-url").addEventListener("change", () => {
    const imageUrl = this.value;
    const imageElement = document.getElementById("image");
    if (imageUrl) {
        imageElement.src = imageUrl;
    }
});
const experienceContainer = document.getElementById("experience-container");
const addExperienceBtn = document.getElementById("add-experience");

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

        <button type="button" class="remove-experience mt-3 text-red-600 hover:underline">
            Supprimer cette expérience
        </button>
    `;

    experienceContainer.appendChild(block);
    block.querySelector(".remove-experience").addEventListener("click", () => {
        block.remove();
    });
});


submitBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const users = {
        nom: document.getElementById("userNom").value,
        role: document.getElementById("userRole").value,
        photoUrl: document.getElementById("image-url").value,
        email: document.getElementById("userEmail").value,
        phone: document.getElementById("userPhone").value,
        experiencesProf: [],
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
    const removeButtons = document.querySelectorAll(".remove-experience");
    removeButtons.forEach((btn) => btn.parentElement.remove());
    console.log(users);
    alert("Form data collected! Open console to see the object.");
    popup.classList.add("hidden");
    document.getElementById("userNom").value = "";
    document.getElementById("userRole").value = "";
    document.getElementById("image-url").value = "";
    document.getElementById("userEmail").value = "";
    document.getElementById("userPhone").value = "";

    const usersContainer = document.getElementById("usersToAdd");

    const div = document.createElement("div");
    div.className =
        "AddBtnToContainer flex items-center justify-between px-4 py-3 border rounded-lg";

    div.innerHTML = `
    <div class="flex items-center gap-3">
                            <img src="${users.photoUrl}" class="w-10 h-10 rounded-full object-cover border">
                            <div class="flex flex-col">
                                <span class="text-sm font-semibold text-gray-800">${users.nom}</span>
                            </div>
                        </div>

                        <div class="flex items-center gap-2">
                            <button id="infoContainer"
                                class="px-3 py-1 rounded-md text-xs font-semibold text-blue-600 border border-blue-600 hover:bg-blue-600 hover:text-white transition">
                                Info
                            </button>
                            <button
                                class="px-3 py-1 rounded-md text-xs font-semibold text-red-600 border border-red-600 hover:bg-red-600 hover:text-white transition">
                                Delete
                            </button>
                        </div>`;

    div.dataset.user = JSON.stringify(users);

    usersContainer.appendChild(div);
});