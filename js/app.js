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
document.getElementById("image-url").addEventListener("change",  ()=> {
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