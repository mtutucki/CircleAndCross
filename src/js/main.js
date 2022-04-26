let $weapon
let $weaponX;
let $weaponO;
let $fieldOne;
let $fieldTwo;
let $fieldThree;
let $fieldFour;
let $fieldFive;
let $fieldSix;
let $fieldSeven;
let $fieldEight;
let $fieldNine;
let $fields;
let $fieldsVal;
let $weaponComp;
const $gameMap = document.body.querySelector(".game__map");
const $gameEnd = document.body.querySelector(".game__end");

const prepareDOMElements = () => {
    $weapon = "O";
    $weaponX = document.body.querySelector(".game__menu__about__weapon__button--x");
    $weaponO = document.body.querySelector(".game__menu__about__weapon__button--o");
    $fieldOne = document.body.querySelector(".game__map__column--one__row--first");
    $fieldTwo = document.body.querySelector(".game__map__column--one__row--second");
    $fieldThree = document.body.querySelector(".game__map__column--one__row--third");
    $fieldFour = document.body.querySelector(".game__map__column--two__row--first");
    $fieldFive = document.body.querySelector(".game__map__column--two__row--second");
    $fieldSix = document.body.querySelector(".game__map__column--two__row--third");
    $fieldSeven = document.body.querySelector(".game__map__column--three__row--first");
    $fieldEight = document.body.querySelector(".game__map__column--three__row--second");
    $fieldNine = document.body.querySelector(".game__map__column--three__row--third");
    $fields = document.body.querySelectorAll(".game__map__column__row");
    $fieldsVal = document.body.querySelectorAll(".game__map__column__row__field");
}

const prepareDOMEvents = () => {
    $weaponX.addEventListener("click", weaponChanger);
    $weaponO.addEventListener("click", weaponChanger);
    $fields.forEach(item => {

        item.addEventListener("click", fillField)

    });
}
const weaponChanger = (e) => {
    if (e.target.textContent == "O") {
        $weapon = "O";
        $weaponO.style.backgroundColor = "#0093E9";
        $weaponX.style.backgroundColor = "transparent";
    } else {
        $weapon = "X";
        $weaponX.style.backgroundColor = "#0093E9";
        $weaponO.style.backgroundColor = "transparent";
    }
}

const fillField = (e) => {

    if (e.target.classList.contains("game__map__column__row__field")) {
        e.target.innerHTML = $weapon;
        e.target.style.opacity = "1";
        checkWin();
        e.target.classList.remove("game__map__column__row__field");
        e.target.classList.add("game__map__column__rows__used__fields__used");
        e.target.parentElement.classList.remove("game__map__column__row")
        e.target.parentElement.classList.add("game__map__column__rows__used")

    } else if (e.target.classList.contains("game__map__column__row")) {
        e.target.firstElementChild.innerHTML = $weapon;
        e.target.firstElementChild.style.opacity = "1";
        e.target.classList.remove("game__map__column__row");
        e.target.classList.add("game__map__column__rows__used")

        checkWin();
    }

}

const checkWin = () => {
    if ($fieldsVal[0].textContent == $fieldsVal[1].textContent && $fieldsVal[1].textContent == $fieldsVal[2].textContent ||
        $fieldsVal[3].textContent == $fieldsVal[4].textContent && $fieldsVal[4].textContent == $fieldsVal[5].textContent ||
        $fieldsVal[6].textContent == $fieldsVal[7].textContent && $fieldsVal[7].textContent == $fieldsVal[8].textContent ||
        $fieldsVal[0].textContent == $fieldsVal[3].textContent && $fieldsVal[3].textContent == $fieldsVal[6].textContent ||
        $fieldsVal[1].textContent == $fieldsVal[4].textContent && $fieldsVal[4].textContent == $fieldsVal[7].textContent ||
        $fieldsVal[2].textContent == $fieldsVal[5].textContent && $fieldsVal[5].textContent == $fieldsVal[8].textContent ||
        $fieldsVal[0].textContent == $fieldsVal[4].textContent && $fieldsVal[4].textContent == $fieldsVal[8].textContent ||
        $fieldsVal[2].textContent == $fieldsVal[4].textContent && $fieldsVal[4].textContent == $fieldsVal[6].textContent
    ) {
        endGame();
    } else {
        compMove();
    }
}

const endGame = () => {
    setTimeout(() => {
        $gameMap.style.display = "none";
        $gameEnd.style.display = "flex";
        $gameEnd.style.opacity = "1";
    }, 600);

}

const weaponCompCheck = () => {
    if ($weapon == "O") {
        $weaponComp = "X";
    } else if ($weapon == "X") {
        $weaponComp = "O";
    }
}


const compMove = () => {
    weaponCompCheck();

}


const main = () => {
    prepareDOMElements();
    prepareDOMEvents();

}

addEventListener("DOMContentLoaded", main);