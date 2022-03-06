const body = document.querySelector("body");
const page = document.querySelector("#page");
const chapterContent = document.querySelector("#chapter-content");


const renderPageActions = [renderHeader, renderPageOpt, renderCatalogPanel, renderChapters, renderNavigation];
renderPageActions.forEach(func => func());


function renderHeader() {
    const newHeader = document.createElement("header");
    newHeader.className = "chapter-title";
    newHeader.innerHTML = `<div class="container"><h3><span>${chapterInfo.name}</span></h3></div>`;
    body.insertAdjacentElement("afterbegin", newHeader);
}

function renderPageOpt() {
    const newDiv = document.createElement("div");
    newDiv.className = "page-options";
    newDiv.innerHTML = `
        <header>
            <div class="container">
                <a href="../../index.html" class="home">
                    <span class="iconify" data-icon="charm:home"></span>
                </a>
                <h3 class="book-name"><a href="index.html" class="ellipsis"><span>${bookName}</span></a></h3>
                <a href="" class="home hidden">
                    <span class="iconify" data-icon="charm:home"></span>
                </a>
            </div>
        </header>
        <a href="${chapterInfo.prevChapter}.html" class="nav-chapter prev">上一章</a>
        <a href="${chapterInfo.nextChapter}.html" class="nav-chapter next">下一章</a>
        <div class="reading-settings">
            <div class="container">
                <button class="open-catalog-btn">目錄</button>
                <div class="fontsize-setting">
                    <button id="decrease" data-short-key="-">A-</button>
                    <div class="current-fontsize">20</div>
                    <button id="increase" data-short-key="=">A+</button>

                    <select class="mobile-fontsize-menu">
                        <option disabled>選擇字體大小</option>
                    </select>
                    <div class="indent-btn">
                        <span class="iconify" data-icon="bi:text-indent-left"></span>
                    </div>

                </div>
                <div class="theme-switcher">
                    <button class="theme-light-1" data-short-key="1">Aa</button>
                    <button class="theme-light-2" data-short-key="2">Aa</button>
                    <button class="theme-dark-1" data-short-key="3">Aa</button>
                    <button class="theme-dark-2" data-short-key="4">Aa</button>
                </div>
            </div>
        </div>
    `;
    body.insertAdjacentElement("afterbegin", newDiv);
}

function renderCatalogPanel() {
    const newDiv = document.createElement("div");
    newDiv.className = "catalog";
    newDiv.innerHTML = `
        <div class="catalog-panel">
            <div class="topbar">
                <div class="title">目錄</div>
                <button class="close-catalog-btn">
                    <span class="iconify" data-icon="clarity:window-close-line"></span>
                </button>
            </div>
            <div class="tools">
                <div class="total-chapters">共 <span>0</span> 章</div>
            </div>
            <ul id="chapter-list"></ul>
        </div>
    `;
    body.insertAdjacentElement("afterbegin", newDiv);
}

function renderNavigation() {
    const newDivTop = document.createElement("div");
    const newDivBottom = document.createElement("div");

    newDivTop.className = "navigation";
    newDivBottom.className = "navigation";

    newDivTop.setAttribute("data-position", "top");
    newDivBottom.setAttribute("data-position", "bottom");

    linkContent = `
        <a href="${chapterInfo.prevChapter}.html" class="prev-chapter">上一章</a>
        <a href="index.html" class="go-to-book">書頁</a>
        <a href="${chapterInfo.nextChapter}.html" class="next-chapter">下一章</a>
    `;

    newDivTop.innerHTML = linkContent;
    newDivBottom.innerHTML = linkContent;

    page.insertAdjacentElement("afterbegin", newDivTop);
    page.insertAdjacentElement("beforeend", newDivBottom);
}

document.querySelectorAll("a").forEach(aTag => aTag.addEventListener("click", e => e.stopPropagation()));


const themeOptions = document.querySelectorAll(".theme-switcher button");

if (localStorage.getItem("readingTheme")) {
    body.className = localStorage.getItem("readingTheme");
}

themeOptions.forEach(btn => {
    btn.addEventListener("click", () => {
        changeTheme(btn, btn.classList[0]);
    })

    if (btn.classList[0] === body.className) {
        btn.classList.add("selected");
    }
})

function changeTheme(button, themeName) {
    body.className = themeName;
    localStorage.setItem("readingTheme", button.classList[0]);

    themeOptions.forEach(btn => btn.classList.remove("selected"));
    button.classList.add("selected");
}


const setFontSizeBtns = document.querySelectorAll(".fontsize-setting button");
const decreaseFontSizeBtn = document.querySelector(".fontsize-setting #decrease");
const increaseFontSizeBtn = document.querySelector(".fontsize-setting #increase");
const displayFontSize = document.querySelector(".current-fontsize");
const fontSizeSelectMenu = document.querySelector(".fontsize-setting select");
const mobileIndentBtn = document.querySelector(".fontsize-setting .indent-btn");
const defaultFontSize = 20;
const maxFontSize = 40;
const minFontSize = 16;
let currentFontSize = defaultFontSize;


for (let i = minFontSize; i <= maxFontSize; i++) {
    if (i % 2 == 0) {
        fontSizeSelectMenu.add(new Option(i, i))
    }
}

fontSizeSelectMenu.addEventListener("change", e => {
    currentFontSize = Number(e.target.value);
    // fontSizeSelectMenu.options[fontSizeSelectMenu.selectedIndex].setAttribute("selected", "");
    saveFontSize();
})


document.querySelectorAll(".fontsize-setting select option").forEach(opt => {
    if (localStorage.getItem("contentFontSize")) {
        if (opt.value == localStorage.getItem("contentFontSize")) {
            opt.setAttribute("selected", "");
        }
    } else {
        if (opt.value == defaultFontSize) {
            opt.setAttribute("selected", "");
        }
    }
})


displayFontSize.addEventListener("click", () => {
    toggleTextIndent();
})

mobileIndentBtn.addEventListener("click", () => {
    toggleTextIndent();
})

if (localStorage.getItem("contentFontSize")) {
    if (localStorage.getItem("contentFontSize") <= maxFontSize) {
        chapterContent.style.fontSize = localStorage.getItem("contentFontSize") + "px";
        currentFontSize = parseFloat(localStorage.getItem("contentFontSize"));
        displayFontSize.textContent = currentFontSize;
    }
} else {
    localStorage.setItem("contentFontSize", defaultFontSize);
}

setFontSizeBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        if (btn.id === "decrease") {
            decreaseFontSize();
        }

        if (btn.id === "increase") {
            increaseFontSize();
        }
        saveFontSize();
    })
})

function triggerChange(element) {
    let changeEvent = new Event("change");
    element.dispatchEvent(changeEvent);
}

function decreaseFontSize() {
    if (currentFontSize > minFontSize) {
        currentFontSize -= 2;
    } 
    if (currentFontSize === minFontSize) {
        decreaseFontSizeBtn.disabled = true;
    } else {
        increaseFontSizeBtn.disabled = false;
    }
    fontSizeSelectMenu.value = currentFontSize;
    triggerChange(fontSizeSelectMenu);
}

function increaseFontSize() {
    if (currentFontSize < maxFontSize) {
        currentFontSize += 2;
    }
    if (currentFontSize === maxFontSize) {
        increaseFontSizeBtn.disabled = true;
    } else {
        decreaseFontSizeBtn.disabled = false;
    }
    fontSizeSelectMenu.value = currentFontSize;
    triggerChange(fontSizeSelectMenu);
}

function saveFontSize() {
    displayFontSize.textContent = currentFontSize;
    chapterContent.style.fontSize = currentFontSize + "px";
    localStorage.setItem("contentFontSize", currentFontSize);
}


const catalogOverlay = document.querySelector(".catalog");
const catalogPanel = document.querySelector(".catalog-panel");
const closeCatalogBtn = document.querySelector(".close-catalog-btn");

function showCatalog() {
    catalogOverlay.classList.add("show");
    body.setAttribute("data-scrollable", "false");
    scrollToCurrentChapter();
}

function hideCatalog() {
    catalogOverlay.classList.remove("show");
    body.removeAttribute("data-scrollable");
}

catalogOverlay.addEventListener("click", e => {
    if (e.target == catalogOverlay) {
        hideCatalog();
    }
})

closeCatalogBtn.addEventListener("click", () => {
    hideCatalog();
})


const pageOpt = document.querySelector(".page-options");
const openPageOptnBtn = document.querySelector(".open-catalog-btn");
const mql = window.matchMedia("(max-width: 600px)");

function showPageOpt() {
    pageOpt.classList.add("show");
}

function hidePageOpt() {
    pageOpt.classList.remove("show");
}

page.addEventListener("click", () => {
    if (mql.matches) {
        showPageOpt();
    }
})

pageOpt.addEventListener("click", e => {
    if (e.target === pageOpt) {
        hidePageOpt();
    }
})

openPageOptnBtn.addEventListener("click", () => {
    hidePageOpt();
    showCatalog();
})


const chapterList = document.querySelector("#chapter-list");
const totalChapters = document.querySelector(".total-chapters span");
const fragment = document.createDocumentFragment();

async function fetchChapters() {
    const response = await fetch("./data/chapters.json");
    return await response.json();
}

async function renderChapters() {
    const chapters = await fetchChapters();

    totalChapters.textContent = chapters.length;

    chapters.forEach(chapter => {
        const newLi = document.createElement("li");
        newLi.setAttribute("data-chapter", chapter.id);
        newLi.innerHTML = `<a href="${chapter.name}.html" class="ellipsis" title="${chapter.name}"><span>${chapter.name}</span></a>`;

        if (chapter.id == chapterInfo.id && chapter.name === chapterInfo.name) {
            newLi.classList.add("active");
        }
        
        fragment.append(newLi);
    })
    chapterList.append(fragment);

    scrollToCurrentChapter();
}


let timeOutHandler = null;

function showFontSizeMsg() {
    const newDiv = document.createElement("div");
    newDiv.className = "msg-container";

    if (!body.querySelector(".msg-container")) {
        body.insertAdjacentElement("afterbegin", newDiv);
    }

    const message = document.querySelector(".msg-container");

    message.textContent = localStorage.getItem("contentFontSize");
    
    message.classList.add("show");

    if (timeOutHandler) clearTimeout(timeOutHandler);

    timeOutHandler = setTimeout(() => {
        message.classList.remove("show");
        message.addEventListener("transitionend", () => {
            message.remove();
        })
    }, 2000)
}

window.addEventListener("keyup", e => {
    switch (e.key) {
        case "i":
            toggleTextIndent();
            break;

        case "o":
            if (pageOpt.classList.contains("show")) {
                hidePageOpt();
            } else {
                showPageOpt();
                hideCatalog();
            }
            break;

        case "l":
            if (catalogOverlay.classList.contains("show")) {
                hideCatalog();
            } else {
                hidePageOpt();
                showCatalog();
            }
            break;

        case "Escape":
            hideCatalog();
            hidePageOpt();
            break;

        case "ArrowLeft":
            window.location.href = `${chapterInfo.prevChapter}.html`;
            break;

        case "ArrowRight":
            window.location.href = `${chapterInfo.nextChapter}.html`;
            break;

        case "Enter":
            window.location.href = `index.html`;
        
        case "h":
            window.location.href = `../../index.html`;
    
        default:
            break;
    }

    themeOptions.forEach(btn => {
        if (e.key === btn.dataset.shortKey) {
            changeTheme(btn, btn.classList[0]);
        }
    })
})

window.addEventListener("keydown", e => {
    if (!e.ctrlKey) {
        switch (e.key) {
            case decreaseFontSizeBtn.dataset.shortKey:
                decreaseFontSize();
                saveFontSize();
                showFontSizeMsg();
                break;
    
            case increaseFontSizeBtn.dataset.shortKey:
                increaseFontSize();
                saveFontSize();
                showFontSizeMsg();
                break;
        
            default:
                break;
        }
    }
})

function scrollToCurrentChapter() {
    document.querySelector("li.active").scrollIntoView({
        "block": "center"
    });
}

function toggleTextIndent() {
    chapterContent.classList.toggle("text-indent");

    if (chapterContent.classList.contains("text-indent")) {
        localStorage.setItem("text-indent", true);
    } else {
        localStorage.removeItem("text-indent");
    }
}

if (localStorage.getItem("text-indent")) {
    chapterContent.classList.add("text-indent");
} else {
    chapterContent.classList.remove("text-indent");
}

const currentChapterInfo = {
    "id": chapterInfo.id,
    "name": chapterInfo.name
};
localStorage.setItem("chapterInfo", JSON.stringify(currentChapterInfo));