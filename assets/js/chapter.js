const body = document.body;
const page = document.querySelector("#page");
const content = document.querySelector("#chapter-content");

// Create HTML
function createHeader() {
    const newHeader = document.createElement("header");
    newHeader.className = "chapter-name";
    newHeader.innerHTML = `
        <div class="container">
            <h3><span>${chapterInfo.name}</span></h3>
        </div>
    `;
    body.insertAdjacentElement("afterbegin", newHeader);
}

function createPageOptions() {
    const newDiv = document.createElement("div");
    newDiv.className = "page-options";
    newDiv.innerHTML = `
        <header class="opt__header">
            <div class="container">
                <a href="../../index.html" class="opt__back-to-home">
                    <i class="ri-home-2-line"></i>
                </a>
                <h3 class="opt__book-name">
                    <a href="./index.html">${bookName}</a>
                </h3>
                <a href="#" class="opt__back-to-home hidden">
                    <i class="ri-home-2-line"></i>
                </a>
            </div>
        </header>
        <a href="${chapterInfo.prevChapter}.html" class="opt__nav-chapter prev">上一章</a>
        <a href="${chapterInfo.nextChapter}.html" class="opt__nav-chapter next">下一章</a>
        <div class="opt__reading-settings">
            <div class="container">
                <button class="opt__open-in-page-catalog">目錄</button>
                <div class="opt__fontsize">
                    <button id="decrease">A-</button>
                    <div class="current-fontsize">20</div>
                    <button id="increase">A+</button>
                </div>
                <div class="opt__theme-switcher">
                    <button class="theme-light-1">Aa</button>
                    <button class="theme-light-2">Aa</button>
                    <button class="theme-dark-1">Aa</button>
                    <button class="theme-dark-2">Aa</button>
                </div>
            </div>
        </div>
    `;
    body.insertAdjacentElement("afterbegin", newDiv);
}

function createInPageCatalog() {
    const newDiv = document.createElement("div");
    newDiv.className = "catalog-container";
    newDiv.innerHTML = `
        <div class="catalog-panel">
            <div class="topbar">
                <span>目錄</span>
                <button class="close-btn"><i class="ri-close-line"></i></button>
            </div>
            <div class="tools">
                <div class="total-chapters">共 0 章</div>
                <button class="reverse-btn">倒序</button>
            </div>
            <ul id="chapter-list"></ul>
        </div>
    `;
    body.insertAdjacentElement("afterbegin", newDiv);
}

function createNvigation() {
    const newDivTop = document.createElement("div");
    const newDivBottom = document.createElement("div");
    newDivTop.className = "navigation";
    newDivBottom.className = "navigation";
    newDivTop.setAttribute("data-position", "top");
    newDivBottom.setAttribute("data-position", "bttom");

    newDivTop.innerHTML = `
        <a href="${chapterInfo.prevChapter}.html" class="prev_chapter">上一章</a>
        <a href="index.html" class="go-to-book">書頁</a>
        <a href="${chapterInfo.nextChapter}.html" class="next_chapter">下一章</a>
    `;
    newDivBottom.innerHTML = newDivTop.innerHTML;

    page.insertAdjacentElement("afterbegin", newDivTop);
    page.insertAdjacentElement("beforeend", newDivBottom);
}

// Render HTML
function renderHTML() {
    createPageOptions();
    createInPageCatalog(); 
    createChapters();
    createHeader();
    createNvigation();
}

renderHTML();

// In-Page Catalog
const pageOpt = document.querySelector(".page-options");
const catalogContainer = document.querySelector(".catalog-container");
const openCatalogBtn = document.querySelector(".opt__open-in-page-catalog");
const closeCatalogBtn = document.querySelector(".catalog-panel .close-btn");
const reverseChaptersBtn = document.querySelector(".catalog-panel .reverse-btn");

openCatalogBtn.addEventListener("click", () => {
    catalogContainer.classList.add("show");
    pageOpt.classList.remove("show");
    body.setAttribute("data-scrollable", "false");
    document.querySelector(".active").scrollIntoView({
        "block": "center"
    });
})

closeCatalogBtn.addEventListener("click", () => {
    catalogContainer.classList.remove("show");
    body.removeAttribute("data-scrollable");
})

catalogContainer.addEventListener("click", e => {
    if (e.target == catalogContainer) {
        catalogContainer.classList.remove("show");
        body.removeAttribute("data-scrollable");
    }
})

// reverseChaptersBtn.addEventListener("click", () => {
//     [...chapterList.childNodes].reverse().forEach(chapter => {
//         fragment.append(chapter);
//     })
//     chapterList.append(fragment);
// })

// Theme Switcher
const themeOptions = document.querySelectorAll(".opt__theme-switcher button");
const defaultTheme = "theme-light-1";
const textAfterSelected = `Aa`;

if (localStorage.getItem("readingTheme")) {
    body.className = localStorage.getItem("readingTheme");
}

themeOptions.forEach(btn => {
    btn.addEventListener("click", () => {
        body.className = btn.classList[0];
        localStorage.setItem("readingTheme", btn.classList[0]);

        themeOptions.forEach(btn => {
            btn.classList.remove("selected");
            btn.innerHTML = "Aa";
        });
        btn.classList.add("selected");
        btn.innerHTML = textAfterSelected;
    })

    if (body.className == "") {
        body.className = defaultTheme;
    }
    
    if (btn.classList[0] == body.className) {
        themeOptions.forEach(btn => btn.classList.remove("selected"));
        btn.classList.add("selected");
        btn.innerHTML = textAfterSelected;
    }
})

// +- Font Size and Text Indent
const setFontSizeBtns = document.querySelectorAll(".opt__fontsize button");
const displayFontSize = document.querySelector(".opt__fontsize .current-fontsize");
const defaultFontSize = 20;
const biggestFontSize = 40;
const smallestFontSize = 16;
let currentFontSize = defaultFontSize;

if (localStorage.getItem("contentFontSize")) {
    if (parseFloat(localStorage.getItem("contentFontSize")) <= biggestFontSize) {
        content.style.fontSize = parseFloat(localStorage.getItem("contentFontSize")) + "px";
        currentFontSize = parseFloat(localStorage.getItem("contentFontSize"));
        displayFontSize.textContent = currentFontSize;
    }
} else {
    displayFontSize.textContent = currentFontSize;
}

setFontSizeBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        if (btn.id === "decrease") {
            currentFontSize > smallestFontSize ? currentFontSize -= 2 : null;
        } else {
            currentFontSize < biggestFontSize ? currentFontSize += 2 : null;
        }
        displayFontSize.textContent = currentFontSize;
        content.style.fontSize = currentFontSize + "px";
        localStorage.setItem("contentFontSize", currentFontSize);
    })
})

displayFontSize.addEventListener("click", () => {
    content.classList.toggle("text-indent");
    if (content.classList.contains("text-indent")) {
        localStorage.setItem("text-indent", true);
    } else {
        localStorage.removeItem("text-indent");
    }
})

if (localStorage.getItem("text-indent")) {
    content.classList.add("text-indent");
} else {
    content.classList.remove("text-indent");
}

// Shortcuts
window.addEventListener("keyup", e => {
    switch (e.keyCode) {
        // Esc (Hide pageOpt or catalogContainer)
        case 27:
            pageOpt.classList.remove("show");
            catalogContainer.classList.remove("show");
            body.removeAttribute("data-scrollable");
            break;

        // L (Show catalogContainer)
        case 76:
            if (!catalogContainer.classList.contains("show")) {
                catalogContainer.classList.add("show");
                body.setAttribute("data-scrollable", "false");
            } else {
                catalogContainer.classList.remove("show");
                body.removeAttribute("data-scrollable");
            }
            
            pageOpt.classList.remove("show");
            if (catalogContainer.classList.contains("show") && document.querySelector(".active")) {
                document.querySelector(".active").scrollIntoView({
                    "block": "center"
                });
            }
            break;

        // O (Show pageOpt)
        case 79:
            pageOpt.classList.toggle("show");
            catalogContainer.classList.remove("show");
            body.removeAttribute("data-scrollable");
            break;

        // <- (go to prev chapter)
        case 37:
            window.location.href = `${chapterInfo.prevChapter}.html`;
            break;

        // -> (go to next chapter)
        case 39:
            window.location.href = `${chapterInfo.nextChapter}.html`;
            break;

        // Enter (go to book page)
        case 13:
            window.location.href = `index.html`;
            break;

        // H (go to Home page)
        case 72:
            window.location.href = `../../index.html`;
            break;

        // 1-4 (Chnage Themes)
        case 49:
            body.className = "theme-light-1";
            localStorage.setItem("readingTheme", "theme-light-1");
            changeSelectedClassOnKeyEvent();
            break;

        case 50:
            body.className = "theme-light-2";
            localStorage.setItem("readingTheme", "theme-light-2");
            changeSelectedClassOnKeyEvent();
            break;

        case 51:
            body.className = "theme-dark-1";
            localStorage.setItem("readingTheme", "theme-dark-1");
            changeSelectedClassOnKeyEvent();
            break;

        case 52:
            body.className = "theme-dark-2";
            localStorage.setItem("readingTheme", "theme-dark-2");
            changeSelectedClassOnKeyEvent();
            break;

        // - decrease font size
        case 189:
            currentFontSize > smallestFontSize ? currentFontSize -= 2 : null;
            displayFontSize.textContent = currentFontSize;
            content.style.fontSize = currentFontSize + "px";
            localStorage.setItem("contentFontSize", currentFontSize);
            break;

        // = increase font size
        case 187:
            currentFontSize < biggestFontSize ? currentFontSize += 2 : null;
            displayFontSize.textContent = currentFontSize;
            content.style.fontSize = currentFontSize + "px";
            localStorage.setItem("contentFontSize", currentFontSize);
            break;

        // I text indent
        case 73:
            content.classList.toggle("text-indent");
            if (content.classList.contains("text-indent")) {
                localStorage.setItem("text-indent", true);
            } else {
                localStorage.removeItem("text-indent");
            }
            break;
    
        default:
            break;
    }
})

function changeSelectedClassOnKeyEvent() {
    themeOptions.forEach(btn => {
        if (btn.classList[0] == localStorage.getItem("readingTheme")) {
            themeOptions.forEach(btn => {
                btn.classList.remove("selected");
                btn.innerHTML = "Aa";
            });
            btn.classList.add("selected");
            btn.innerHTML = textAfterSelected;
        }
    })
}

// Hide Header when scroll down
// let lastScrollTop = window.scrollY;
// const header = document.querySelector(".chapter-name");

// window.addEventListener("scroll", () => {
//     if (lastScrollTop < window.scrollY && window.scrollY > 80) {
//         header.classList.add("scrolling");
//     } else {
//         header.classList.remove("scrolling");
//     }
//     lastScrollTop = window.scrollY;
// })

// #page clickable when match media
const aTags = document.querySelectorAll(".navigation a")
const mql = window.matchMedia("(max-width: 600px)");

aTags.forEach(a => {
    a.addEventListener("click", e => e.stopPropagation());
})

page.addEventListener("click", () => {
    if (mql.matches) {
        pageOpt.classList.add("show")
    }
})

pageOpt.addEventListener("click", e => {
    if (e.target == pageOpt) {
        pageOpt.classList.remove("show");
    }
})

// Get Chapters from json
const chapterList = document.querySelector("#chapter-list");
const totalChapters = document.querySelector(".total-chapters");
const fragment = document.createDocumentFragment();

async function createChapters() {
    const response = await fetch("./data/chapters.json");
    let chapters = await response.json();

    chapters.forEach(chapter => {
        const newLi = document.createElement("li");
        newLi.setAttribute("data-chapter", chapter.id);
        newLi.innerHTML = `<a href="${chapter.name}.html" title="${chapter.name}"><span>${chapter.name}</span></a>`
        
        if (chapter.id == chapterInfo.id && chapter.name === chapterInfo.name) {
            newLi.classList.add("active");
        }
        fragment.append(newLi);
        
    })
    totalChapters.textContent = `共 ${chapters.length} 章`;
    chapterList.append(fragment);
    
    document.querySelector(".active").scrollIntoView({
        "block": "center"
    });
}

window.addEventListener("load", () => {
    const currentChapterInfo = {
        "id": chapterInfo.id,
        "name": chapterInfo.name
    }
    localStorage.setItem("chapterInfo", JSON.stringify(currentChapterInfo));
})