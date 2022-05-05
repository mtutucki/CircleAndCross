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
        e.target.classList.remove("game__map__column__row__field");
        e.target.classList.add("game__map__column__rows__used__fields__used");
        e.target.parentElement.classList.remove("game__map__column__row")
        e.target.parentElement.classList.add("game__map__column__rows__used")

        checkWin();

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
    $fields.forEach(item => {
        item.removeEventListener("click", fillField);
        item.classList.remove("game__map__column__row");
        item.classList.add("game__map__column__rows__used")

    });
    setTimeout(() => {
        $gameMap.style.display = "none";
        $gameEnd.style.display = "flex";
        $gameEnd.style.opacity = "1";
    }, 800);

}

const weaponCompCheck = () => {
    if ($weapon == "O") {
        $weaponComp = "X";
    } else if ($weapon == "X") {
        $weaponComp = "O";
    }
}

const compListenerRemove = (fieldsIndex) => {
    $fieldsVal[fieldsIndex].classList.remove("game__map__column__row__field");
    $fieldsVal[fieldsIndex].classList.add("game__map__column__rows__used__fields__used");
    $fieldsVal[fieldsIndex].parentElement.classList.remove("game__map__column__row")
    $fieldsVal[fieldsIndex].parentElement.classList.add("game__map__column__rows__used")
}

const compRowsAndSlantComp = () => {
    // check if user does have opportunity to win

    // 0 1 2
    if ($fieldsVal[0].textContent == $weapon && $fieldsVal[2].textContent == $weapon && $fieldsVal[1].innerHTML !== $weaponComp && $fieldsVal[1].innerHTML !== $weapon) {
        $fieldsVal[1].innerHTML = $weaponComp;
        compListenerRemove(1);
    } else if ($fieldsVal[0].textContent == $weapon && $fieldsVal[1].textContent == $weapon && $fieldsVal[2].innerHTML !== $weaponComp && $fieldsVal[2].innerHTML !== $weapon) {
        $fieldsVal[2].innerHTML = $weaponComp;
        compListenerRemove(2);
    } else if ($fieldsVal[2].textContent == $weapon && $fieldsVal[1].textContent == $weapon && $fieldsVal[0].innerHTML !== $weaponComp && $fieldsVal[0].innerHTML !== $weapon) {
        $fieldsVal[0].innerHTML = $weaponComp;
        compListenerRemove(0);
    }

    // 3 4 5
    else if ($fieldsVal[3].textContent == $weapon && $fieldsVal[5].textContent == $weapon && $fieldsVal[4].innerHTML !== $weaponComp && $fieldsVal[4].innerHTML !== $weapon) {
        $fieldsVal[4].innerHTML = $weaponComp;
        compListenerRemove(4);
    } else if ($fieldsVal[3].textContent == $weapon && $fieldsVal[4].textContent == $weapon && $fieldsVal[5].innerHTML !== $weaponComp && $fieldsVal[5].innerHTML !== $weapon) {
        $fieldsVal[5].innerHTML = $weaponComp;
        compListenerRemove(5);
    } else if ($fieldsVal[4].textContent == $weapon && $fieldsVal[5].textContent == $weapon && $fieldsVal[3].innerHTML !== $weaponComp && $fieldsVal[3].innerHTML !== $weapon) {
        $fieldsVal[3].innerHTML = $weaponComp;
        compListenerRemove(3);
    }

    // 6 7 8
    else if ($fieldsVal[6].textContent == $weapon && $fieldsVal[8].textContent == $weapon && $fieldsVal[7].innerHTML !== $weaponComp && $fieldsVal[7].innerHTML !== $weapon) {
        $fieldsVal[7].innerHTML = $weaponComp;
        compListenerRemove(7);
    } else if ($fieldsVal[6].textContent == $weapon && $fieldsVal[7].textContent == $weapon && $fieldsVal[8].innerHTML !== $weaponComp && $fieldsVal[8].innerHTML !== $weapon) {
        $fieldsVal[8].innerHTML = $weaponComp;
        compListenerRemove(8);
    } else if ($fieldsVal[7].textContent == $weapon && $fieldsVal[8].textContent == $weapon && $fieldsVal[6].innerHTML !== $weaponComp && $fieldsVal[6].innerHTML !== $weapon) {
        $fieldsVal[6].innerHTML = $weaponComp;
        compListenerRemove(6);
    }

    // 0 3 6
    else if ($fieldsVal[0].textContent == $weapon && $fieldsVal[6].textContent == $weapon && $fieldsVal[3].innerHTML !== $weaponComp && $fieldsVal[3].innerHTML !== $weapon) {
        $fieldsVal[3].innerHTML = $weaponComp;
        compListenerRemove(3);
    } else if ($fieldsVal[0].textContent == $weapon && $fieldsVal[3].textContent == $weapon && $fieldsVal[6].innerHTML !== $weaponComp && $fieldsVal[6].innerHTML !== $weapon) {
        $fieldsVal[6].innerHTML = $weaponComp;
        compListenerRemove(6);
    } else if ($fieldsVal[3].textContent == $weapon && $fieldsVal[6].textContent == $weapon && $fieldsVal[0].innerHTML !== $weaponComp && $fieldsVal[0].innerHTML !== $weapon) {
        $fieldsVal[0].innerHTML = $weaponComp;
        compListenerRemove(0);
    }

    // 1 4 7 
    else if ($fieldsVal[1].textContent == $weapon && $fieldsVal[7].textContent == $weapon && $fieldsVal[4].innerHTML !== $weaponComp && $fieldsVal[4].innerHTML !== $weapon) {
        $fieldsVal[4].innerHTML = $weaponComp;
        compListenerRemove(4);
    } else if ($fieldsVal[1].textContent == $weapon && $fieldsVal[4].textContent == $weapon && $fieldsVal[7].innerHTML !== $weaponComp && $fieldsVal[7].innerHTML !== $weapon) {
        $fieldsVal[7].innerHTML = $weaponComp;
        compListenerRemove(7);
    } else if ($fieldsVal[4].textContent == $weapon && $fieldsVal[7].textContent == $weapon && $fieldsVal[1].innerHTML !== $weaponComp && $fieldsVal[1].innerHTML !== $weapon) {
        $fieldsVal[1].innerHTML = $weaponComp;
        compListenerRemove(1);
    }

    // 2 5 8  
    else if ($fieldsVal[2].textContent == $weapon && $fieldsVal[8].textContent == $weapon && $fieldsVal[5].innerHTML !== $weaponComp && $fieldsVal[5].innerHTML !== $weapon) {
        $fieldsVal[5].innerHTML = $weaponComp;
        compListenerRemove(5);
    } else if ($fieldsVal[2].textContent == $weapon && $fieldsVal[5].textContent == $weapon && $fieldsVal[8].innerHTML !== $weaponComp && $fieldsVal[8].innerHTML !== $weapon) {
        $fieldsVal[8].innerHTML = $weaponComp;
        compListenerRemove(8);
    } else if ($fieldsVal[5].textContent == $weapon && $fieldsVal[8].textContent == $weapon && $fieldsVal[2].innerHTML !== $weaponComp && $fieldsVal[2].innerHTML !== $weapon) {
        $fieldsVal[2].innerHTML = $weaponComp;
        compListenerRemove(2);
    }

    // 0 4 8
    else if ($fieldsVal[0].textContent == $weapon && $fieldsVal[8].textContent == $weapon && $fieldsVal[4].innerHTML !== $weaponComp && $fieldsVal[4].innerHTML !== $weapon) {
        $fieldsVal[4].innerHTML = $weaponComp;
        compListenerRemove(4);
    } else if ($fieldsVal[0].textContent == $weapon && $fieldsVal[4].textContent == $weapon && $fieldsVal[8].innerHTML !== $weaponComp && $fieldsVal[8].innerHTML !== $weapon) {
        $fieldsVal[8].innerHTML = $weaponComp;
        compListenerRemove(8);
    } else if ($fieldsVal[4].textContent == $weapon && $fieldsVal[8].textContent == $weapon && $fieldsVal[0].innerHTML !== $weaponComp && $fieldsVal[0].innerHTML !== $weapon) {
        $fieldsVal[0].innerHTML = $weaponComp;
        compListenerRemove(0);
    }

    // 2 4 6
    else if ($fieldsVal[2].textContent == $weapon && $fieldsVal[6].textContent == $weapon && $fieldsVal[4].innerHTML !== $weaponComp && $fieldsVal[4].innerHTML !== $weapon) {
        $fieldsVal[4].innerHTML = $weaponComp;
        compListenerRemove(4);
    } else if ($fieldsVal[2].textContent == $weapon && $fieldsVal[4].textContent == $weapon && $fieldsVal[6].innerHTML !== $weaponComp && $fieldsVal[6].innerHTML !== $weapon) {
        $fieldsVal[6].innerHTML = $weaponComp;
        compListenerRemove(6);
    } else if ($fieldsVal[4].textContent == $weapon && $fieldsVal[6].textContent == $weapon && $fieldsVal[2].innerHTML !== $weaponComp && $fieldsVal[2].innerHTML !== $weapon) {
        $fieldsVal[2].innerHTML = $weaponComp;
        compListenerRemove(2);
    }
    
    // check if comp does have opportunity to win
    // 0 1 2
    else if ($fieldsVal[0].textContent == $weaponComp && $fieldsVal[2].textContent == $weaponComp && $fieldsVal[1].innerHTML !== $weaponComp && $fieldsVal[1].innerHTML !== $weapon) {
        $fieldsVal[1].innerHTML = $weaponComp;
        compListenerRemove(1);
    } else if ($fieldsVal[0].textContent == $weaponComp && $fieldsVal[1].textContent == $weaponComp && $fieldsVal[2].innerHTML !== $weaponComp && $fieldsVal[2].innerHTML !== $weapon) {
        $fieldsVal[2].innerHTML = $weaponComp;
        compListenerRemove(2);
    } else if ($fieldsVal[2].textContent == $weaponComp && $fieldsVal[1].textContent == $weaponComp && $fieldsVal[0].innerHTML !== $weaponComp && $fieldsVal[0].innerHTML !== $weapon) {
        $fieldsVal[0].innerHTML = $weaponComp;
        compListenerRemove(0);
    }

    // 3 4 5
    else if ($fieldsVal[3].textContent == $weaponComp && $fieldsVal[5].textContent == $weaponComp && $fieldsVal[4].innerHTML !== $weaponComp && $fieldsVal[4].innerHTML !== $weapon) {
        $fieldsVal[4].innerHTML = $weaponComp;
        compListenerRemove(4);
    } else if ($fieldsVal[3].textContent == $weaponComp && $fieldsVal[4].textContent == $weaponComp && $fieldsVal[5].innerHTML !== $weaponComp && $fieldsVal[5].innerHTML !== $weapon) {
        $fieldsVal[5].innerHTML = $weaponComp;
        compListenerRemove(5);
    } else if ($fieldsVal[4].textContent == $weaponComp && $fieldsVal[5].textContent == $weaponComp && $fieldsVal[3].innerHTML !== $weaponComp && $fieldsVal[3].innerHTML !== $weapon) {
        $fieldsVal[3].innerHTML = $weaponComp;
        compListenerRemove(3);
    }

    // 6 7 8
    else if ($fieldsVal[6].textContent == $weaponComp && $fieldsVal[8].textContent == $weaponComp && $fieldsVal[7].innerHTML !== $weaponComp && $fieldsVal[7].innerHTML !== $weapon) {
        $fieldsVal[7].innerHTML = $weaponComp;
        compListenerRemove(7);
    } else if ($fieldsVal[6].textContent == $weaponComp && $fieldsVal[7].textContent == $weaponComp && $fieldsVal[8].innerHTML !== $weaponComp && $fieldsVal[8].innerHTML !== $weapon) {
        $fieldsVal[8].innerHTML = $weaponComp;
        compListenerRemove(8);
    } else if ($fieldsVal[7].textContent == $weaponComp && $fieldsVal[8].textContent == $weaponComp && $fieldsVal[6].innerHTML !== $weaponComp && $fieldsVal[6].innerHTML !== $weaponComp) {
        $fieldsVal[6].innerHTML = $weaponComp;
        compListenerRemove(6);
    }

    // 0 3 6
    else if ($fieldsVal[0].textContent == $weaponComp && $fieldsVal[6].textContent == $weaponComp && $fieldsVal[3].innerHTML !== $weaponComp && $fieldsVal[3].innerHTML !== $weapon) {
        $fieldsVal[3].innerHTML = $weaponComp;
        compListenerRemove(3);
    } else if ($fieldsVal[0].textContent == $weaponComp && $fieldsVal[3].textContent == $weaponComp && $fieldsVal[6].innerHTML !== $weaponComp && $fieldsVal[6].innerHTML !== $weapon) {
        $fieldsVal[6].innerHTML = $weaponComp;
        compListenerRemove(6);
    } else if ($fieldsVal[3].textContent == $weaponComp && $fieldsVal[6].textContent == $weaponComp && $fieldsVal[0].innerHTML !== $weaponComp && $fieldsVal[0].innerHTML !== $weapon) {
        $fieldsVal[0].innerHTML = $weaponComp;
        compListenerRemove(0);
    }

    // 1 4 7 
    else if ($fieldsVal[1].textContent == $weaponComp && $fieldsVal[7].textContent == $weaponComp && $fieldsVal[4].innerHTML !== $weaponComp && $fieldsVal[4].innerHTML !== $weapon) {
        $fieldsVal[4].innerHTML = $weaponComp;
        compListenerRemove(4);
    } else if ($fieldsVal[1].textContent == $weaponComp && $fieldsVal[4].textContent == $weapon && $fieldsVal[7].innerHTML !== $weaponComp && $fieldsVal[7].innerHTML !== $weapon) {
        $fieldsVal[7].innerHTML = $weaponComp;
        compListenerRemove(7);
    } else if ($fieldsVal[4].textContent == $weaponComp && $fieldsVal[7].textContent == $weapon && $fieldsVal[1].innerHTML !== $weaponComp && $fieldsVal[1].innerHTML !== $weapon) {
        $fieldsVal[1].innerHTML = $weaponComp;
        compListenerRemove(1);
    }

    // 2 5 8  
    else if ($fieldsVal[2].textContent == $weaponComp && $fieldsVal[8].textContent == $weapon && $fieldsVal[5].innerHTML !== $weaponComp && $fieldsVal[5].innerHTML !== $weapon) {
        $fieldsVal[5].innerHTML = $weaponComp;
        compListenerRemove(5);
    } else if ($fieldsVal[2].textContent == $weaponComp && $fieldsVal[5].textContent == $weapon && $fieldsVal[8].innerHTML !== $weaponComp && $fieldsVal[8].innerHTML !== $weapon) {
        $fieldsVal[8].innerHTML = $weaponComp;
        compListenerRemove(8);
    } else if ($fieldsVal[5].textContent == $weaponComp && $fieldsVal[8].textContent == $weapon && $fieldsVal[2].innerHTML !== $weaponComp && $fieldsVal[2].innerHTML !== $weapon) {
        $fieldsVal[2].innerHTML = $weaponComp;
        compListenerRemove(2);
    }

    // 0 4 8
    else if ($fieldsVal[0].textContent == $weaponComp && $fieldsVal[8].textContent == $weapon && $fieldsVal[4].innerHTML !== $weaponComp && $fieldsVal[4].innerHTML !== $weapon) {
        $fieldsVal[4].innerHTML = $weaponComp;
        compListenerRemove(4);
    } else if ($fieldsVal[0].textContent == $weaponComp && $fieldsVal[4].textContent == $weapon && $fieldsVal[8].innerHTML !== $weaponComp && $fieldsVal[8].innerHTML !== $weapon) {
        $fieldsVal[8].innerHTML = $weaponComp;
        compListenerRemove(8);
    } else if ($fieldsVal[4].textContent == $weaponComp && $fieldsVal[8].textContent == $weapon && $fieldsVal[0].innerHTML !== $weaponComp && $fieldsVal[0].innerHTML !== $weapon) {
        $fieldsVal[0].innerHTML = $weaponComp;
        compListenerRemove(0);
    }

    // 2 4 6
    else if ($fieldsVal[2].textContent == $weaponComp && $fieldsVal[6].textContent == $weapon && $fieldsVal[4].innerHTML !== $weaponComp && $fieldsVal[4].innerHTML !== $weapon) {
        $fieldsVal[4].innerHTML = $weaponComp;
        compListenerRemove(4);
    } else if ($fieldsVal[2].textContent == $weaponComp && $fieldsVal[4].textContent == $weapon && $fieldsVal[6].innerHTML !== $weaponComp && $fieldsVal[6].innerHTML !== $weapon) {
        $fieldsVal[6].innerHTML = $weaponComp;
        compListenerRemove(6);
    } else if ($fieldsVal[4].textContent == $weaponComp && $fieldsVal[6].textContent == $weapon && $fieldsVal[2].innerHTML !== $weaponComp && $fieldsVal[2].innerHTML !== $weapon) {
        $fieldsVal[2].innerHTML = $weaponComp;
        compListenerRemove(2);
    }

    else{
        for (let i = 0; i < $fieldsVal.length; i++) {
            if($fieldsVal[i].textContent !== $weapon && $fieldsVal[i].textContent !== $weaponComp){
                $fieldsVal[i].innerHTML = $weaponComp;
                compListenerRemove(i);
                break;
            }
            
        }
    }

}

const compMove = () => {
    weaponCompCheck();
    compRowsAndSlantComp();
}


const main = () => {
    prepareDOMElements();
    prepareDOMEvents();

}

addEventListener("DOMContentLoaded", main);