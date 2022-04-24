let $weapon
let $weaponX;
let $weaponO;

const prepareDOMElements = () => {
    $weapon = "O";
    $weaponX = document.body.querySelector(".game__menu__about__weapon__button--x");
    $weaponO = document.body.querySelector(".game__menu__about__weapon__button--o");
}

const prepareDOMEvents = () => {
    $weaponX.addEventListener("click", weaponChanger);
    $weaponO.addEventListener("click", weaponChanger);
}

const weaponChanger = (e) => {
    if (e.target.textContent == "O"){
        $weapon = "O";
        $weaponO.style.backgroundColor = "#0093E9";
        $weaponX.style.backgroundColor = "transparent";
        console.log($weapon);
    }
    else{
        $weapon = "X";
        $weaponX.style.backgroundColor = "#0093E9";
        $weaponO.style.backgroundColor = "transparent";
        console.log($weapon);
    }


}







const main = () => {
    prepareDOMElements();
    prepareDOMEvents();

}

addEventListener("DOMContentLoaded", main);