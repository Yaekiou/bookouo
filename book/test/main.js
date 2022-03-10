const body = document.body;
const page = document.querySelector("#page");
const chapterContent = document.querySelector("#chapter-content");

// +- font size
const decreaseFontSizeBtn = document.querySelector(".fontsize-via-btn #decrease");
const increaseFontSizeBtn = document.querySelector(".fontsize-via-btn #increase");
const fontSizeDisplay = document.querySelector(".fontsize-via-btn .current-fontsize");
const fontSizeSelect = document.querySelector(".fontsize-select select");

const DEFAULT_FONT_SIZE = 20;
const MIN_FONT_SIZE = 16;
const MAX_FONT_SIZE = 40;

let currentFontSize = DEFAULT_FONT_SIZE;

let timeout, interval;

;(function createFontSizeSelectOptions() {
    for (let i = MIN_FONT_SIZE; i <= MAX_FONT_SIZE; i++) {
        if (i % 2 == 0) {
            fontSizeSelect.add(new Option(i, i));
        }
    }
})()

fontSizeSelect.addEventListener("change", () => {
    currentFontSize = Number(fontSizeSelect.value);
    checkButtonStatus();
    saveFontSize();
})

;[decreaseFontSizeBtn, increaseFontSizeBtn].forEach(btn => {
    btn.addEventListener("pointerdown", () => {
        if (btn.id === "decrease") {
            decreaseFontSize();
            holdButton(decreaseFontSize);
        }

        if (btn.id === "increase") {
            increaseFontSize();
            holdButton(increaseFontSize);
        }
    })

    btn.addEventListener("pointerup", clearTimers);
    btn.addEventListener("pointerleave", clearTimers);
})

function decreaseFontSize() {
    if (currentFontSize > MIN_FONT_SIZE) {
        currentFontSize -= 2;
    }
    checkButtonStatus();
    saveFontSize();
}

function increaseFontSize() {
    if (currentFontSize < MAX_FONT_SIZE) {
        currentFontSize += 2;
    }
    checkButtonStatus();
    saveFontSize();
}

function clearTimers() {
    clearTimeout(timeout);
    clearInterval(interval);
}

function holdButton(func) {
    timeout = setTimeout(() => {
        interval = setInterval(() => {
            func();
        }, 50)
    }, 300)
}

function checkButtonStatus() {
    if (currentFontSize === MIN_FONT_SIZE) {
        decreaseFontSizeBtn.disabled = true;
    } else {
        decreaseFontSizeBtn.disabled = false;
    }

    if (currentFontSize === MAX_FONT_SIZE) {
        increaseFontSizeBtn.disabled = true;
    } else {
        increaseFontSizeBtn.disabled = false;
    }
}

function saveFontSize() {
    setFontSize();

    if (document.querySelector(".fontsize-message")) {
        document.querySelector(".fontsize-message").textContent = currentFontSize;
    }

    localStorage.setItem("contentFontSize", currentFontSize);
}

;(function loadFontSize() {
    if (localStorage.getItem("contentFontSize")) {
        currentFontSize = Number(localStorage.getItem("contentFontSize"));
        setFontSize();
        checkButtonStatus();
    } else {
        setFontSize();
    }
})()

function setFontSize() {
    fontSizeDisplay.textContent = currentFontSize;
    fontSizeSelect.value = currentFontSize;
    chapterContent.style.fontSize = currentFontSize + "px";
}

function changeFontSizeOnKeydown(e) {
    if (!e.ctrlKey) {
        switch (e.key) {
            case decreaseFontSizeBtn.dataset.shortKey:
                decreaseFontSize();
                showFontSizeBox();
                break;

            case increaseFontSizeBtn.dataset.shortKey:
                increaseFontSize();
                showFontSizeBox();
                break;
        
            default:
                break;
        }
    }
}

function showFontSizeBox() {
    const newDiv = document.createElement("div");
    newDiv.className = "fontsize-message";

    if (!document.querySelector(".fontsize-message")) {
        body.insertAdjacentElement("beforeend", newDiv);
    }

    const element = document.querySelector(".fontsize-message");

    element.textContent = currentFontSize;
    element.classList.add("show");

    if (timeout) clearTimeout(timeout);

    timeout = setTimeout(() => {
        element.classList.remove("show");
        element.addEventListener("transitionend", () => {
            element.remove();
        })
    }, 2000);
}


// theme switcher
const themeBtns = document.querySelectorAll(".theme-switcher button");

if (localStorage.getItem("readingTheme")) {
    addThemeToBody(localStorage.getItem("readingTheme"));
} else {
    body.classList.add("theme-light-1");
}

themeBtns.forEach(btn => {
    btn.addEventListener("click", e => {
        changeTheme(btn, btn.classList[0]);
    })

    if (body.classList.contains(btn.classList[0])) {
        btn.classList.add("selected");
    }
})

function changeTheme(button, themeName) {
    if (!body.classList.contains(themeName)) {
        addThemeToBody(themeName);
    }

    localStorage.setItem("readingTheme", button.classList[0]);

    themeBtns.forEach(btn => btn.classList.remove("selected"));
    button.classList.add("selected");
}

function addThemeToBody(themeName) {
    themeBtns.forEach(btn => body.classList.remove(btn.classList[0]));
    body.classList.add(themeName);
}

function changeThemeOnKeyup(e) {
    themeBtns.forEach(btn => {
        if (e.key === btn.dataset.shortKey) {
            changeTheme(btn, btn.classList[0]);
        }
    })
}


// shortcut
window.addEventListener("keyup", e => {
    changeThemeOnKeyup(e);
})

window.addEventListener("keydown", changeFontSizeOnKeydown);