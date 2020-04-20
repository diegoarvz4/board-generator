export default (_rows, _cols, _cellSize) => {
  let rows = _rows;
  let cols = _cols;
  let cellSize = _cellSize;

  const setRows = (_rows) => {
    rows = _rows;
  }

  const setCols = (_cols) => {
    cols = _cols;
  }

  const setCellSize = (_cellSize) => {
    cellSize = _cellSize;
  }

  const getRows = () => {
    return rows;
  }
  const getCols = () => {
    return cols;
  }

  const getCellSize = () => {
    return cellSize;
  }
  return {
    getRows,
    setRows,
    getCols,
    setCols,
    getCellSize,
    setCellSize
  }
}