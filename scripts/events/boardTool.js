

class BoardTools {
  constructor(rows, cols, cellSize, visible) {
    this.rows = rows;
    this.cols = cols;
    this.cellSize = cellSize;
    this.visible = visible;
    this.color = '#fff';
  }

  setToggle(toggleDisplay) {
    toggleDisplay.addEventListener('click', function(event) {
      const controls = document.getElementById('inputs');
      if(this.visible) {
        controls.classList = 'hide';
        event.target.classList = 'rotate';
      } else {
        controls.classList = 'show';
        event.target.classList = 'unrotate';
      }
      this.visible = !this.visible;
    });
  }

  setInputRow(inputRow) {
    inputRow.addEventListener('change', (event) => {
      grid.setRows(event.target.value);
      setBoard(grid);
    });
  }

  render() {
    const toggleDisplay = document.getElementById('down-arrow');
    const inputRow = document.querySelector('input[name="row"]');
    const inputCol = document.querySelector('input[name="col"]');
    const inputCellSize = document.querySelector('input[name="cellSize"]');
    const inputColor = document.querySelector('input[name="color"]');    
    inputRow.value = this.rows;
    inputCol.value = this.cols;
    inputCellSize.value = this.cellSize;
    inputColor.value = this.color;
    this.setToggle(toggleDisplay);
  }
}