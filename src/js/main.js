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
let $gameMap;
let $gameEnd;
let $startBtn;
let $resultText;



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
    $startBtn = document.body.querySelector(".game__menu__about__start");
    $gameEnd = document.body.querySelector(".game__end");
    $gameMap = document.body.querySelector(".game__map");
    $resultText = document.body.querySelector(".game__end__result");
}

const prepareDOMEvents = () => {
    $weaponX.addEventListener("click", weaponChanger);
    $weaponO.addEventListener("click", weaponChanger);
    $startBtn.addEventListener("click", startGame);

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
        e.target.parentElement.classList.remove("row__active");

        checkWin();

    } else if (e.target.classList.contains("game__map__column__row")) {
        e.target.firstElementChild.innerHTML = $weapon;
        e.target.firstElementChild.style.opacity = "1";
        e.target.firstElementChild.transition = "opacity .6s";
        e.target.classList.remove("game__map__column__row");
        e.target.classList.add("game__map__column__rows__used")
        e.target.classList.remove("row__active");
        checkWin();
    }

}

const checkWin = () => {

    compMove();

    if ($fieldsVal[0].textContent == $weapon && $fieldsVal[1].textContent == $weapon && $fieldsVal[2].textContent == $weapon ||
        $fieldsVal[3].textContent == $weapon && $fieldsVal[4].textContent == $weapon && $fieldsVal[5].textContent == $weapon ||
        $fieldsVal[6].textContent == $weapon && $fieldsVal[7].textContent == $weapon && $fieldsVal[8].textContent == $weapon ||
        $fieldsVal[0].textContent == $weapon && $fieldsVal[3].textContent == $weapon && $fieldsVal[6].textContent == $weapon ||
        $fieldsVal[1].textContent == $weapon && $fieldsVal[4].textContent == $weapon && $fieldsVal[7].textContent == $weapon ||
        $fieldsVal[2].textContent == $weapon && $fieldsVal[5].textContent == $weapon && $fieldsVal[8].textContent == $weapon ||
        $fieldsVal[0].textContent == $weapon && $fieldsVal[4].textContent == $weapon && $fieldsVal[8].textContent == $weapon ||
        $fieldsVal[2].textContent == $weapon && $fieldsVal[4].textContent == $weapon && $fieldsVal[6].textContent == $weapon) {

        endGame();
        $resultText.textContent = "Wygrałeś";

    } else if ($fieldsVal[0].textContent == $weaponComp && $fieldsVal[1].textContent == $weaponComp && $fieldsVal[2].textContent == $weaponComp ||
        $fieldsVal[3].textContent == $weaponComp && $fieldsVal[4].textContent == $weaponComp && $fieldsVal[5].textContent == $weaponComp ||
        $fieldsVal[6].textContent == $weaponComp && $fieldsVal[7].textContent == $weaponComp && $fieldsVal[8].textContent == $weaponComp ||
        $fieldsVal[0].textContent == $weaponComp && $fieldsVal[3].textContent == $weaponComp && $fieldsVal[6].textContent == $weaponComp ||
        $fieldsVal[1].textContent == $weaponComp && $fieldsVal[4].textContent == $weaponComp && $fieldsVal[7].textContent == $weaponComp ||
        $fieldsVal[2].textContent == $weaponComp && $fieldsVal[5].textContent == $weaponComp && $fieldsVal[8].textContent == $weaponComp ||
        $fieldsVal[0].textContent == $weaponComp && $fieldsVal[4].textContent == $weaponComp && $fieldsVal[8].textContent == $weaponComp ||
        $fieldsVal[2].textContent == $weaponComp && $fieldsVal[4].textContent == $weaponComp && $fieldsVal[6].textContent == $weaponComp) {

        $resultText.textContent = "Przegrałeś";
        endGame();

    } else if ($fieldsVal[0].textContent !== "0" && $fieldsVal[1].textContent !== "1" && $fieldsVal[2].textContent !== "2" &&
        $fieldsVal[3].textContent !== "3" && $fieldsVal[4].textContent !== "4" && $fieldsVal[5].textContent !== "5" &&
        $fieldsVal[6].textContent !== "6" && $fieldsVal[7].textContent !== "7" && $fieldsVal[8].textContent !== "8") {

        $resultText.textContent = "Remis";
        endGame();
    }

}

const endGame = () => {
    $fields.forEach(item => {
        item.removeEventListener("click", fillField);
        item.classList.remove("row__active");
    });
    setTimeout(() => {

        $gameMap.style.display = "none";
        $gameEnd.style.display = "flex";
        $gameEnd.style.opacity = "1";
        $weaponO.disabled = false;
        $weaponX.disabled = false;
        $startBtn.disabled = false;
        $startBtn.classList.remove("game__menu__about__start--disabled")
        $startBtn.classList.add("game__menu__about__start")

    }, 800);

}

const weaponCompCheck = () => {
    if ($weapon == "O") {
        $weaponComp = "X";
    } else if ($weapon == "X") {
        $weaponComp = "O";
    }
}

function randomCompMove(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

const compListenerRemove = (fieldsIndex) => {
    $fieldsVal[fieldsIndex].classList.remove("game__map__column__row__field");
    $fieldsVal[fieldsIndex].classList.add("game__map__column__rows__used__fields__used");
    $fieldsVal[fieldsIndex].parentElement.classList.remove("game__map__column__row")
    $fieldsVal[fieldsIndex].parentElement.classList.remove("row__active")
    $fieldsVal[fieldsIndex].parentElement.classList.add("game__map__column__rows__used")
    $fieldsVal[fieldsIndex].style.opacity = 1;
}

const compRowsAndSlantComp = () => {

    // check if comp does have opportunity to win
    // 0 1 2
    if ($fieldsVal[0].textContent == $weaponComp && $fieldsVal[2].textContent == $weaponComp && $fieldsVal[1].innerHTML !== $weaponComp && $fieldsVal[1].innerHTML !== $weapon) {
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



    // check if user does have opportunity to win

    // 0 1 2
    else if ($fieldsVal[0].textContent == $weapon && $fieldsVal[2].textContent == $weapon && $fieldsVal[1].innerHTML !== $weaponComp && $fieldsVal[1].innerHTML !== $weapon) {
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
    } else {

        let randomMove = randomCompMove(0, 8);


        for (let i = randomMove; i < $fieldsVal.length; i++) {
            if ($fieldsVal[i].textContent !== $weapon && $fieldsVal[i].textContent !== $weaponComp) {
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

const startGame = () => {

    for (let i = 0; i < $fieldsVal.length; i++) {

        $fieldsVal[i].style.transition = "none";
        $fieldsVal[i].style.opacity = "0";
        $fieldsVal[i].innerHTML = i;
        $fieldsVal[i].classList.remove("game__map__column__rows__used__fields__used");
        $fieldsVal[i].classList.add("game__map__column__row__field");
        $fieldsVal[i].parentElement.classList.remove("game__map__column__rows__used");
        $fieldsVal[i].parentElement.classList.add("game__map__column__row");

    }

    $gameEnd.style.display = "none";
    $gameMap.style.display = "block";
    $gameEnd.style.opacity = "0";

    $gameMap.classList.add("map__active");
    $weaponO.disabled = true;
    $weaponX.disabled = true;
    $startBtn.disabled = true;
    $startBtn.classList.remove("game__menu__about__start")
    $startBtn.classList.add("game__menu__about__start--disabled")

    $fields.forEach(item => {
        item.addEventListener("click", fillField);
        item.classList.add("row__active");
    });


}


const main = () => {
    prepareDOMElements();
    prepareDOMEvents();

}

addEventListener("DOMContentLoaded", main);