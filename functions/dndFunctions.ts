const RollDice = (num) => {
    let init = Math.floor(Math.random() * (num - 1 + 1)) + 1;
    if (init == 1 && num == 20) {
        return `Critical Failure! Rolled: ${init}`;
    }
    else if (init == 20) {
        return `Rolled a Natural ${init}!`
    }
    return `Rolled: ${init}`;
}

const RollInitiative = () => {
    let init = Math.floor(Math.random() * (20 - 1 + 1)) + 1;
    if (init == 1) {
        return `Critical Failure! Rolled: ${init}`;
    }
    else if (init == 20) {
        return `Rolled a Natural ${init}!`
    }
    return `Rolled: ${init}`;
};

const DiceRoller = (diceType) => {
    switch (diceType) {
        case "d100":
            return RollDice(100);
        case "d20":
            return RollDice(20);
        case "d12":
            return RollDice(12);
        case "d10":
            return RollDice(10);
        case "d8":
            return RollDice(8);
        case "d6":
            return RollDice(6);
        case "d4":
            return RollDice(4);
        case "initiative":
            return RollInitiative();
        default:
            return "*Bad Dice Input*. Try again with a d20 or somth'n kiddo."
    }
};

exports.RollInitiative = RollInitiative;
exports.DiceRoller = DiceRoller;