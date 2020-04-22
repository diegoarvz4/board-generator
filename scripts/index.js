import Grid from '../scripts/modules/grid.js';
import warningComponent from '../scripts/components/warning.js';
/* Config File */

const initialConfig = {
  visible: true,
  rows: 1,
  cols: 1,
  cellSize: 20,
}

const toolConfig = {
  color: '#fff',
  droppable: false,
  tcolor: '#fff',
  tround: true,
}

/* Handler */

const mouseHandler = {
  click: false,
  over: false,
  up: true,
}

const { rows, cols, cellSize } = initialConfig;
const { color, tcolor } = toolConfig;
const grid = Grid(rows, cols, cellSize);

// mouse click
const clickTool = (event) => {
  if(!mouseHandler.click) {
    const element = event.target;
    element.style.backgroundColor = toolConfig.color;
    mouseHandler.click = !mouseHandler.click;
    mouseHandler.up = false;
  }  
}

// mouse enter
const enterTool = (event) => {
  if(mouseHandler.click && !mouseHandler.up) {
    const element = event.target;
    element.style.backgroundColor = toolConfig.color;
  }
}

// mouse up
const upTool = () => {
  mouseHandler.click = false;
  mouseHandler.over = false;
  mouseHandler.up = true;
}

// dragger
const dragger = (event) => {
  event.preventDefault();
  //upTool();
}


/* UI Components */

const setBoard = (grid) => {
  const board = document.getElementById('board');
  board.innerHTML='';
  for(let i = 0; i < grid.getRows(); i += 1) {
    const row = document.createElement(`tr`);
    row.style.height = `${grid.getCellSize()}px`;
    for(let j = 0; j < grid.getCols(); j += 1) {
      const col = document.createElement('td')
      col.style.width = `${grid.getCellSize()}px`;
      col.style.minWidth = `${grid.getCellSize()}px`;

      col.style.height = `${grid.getCellSize()}px`;
      col.addEventListener('mousedown', clickTool);
      col.addEventListener('mouseover', enterTool);
      col.addEventListener('mouseup', upTool);
      col.addEventListener('dragstart', dragger);
      row.appendChild(col);
    }
    board.appendChild(row);
  }
}

/* App Lifecycle Setup */

setBoard(grid);

/* UI Components */

const toggleDisplay = document.getElementById('down-arrow');
const inputRow = document.querySelector('input[name="row"]');
const inputCol = document.querySelector('input[name="col"]');
const inputCellSize = document.querySelector('input[name="cellSize"]');
const inputColor = document.querySelector('input[name="color"]');
const inputTColor = document.querySelector('input[name="tcolor"]');
const inputTRound = document.querySelector('input[name="tround"]');
/* DOM Setup */

inputRow.value = rows;
inputCol.value = cols;
inputCellSize.value = cellSize;
inputColor.value = color;
inputTColor.value = tcolor;

/* Events Setup */

toggleDisplay.addEventListener('click', function(event) {
  const controls = document.getElementById('inputs');
  console.log(this);
  if(initialConfig.visible) {
    controls.classList = 'hide';
    this.classList = 'rotate';
  } else {
    controls.classList = 'show';
    this.classList = 'unrotate';
  }
  initialConfig.visible = !initialConfig.visible;
});

inputRow.addEventListener('change', (event) => {
  grid.setRows(event.target.value);
  setBoard(grid);
});

inputCol.addEventListener('change', (event) => {
  grid.setCols(event.target.value);
  setBoard(grid);
});

inputCellSize.addEventListener('change', (event) => {
  grid.setCellSize(event.target.value);
  setBoard(grid);
});

inputColor.addEventListener('change', (event) => {
  toolConfig.color = event.target.value;
  document.getElementById('color-preview').style.backgroundColor = toolConfig.color;
});

const btnReady = document.getElementById('btn-board');


btnReady.addEventListener('click', (event) => {
  event.preventDefault();
  const title = '¿Está seguro?';
  const paragraph = 'Su tablero será construido.'
  const okCallback = 'createBoard'
  const warning = warningComponent(title, paragraph, okCallback) 
  const container = document.createElement('div');
  container.classList = 'warning-container';
  container.innerHTML = warning;
  const btn = container.querySelector('button');
  const btnCancel = container.querySelector('.btn-cancel');
  btn.addEventListener('click', () => {
    container.remove();
    document.querySelector('#inputs').remove();
    document.querySelector('h1').innerHTML = 'Play!';
    /* Delete event listeners */
    const board = document.getElementById('board');
    board.querySelectorAll('td').forEach((td) => {
      td.removeEventListener('mousedown', clickTool);
      td.removeEventListener('mouseover', enterTool);
      td.removeEventListener('mouseup', upTool);
      td.removeEventListener('dragstart', dragger); 
      td.droppable = true;
    })
  })
  btnCancel.addEventListener('click', () => {
    container.remove();
  })
  document.body.append(container);
})

/* TOKENS */

const tokenColorInput = document.querySelector('input[name="tcolor"]');
tokenColorInput.addEventListener('change', () => {
  toolConfig.tcolor = event.target.value;
  document.getElementById('tcolor-preview').style.backgroundColor = toolConfig.tcolor;
})

inputTRound.checked = toolConfig.tround;

inputTRound.addEventListener('change', (e) => {
  console.log(e.target.checked);
  toolConfig.tround = !toolConfig.tround;
})

const btnToken = document.getElementById('addTokenBtn');
btnToken.addEventListener('click', () => {
  const token = document.createElement('span');
  token.style.display = `inline-block`;
  token.style.width = `${initialConfig.cellSize}px`;
  token.style.height = `${initialConfig.cellSize}px`;
  token.style.border = '1px solid black';
  if(toolConfig.tround) {
    token.style.borderRadius = `50%`;
  }
  token.style.backgroundColor = `${toolConfig.tcolor}`;
  token.draggable = true;
  const tokensContainer = document.querySelector('.tokens-container');
  tokensContainer.append(token);
})