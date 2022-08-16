const menuOpen = () => {
    const nav = document.getElementById("nav");
    const hide = document.querySelector(".hide");
    nav.style.width = "80%";
    hide.style.display = "block";
}

const menuClose = () => {
    const nav = document.getElementById("nav");
    const hide = document.querySelector(".hide");
    nav.style.width = "0";
    hide.style.display = "none";
}

const menuOpenDiv = document.querySelector(".menu");
const backMenu = document.querySelector(".back");
menuOpenDiv.addEventListener("click", menuOpen);
backMenu.addEventListener("click", menuClose);

/* media query */

const mediaQueryList = window.matchMedia("(max-width: 600px)");
function handleOrientationChange(mql) {
    if(mql.matches){
        const hide = document.querySelector(".hide");
        hide.style.display = "none";
        const nav = document.getElementById("nav");
        nav.style.width = "0";
        return;
    }
    else {
        const hide = document.querySelector(".hide");
        hide.style.display = "block";
        const nav = document.getElementById("nav");
        nav.style.width = "100%";
        return;
    }
}


handleOrientationChange(mediaQueryList);
mediaQueryList.addEventListener("change", handleOrientationChange);