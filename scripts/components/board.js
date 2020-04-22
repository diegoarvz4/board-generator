class Board {
  constructor(rows, cols, cellSize){
    this.rows =  rows;
    this.cols = cols;
    this.cellSize = cellSize;
  }

  setCellEventListeners(cell) {
    cell.addEventListener('mousedown', clickTool);
    cell.addEventListener('mouseover', enterTool);
    cell.addEventListener('mouseup', upTool);
    cell.addEventListener('dragstart', dragger);
  }

  render() {
    const board = document.getElementById('board');
    board.innerHTML='';
    for(let i = 0; i < this.rows ; i += 1) {
      const row = document.createElement(`tr`);
      row.style.height = `${this.cellSize}px`;
      for(let j = 0; j < this.cols; j += 1) {
        const col = document.createElement('td')
        col.style.width = `${this.cellSize}px`;
        col.style.minWidth = `${this.cellSize}px`;
        col.style.height = `${this.cellSize}px`;
        this.setCellEventListeners(cell);
        row.appendChild(col);
      }
      board.appendChild(row);
    }
  }
}

export default Board;