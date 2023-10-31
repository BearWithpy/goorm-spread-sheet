export class Cell {
    constructor(
        isHeader,
        disabled,
        data,
        row,
        column,
        rowName,
        columnName,
        active = false
    ) {
        this.isHeader = isHeader
        this.disabled = disabled
        this.data = data
        this.row = row
        this.column = column
        this.active = active
        this.rowName = rowName
        this.columnName = columnName
    }
}
