document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('grid')
    const scoreDisplay = document.getElementById('score')
    const highScoreDisplay = document.getElementById('high-score')
    const width = 4
    let squares = []
    let score = 0
    if (localStorage.getItem("high-score") === null) {
        localStorage.setItem("high-score", 0)
    }
    let highScore = localStorage.getItem("high-score")
    highScoreDisplay.innerHTML = highScore

    function createBoard() {
        for (let i = 0; i < width * width; i++) {
            let square = document.createElement('div')
            square.innerHTML = "0"
            grid.appendChild(square)
            squares.push(square)
        }
        generate()
        generate()
    }

    function checkForLose() {
        let lose = true
        for (let i = 0; i < squares.length; i++) {
            if (squares[i].innerHTML === "0") {
                lose = false
            }
        }
        if (lose) {
            alert("You lose!")
            if (score > highScore) {
                localStorage.setItem("high-score", score)
                highScoreDisplay.innerHTML = score
            }
            location.reload()
        }
    }


    function checkForWin() {
        for (let i = 0; i < squares.length; i++) {
            if (squares[i].innerHTML === "2048") {
                alert("You win!")
                if (score > highScore) {
                    localStorage.setItem("high-score", score)
                    highScoreDisplay.innerHTML = score
                }
                location.reload()
            }
        }
    }

    function generate() {
        let randomNumber = Math.floor(Math.random() * squares.length)
        for (let i = 0; i < 1; i++) {
            while (squares[randomNumber].innerHTML !== "0") {
                randomNumber = Math.floor(Math.random() * squares.length)
                // console.log(randomNumber)
            }
            squares[randomNumber].innerHTML = Math.random() < 0.1 ? "4" : "2"
            checkForLose()
        }
    }

    const colorPalette = {
        0: "#5d666c",
        2: "#FFDDA1",
        4: "#FFB7B2",
        8: "#FF9AA2",
        16: "#7AA5D2",
        32: "#4F81B9",
        64: "#FFD166",
        128: "#F4A261",
        256: "#2A9D8F",
        512: "#E9C46A",
        1024: "#7209B7",
        2048: "#F72585"
    };


    function colorTile() {
        for (let i = 0; i < squares.length; i++) {


            for (let i = 0; i < squares.length; i++) {
                const value = squares[i].innerHTML;
                squares[i].style.backgroundColor = colorPalette[value] || "#5d666c";
                squares[i].style.color = value === "0" ? "#5d666c" : "white";
            }
        }
    }

    function moveRight() {
        for (let i = 0; i < 16; i++) {
            if (i % 4 === 0) {
                let totalOne = squares[i].innerHTML
                let totalTwo = squares[i + 1].innerHTML
                let totalThree = squares[i + 2].innerHTML
                let totalFour = squares[i + 3].innerHTML
                let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

                let filteredRow = row.filter(num => num)
                let missing = 4 - filteredRow.length
                let zeros = Array(missing).fill("0")
                let newRow = zeros.concat(filteredRow)

                squares[i].innerHTML = newRow[0]
                squares[i + 1].innerHTML = newRow[1]
                squares[i + 2].innerHTML = newRow[2]
                squares[i + 3].innerHTML = newRow[3]
            }
        }

    }

    function moveLeft() {
        for (let i = 0; i < 16; i++) {
            if (i % 4 === 0) {
                let totalOne = squares[i].innerHTML
                let totalTwo = squares[i + 1].innerHTML
                let totalThree = squares[i + 2].innerHTML
                let totalFour = squares[i + 3].innerHTML
                let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

                let filteredRow = row.filter(num => num)
                let missing = 4 - filteredRow.length
                let zeros = Array(missing).fill("0")
                let newRow = filteredRow.concat(zeros)

                squares[i].innerHTML = newRow[0]
                squares[i + 1].innerHTML = newRow[1]
                squares[i + 2].innerHTML = newRow[2]
                squares[i + 3].innerHTML = newRow[3]
            }
        }

    }

    function moveUp() {
        for (let i = 0; i < 4; i++) {
            let totalOne = squares[i].innerHTML
            let totalTwo = squares[i + width].innerHTML
            let totalThree = squares[i + (width * 2)].innerHTML
            let totalFour = squares[i + (width * 3)].innerHTML
            let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

            let filteredColumn = column.filter(num => num)
            let missing = 4 - filteredColumn.length
            let zeros = Array(missing).fill("0")
            let newColumn = filteredColumn.concat(zeros)

            squares[i].innerHTML = newColumn[0]
            squares[i + width].innerHTML = newColumn[1]
            squares[i + (width * 2)].innerHTML = newColumn[2]
            squares[i + (width * 3)].innerHTML = newColumn[3]
        }
    }

    function moveDown() {
        for (let i = 0; i < 4; i++) {
            let totalOne = squares[i].innerHTML
            let totalTwo = squares[i + width].innerHTML
            let totalThree = squares[i + (width * 2)].innerHTML
            let totalFour = squares[i + (width * 3)].innerHTML
            let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

            let filteredColumn = column.filter(num => num)
            let missing = 4 - filteredColumn.length
            let zeros = Array(missing).fill("0")
            let newColumn = zeros.concat(filteredColumn)

            squares[i].innerHTML = newColumn[0]
            squares[i + width].innerHTML = newColumn[1]
            squares[i + (width * 2)].innerHTML = newColumn[2]
            squares[i + (width * 3)].innerHTML = newColumn[3]
        }
    }

    function combineRow(direction) {
        for (let i = 0; i < 15; i++) {
            if (squares[i].innerHTML === squares[i + 1].innerHTML && squares[i].innerHTML !== "0") {
                let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i + 1].innerHTML);
                squares[i].innerHTML = combinedTotal;
                squares[i + 1].innerHTML = "0";
                // console.log(direction)
                // if (direction === "Right") {
                //     squares[i + 1].classList.remove('combined-pop');
                //     squares[i + 1].classList.add('combined-pop');
                // } else if (direction === "Left") {
                //     squares[i].classList.remove('combined-pop');
                //     squares[i].classList.add('combined-pop');
                // }
                score += combinedTotal;
                scoreDisplay.innerHTML = score;
            }
        }
        checkForWin();
    }

    function combineColumn(direction, time) {
        for (let i = 0; i < 12; i++) {
            if (squares[i].innerHTML === squares[i + width].innerHTML && squares[i].innerHTML !== "0") {
                let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i + width].innerHTML);
                squares[i].innerHTML = combinedTotal;
                squares[i + width].innerHTML = "0";
                // if (direction === "Up") {
                //     squares[i].classList.add('combined-pop');
                //     squares[i + width].classList.remove('combined-pop');
                // } else if (direction === "Down") {
                //     squares[i + width].classList.add('combined-pop');
                //     squares[i].classList.remove('combined-pop');
                // }
                score += combinedTotal;
                scoreDisplay.innerHTML = score;
            }
        }
        checkForWin();
    }


    function keyRight() {
        moveRight()
        combineRow("Right")
        moveRight()
        generate()
        colorTile()
    }

    function keyLeft() {
        moveLeft()
        combineRow("Left")
        moveLeft()
        generate()
        colorTile()
    }

    function keyUp() {
        moveUp()
        combineColumn("Up")
        moveUp()
        generate()
        colorTile()
    }

    function keyDown() {
        moveDown()
        combineColumn("Down")
        moveDown()
        generate()
        colorTile()
    }

    function control(e) {
        if (e.keyCode === 39) {
            keyRight()
        } else if (e.keyCode === 37) {
            keyLeft()
        } else if (e.keyCode === 38) {
            keyUp()
        } else if (e.keyCode === 40) {
            keyDown()
        }
    }

    document.addEventListener('keyup', control)
    createBoard()
    colorTile()
});