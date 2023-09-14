
document.addEventListener("DOMContentLoaded", () => {
    const addSection = (sectionType) => {
        const container = document.querySelector(`#${sectionType}Sections`)
        const sectionCount = container.querySelectorAll(`.${sectionType}`).length

        const newSection = document.createElement("div")
        newSection.innerHTML = `
        <div>
            <label for="${sectionType}_name_${sectionCount}"> ${sectionType} Name: </label>
            <input type="text" id="${sectionType}_name_${sectionCount}" name="${sectionType}[${sectionCount}][name]"><br>

            <label for="${sectionType}_img_${sectionCount}"> ${sectionType} image:</label>
            <input type="text" id="${sectionType}_img_${sectionCount}" name="${sectionType}[${sectionCount}][img]"><br>

            <label for="${sectionType}_description_${sectionCount}"> Description:</label>
            <input type="text" id="${sectionType}_description_${sectionCount}" name="${sectionType}[${sectionCount}][description]"><br>

            <label for="${sectionType}_link_${sectionCount}"> Link:</label>
            <input type="text" id="${sectionType}_link_${sectionCount}" name="${sectionType}[${sectionCount}][link]"><br>
        </div><br>
        `
        newSection.classList.add(sectionType)

        container.appendChild(newSection)
    }

    const addTopButton = document.querySelector("#addTop")
    const addBottomButton = document.querySelector("#addBottom")
    const addShoeButton = document.querySelector("#addShoe")
    const addInspirationButton = document.querySelector("#addInspiration")

    addTopButton.addEventListener("click", () => addSection("top"))
    addBottomButton.addEventListener("click", () => addSection("bottom"))
    addShoeButton.addEventListener("click", () => addSection("shoe"))
    addInspirationButton.addEventListener("click", () => addSection("inspiration"))

    // if (addTopButton) {
    //     addTopButton.addEventListener("click", () => addSection("top"));
    // }

    // if (addBottomButton) {
    //     addBottomButton.addEventListener("click", () => addSection("bottom"));
    // }

    // if (addShoeButton) {
    //     addShoeButton.addEventListener("click", () => addSection("shoe"));
    // }

    // if (addInspirationButton) {
    //     addInspirationButton.addEventListener("click", () => addSection("inspiration"));
    // }
})

