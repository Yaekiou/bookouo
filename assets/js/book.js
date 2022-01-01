const chapters = document.querySelectorAll(".catalog li");
const chapterInfo = JSON.parse(localStorage.getItem("chapterInfo"))

window.addEventListener("load", () => {
    if (chapterInfo) {
        chapters.forEach(chapter => {
            if (chapter.id === chapterInfo.id && chapter.textContent === chapterInfo.name) {
                chapter.scrollIntoView({
                    block: "center",
                })
                chapter.classList.add("active");
            }
        })
    }
})

localStorage.removeItem("chapterInfo");