const startP = document.getElementById('startP')
const turnPlayerP = document.getElementById('turnPlayerP')
const player1Input = document.getElementById('player1Input')
const player2Input = document.getElementById('player2Input')
const startBtn = document.getElementById('startBtn')
const turnPlayerSpan = document.getElementById('turnPlayerSpan')
const gameBoard = document.getElementById('gameBoard')
const boardRegions = document.querySelectorAll('#gameBoard span')
let vBoard = []
let playerTurn = player1Input
let playerSymbol = 'X'

function startGame() {
    playerSymbol = 'X'
    startP.style.display = 'none'
    turnPlayerP.style.display = 'block'
    startBtn.innerText = 'Recomeçar'
    turnPlayerP.innerHTML = `Vez do jogador <span id="turnPlayerSpan">${playerTurn.value}</span>`
    gameBoard.style.color = '#f3f725'
    gameBoard.style.backgroundColor = '#f3f725'
    vBoard = [['', '', ''], ['', '', ''], ['', '', '']]
    boardRegions.forEach(function (element) {
        element.style.cursor = 'pointer'
        element.classList.remove('win')
        element.innerText = ''
        element.addEventListener('click', handleBoardClick)
    })
}

function disableRegion(element) {
    element.style.cursor = 'default'
    element.removeEventListener('click', handleBoardClick)
}

function disableGameBoard() {
    boardRegions.forEach(function (element) {
        element.removeEventListener('click', handleBoardClick)
        element.style.cursor = 'default'
    })
}

function handleWin(regions) {
    disableGameBoard()
    regions.forEach(function (region) {
        gameBoard.style.color = '#042940'
        gameBoard.style.backgroundColor = '#042940'
        document.querySelector('[data-region="' + region + '"]').classList.add('win')
        turnPlayerP.innerHTML = `<span id="turnPlayerSpan">${playerTurn.value} venceu!</span>`
    })
}

function getWinRegions() {
    const winRegions = []
    if (vBoard[0][0] && vBoard[0][0] === vBoard[0][1] && vBoard[0][0] === vBoard[0][2])
      winRegions.push("0.0", "0.1", "0.2")
    if (vBoard[1][0] && vBoard[1][0] === vBoard[1][1] && vBoard[1][0] === vBoard[1][2])
      winRegions.push("1.0", "1.1", "1.2")
    if (vBoard[2][0] && vBoard[2][0] === vBoard[2][1] && vBoard[2][0] === vBoard[2][2])
      winRegions.push("2.0", "2.1", "2.2")
    if (vBoard[0][0] && vBoard[0][0] === vBoard[1][0] && vBoard[0][0] === vBoard[2][0])
      winRegions.push("0.0", "1.0", "2.0")
    if (vBoard[0][1] && vBoard[0][1] === vBoard[1][1] && vBoard[0][1] === vBoard[2][1])
      winRegions.push("0.1", "1.1", "2.1")
    if (vBoard[0][2] && vBoard[0][2] === vBoard[1][2] && vBoard[0][2] === vBoard[2][2])
      winRegions.push("0.2", "1.2", "2.2")
    if (vBoard[0][0] && vBoard[0][0] === vBoard[1][1] && vBoard[0][0] === vBoard[2][2])
      winRegions.push("0.0", "1.1", "2.2")
    if (vBoard[0][2] && vBoard[0][2] === vBoard[1][1] && vBoard[0][2] === vBoard[2][0])
      winRegions.push("0.2", "1.1", "2.0")
    return winRegions
  }

function handleBoardClick(ev) {
    const span = ev.currentTarget
    const region = span.dataset.region
    const rowColumnPair = region.split('.')
    const row = rowColumnPair[0]
    const column = rowColumnPair[1]
    span.innerText = playerSymbol
    vBoard[row][column] = playerSymbol
    disableRegion(span)
    const winRegions = getWinRegions()
    if (winRegions.length > 0) {
        handleWin(winRegions)
    } else if (vBoard.flat().includes('')) {
        if (playerSymbol == 'X') {
            playerSymbol = 'O'
            playerTurn = player2Input
        } else {
            playerSymbol = 'X'
            playerTurn = player1Input
        }
        turnPlayerP.innerHTML = `Vez do jogador <span id="turnPlayerSpan">${playerTurn.value}</span>`
    } else {
        turnPlayerP.innerHTML = `<span id="turnPlayerSpan">Deu empate!</span>`
    }
    console.clear()
    console.table(vBoard)
}

startBtn.addEventListener('click', startGame)


//turnTimeP.style.display = 'none'