"use strict"

function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches(".dropbtn")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};

function darkin() {
    document.querySelector(".mz").src ="assets\\pictures\\minimize.png";
    document.querySelector(".mx").src = "assets\\pictures\\restore.png";
    document.querySelector(".clz").src = "assets\\pictures\\close.png";
    document.querySelector(".menu-class").src = "assets\\pictures\\menu.png";
    document.querySelector(".percent").src = "assets\\pictures\\percentage.png";
    document.querySelector(".root").src = "assets\\pictures\\root.png";
    document.querySelector(".divide").src = "assets\\pictures\\divide.png";
    document.querySelector(".delete").src = "assets\\pictures\\clear.png";
    document.querySelector(".multiply").src = "assets\\pictures\\multiply.png";
    document.querySelector(".plus").src = "assets\\pictures\\plus.png";
    document.querySelector(".minus").src = "assets\\pictures\\minus.png";
    document.querySelector(".one-x").src = "assets\\pictures\\fracture.png";
    document.querySelector(".equal").src = "assets\\pictures\\equal.png";
    document.querySelector(".plus-minus").src = "assets\\pictures\\plusminus.png";
    document.querySelector(".history-icon").src = "assets\\pictures\\history.png";
}

function lighten() {
    document.querySelector(".mz").src = "https://img.icons8.com/material-rounded/24/undefined/minus-math--v1.png"
    document.querySelector(".mx").src = "https://img.icons8.com/windows/24/undefined/maximize-button.png";
    document.querySelector(".clz").src = "https://img.icons8.com/ios/50/undefined/delete-sign--v1.png";
    document.querySelector(".menu-class").src = "https://img.icons8.com/material-outlined/24/000000/menu--v2.png";
    document.querySelector(".percent").src = "https://img.icons8.com/ios-glyphs/25/undefined/percentage.png";
    document.querySelector(".root").src = "https://img.icons8.com/ios/30/undefined/square-root.png";
    document.querySelector(".divide").src = "https://img.icons8.com/small/30/undefined/divide.png";
    document.querySelector(".delete").src = "https://img.icons8.com/windows/30/undefined/clear-symbol.png";
    document.querySelector(".multiply").src = "https://img.icons8.com/ios/30/undefined/multiply.png";
    document.querySelector(".plus").src = "https://img.icons8.com/ios/30/undefined/plus-math.png";
    document.querySelector(".minus").src = "https://img.icons8.com/ios/30/undefined/minus-math.png";
    document.querySelector(".one-x").src = "assets\\pictures\\1x.png";
    document.querySelector(".equal").src = "https://img.icons8.com/ios/30/undefined/equal-sign.png";
    document.querySelector(".plus-minus").src =
      "https://img.icons8.com/fluency-systems-regular/28/undefined/plus-minus.png";
      document.querySelector(".history-icon").src =
        "https://img.icons8.com/external-others-amoghdesign/24/000000/external-history-multimedia-solid-30px-others-amoghdesign.png";
}

function changeTheme(x) {
    const buttons = document.querySelectorAll(".big, .sml-btns");
    document.body.className = x;
    switch(x){
        case 'green':
            buttons.forEach(button => {
                button.style.borderRadius = "20px";
            });
            lighten();
            break;
        case 'default':
            buttons.forEach((button) => {
                button.style.borderRadius = "2px";
            });
            lighten();
            break;
        case 'blue':
            buttons.forEach((button) => {
                button.style.borderRadius = "0px";
                button.style.borderTopLeftRadius = "20px";
                button.style.borderBottomRightRadius = "20px";
            });
            lighten();
            break;
        case 'dark':
            buttons.forEach((button) => {
                button.style.borderRadius = "0px";
                button.style.borderBottomRightRadius = "100%";
                button.style.borderBottomLeftRadius = "100%";
            });
            darkin();
            break;
    }
}