import { Cell } from "./Cell.js"

const exportBtn = document.querySelector("#export-btn")
const spreadSheetContainer = document.querySelector("#spreadsheet-container")
const ROWS = 10
const COLS = 10

const spreadSheet = []
const uppercaseAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")

initSpreadSheet()

exportBtn.onclick = (e) => {
    let csv = ""
    for (let i = 0; i < spreadSheet.length; i++) {
        csv +=
            spreadSheet[i]
                .filter((item) => !item.isHeader)
                .map((item) => item.data)
                .join(",") + "\r\n"
    }
    downloadCsv(csv)
}

function downloadCsv(csv) {
    const csvObj = new Blob([csv])
    const csvUrl = URL.createObjectURL(csvObj)

    const aTag = document.createElement("a")
    aTag.href = csvUrl
    aTag.download = "temp.csv"
    aTag.click()
}

function initSpreadSheet() {
    for (let i = 0; i < ROWS; i++) {
        let spreadSheetRow = []
        for (let j = 0; j < COLS; j++) {
            let cellData = ""
            let isHeader = false
            let disabled = false

            if (j === 0) {
                cellData = i
                isHeader = true
                disabled = true
            }

            if (i === 0) {
                cellData = uppercaseAlphabet[j - 1]
                isHeader = true
                disabled = true
            }

            if (!cellData) {
                cellData = ""
            }
            const rowName = i
            const colName = uppercaseAlphabet[j - 1]

            const cell = new Cell(
                isHeader,
                disabled,
                cellData,
                i,
                j,
                rowName,
                colName,
                false
            )
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

    if (cell.isHeader) {
        cellElement.classList.add("header")
    }

    cellElement.onclick = () => handleCellClick(cell)
    cellElement.onchange = (e) => handleOnChange(e.target.value, cell)

    return cellElement
}

function clearHeaderState() {
    const headers = document.querySelectorAll(".header")
    headers.forEach((element) => {
        element.classList.remove("active")
    })
}

function handleOnChange(data, cell) {
    cell.data = data
}

function getElemFromRowCol(row, col) {
    return document.querySelector(`#cell_${row}${col}`)
}

function handleCellClick(cell) {
    clearHeaderState()
    const columnHeader = spreadSheet[0][cell.column]
    const rowHeader = spreadSheet[cell.row][0]

    const columnHeaderElement = getElemFromRowCol(
        columnHeader.row,
        columnHeader.column
    )
    const rowHeaderElement = getElemFromRowCol(rowHeader.row, rowHeader.column)

    columnHeaderElement.classList.add("active")
    rowHeaderElement.classList.add("active")

    document.querySelector(
        "#cell-status"
    ).innerHTML = `${cell.columnName}${cell.rowName}`
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
