
cellSize = 50;
canvasWidth = window.innerWidth;
canvasHeight = window.innerHeight;
time = 500; //delay

function createCanvas() 
{
    var canvas = document.createElement('canvas');
    canvas.setAttribute('id', 'canvas');
    canvas.setAttribute('width', canvasWidth);
    canvas.setAttribute('height', canvasWidth);
    document.body.appendChild(canvas);

    return canvas.getContext('2d');
}

function createRandomCells() 
{

    var cells = [];
    cells.rows = Math.ceil(canvasHeight / cellSize);
    cells.columns = Math.ceil(canvasWidth / cellSize);
    cells.alive = 0;
    cells.dead = 0;

    for (var i = 0; i < cells.rows; i++) 
    {
        cells[i] = [];
        for (var j = 0; j < cells.columns; j++) 
        {
            if (Math.random() > 0.5) //0-1
            {
                cells[i][j] = 1;
                cells.alive ++;
            }
            else
            {
                cells[i][j] = 0;
            }
        }
    }
    cells.size = cells.rows * cells.columns;
    cells.dead = cells.size - cells.alive;
    return cells;
}

function fillDivStats(cells) {
    var container = document.getElementById("divStatsId");
    var content = container.innerHTML;
    container.innerHTML = '<p>alive: ' + cells.alive + '</p>';
    container.innerHTML += '<p>dead: ' + cells.dead + '</p>';
}
function fillCanvas(context, cells) {
    var x, y;
    var alive = 0;
    var dead;

    for (var i = 0; i < cells.rows; i++) {
        for (var j = 0; j < cells.columns; j++) {
            if (cells[i][j] === 1) // T_____T
            {
                context.fillStyle = 'rgba(206,202,179,1)';
            } 
            else 
            {
                context.fillStyle = 'rgba(171,190,174,1)';
            }

            y = i * cellSize;
            x = j * cellSize;
            context.fillRect(x, y, cellSize, cellSize);
        }
    } 
}

function updateCells(cells) 
{
    var previousCells, neighbors;
    var minj, maxj, mini, maxi;

    previousCells = JSON.parse(JSON.stringify(cells)); //костыль для копирования без ссылок

    for (var i = 0; i < cells.rows; i++) 
    {
        for (var j = 0; j < cells.columns; j++) 
        {
            neighbors = 0;

            mini = Math.max(0, i - 1); //границы
            maxi = Math.min(cells.rows, i + 2);
            minj = Math.max(0, j - 1);
            maxj = Math.min(cells.columns, j + 2);

            for (var k = mini; k < maxi; k++) // тупой подсчет соседей
            {
                for (var l = minj; l < maxj; l++) 
                {
                    if (previousCells[k][l] === 1) 
                    {
                        neighbors++;
                    }
                }
            }
            
            if (previousCells[i][j] === 1) //клетка была жмвой
            {
                neighbors--;

                if (neighbors !== 2 && neighbors !== 3) //смерть от одиночества или перенаселения
                {
                    cells[i][j] = 0;
                    cells.alive --;
                }
            } 
            else //клетка была мертвой
            {
                if (neighbors === 3) //рпождение клетки
                {
                    cells[i][j] = 1;
                    cells.alive++;
                }
            }
        }
    }
    cells.dead = cells.size - cells.alive;
    return cells;
}

function draw() //отобразить измененные div + canvas
{
    updateCells(cells);
    fillCanvas(context, cells);
    fillDivStats(cells);
}

window.onload = function () 
{
    context = createCanvas();
    cells = createRandomCells();
    window.setInterval(draw, time); //запуск draw каждые time ms

};
