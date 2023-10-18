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
let scoreStatus = 'hide'
let player1Victories = 0
let player2Victories = 0
let ties = 0

function startGame() {
    playerSymbol = 'X'
    startP.style.display = 'none'
    turnPlayerP.style.display = 'block'
    startBtn.innerText = 'Recomeçar'
    turnPlayerP.innerHTML = `Vez do jogador <span id="turnPlayerSpan">${playerTurn.value}</span>`
    player1TableName.innerText = player1Input.value
    player2TableName.innerText = player2Input.value
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

function scoreUpdate() {
  player1VictoriesTable.innerText = player1Victories
  player2VictoriesTable.innerText = player2Victories
  tiesTable.innerText = ties
}

function handleWin(regions) {
    disableGameBoard()
    regions.forEach(function (region) {
        gameBoard.style.color = '#aba9c2'
        gameBoard.style.backgroundColor = '#aba9c2'
        document.querySelector('[data-region="' + region + '"]').classList.add('win')
        turnPlayerP.innerHTML = `<span id="turnPlayerSpan">${playerTurn.value} venceu! O placar foi atualizado.</span>`
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
      if (playerSymbol == 'X') {
        player1Victories = player1Victories + 1
      }
      else {
        player2Victories = player2Victories + 1
      }
      scoreUpdate()
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
        turnPlayerP.innerHTML = `<span id="turnPlayerSpan">Deu empate! O placar foi atualizado.</span>`
        ties = ties + 1
        scoreUpdate()
    }
    console.clear()
    console.table(vBoard)
}

startBtn.addEventListener('click', startGame)

function showHideScoreFunction() {
  if (scoreStatus === 'hide') {
    scoreStatus = 'show'
    hideScoreArrow.style.display = 'block'
    showScoreArrow.style.display = 'none'
    scoreTable.style.display = 'block'
    scoreTableDiv.style.width = '100%'
    scoreTableDiv.style.marginTop = '0px'
    scoreTableDiv.style.paddingBottom = '15px'
    showHideScoreLink.innerText = 'Esconder placar'
  }
  else if (scoreStatus === 'show') {
    scoreStatus = 'hide'
    hideScoreArrow.style.display = 'none'
    showScoreArrow.style.display = 'block'
    scoreTable.style.display = 'none'
    scoreTableDiv.style.width = '140px'
    scoreTableDiv.style.marginTop = '-37px'
    showHideScoreLink.innerText = 'Mostrar placar'
  }
}