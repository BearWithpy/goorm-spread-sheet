import { Cell } from "./Cell.js"

const spreadSheetContainer = document.querySelector("#spreadsheet-container")
const ROWS = 10
const COLS = 10

const spreadSheet = []
const uppercaseAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")

initSpreadSheet()
function initSpreadSheet() {
    for (let i = 0; i < ROWS; i++) {
        let spreadSheetRow = []
        for (let j = 0; j < COLS; j++) {
            let cellData = ""

            if (j === 0) {
                cellData = i
            }

            if (i === 0) {
                cellData = uppercaseAlphabet[j - 1]
            }
            if (!cellData) {
                cellData = ""
            }

            const cell = new Cell(false, false, cellData, i, j, false)
            spreadSheetRow.push(cell)
        }
        spreadSheet.push(spreadSheetRow)
    }
    // console.log(spreadSheet)
    displaySheet()
}

function createCellElement(cell) {
    const cellElement = document.createElement("input")
    cellElement.className = "cell"
    cellElement.id = "cell_" + cell.row + cell.column
    cellElement.value = cell.data
    cellElement.disabled = cell.disabled
    return cellElement
}

function displaySheet() {
    for (let i = 0; i < spreadSheet.length; i++) {
        const rowContainerElement = document.createElement("div")
        rowContainerElement.classList.add("cell-row")
        for (let j = 0; j < spreadSheet[i].length; j++) {
            const cell = spreadSheet[i][j]
            rowContainerElement.append(createCellElement(cell))
        }
        spreadSheetContainer.append(rowContainerElement)
    }
}
