let fields = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null
];

function init() {
        renderTable();
}

function renderTable(winLine) {
    let content = document.getElementById("content");
    let html = '<div style="position:relative;display:inline-block;width:240px;height:240px;">';
    html += "<table class='tic-tac-toe-table' border='0' style='border-collapse:collapse;width:240px;height:240px;'>";
    for (let i = 0; i < 3; i++) {
        html += "<tr>";
        for (let j = 0; j < 3; j++) {
            let index = i * 3 + j;
            let value = fields[index];
            let cellContent = "";
            let onclick = "";
            if (value === "circle") {
                cellContent = getCircleSVG();
            } else if (value === "cross") {
                cellContent = getCrossSVG();
            } else {
                cellContent = "";
                onclick = `onclick=\"cellClicked(${index}, this)\"`;
            }
            html += `<td ${onclick} style='width:80px;height:80px;text-align:center;vertical-align:middle;position:relative;'>${cellContent}</td>`;
        }
        html += "</tr>";
    }
    html += "</table>";
    // SVG Linie für Gewinn
    if (winLine) {
        html += getWinLineSVG(winLine);
    }
    html += '</div>';
    content.innerHTML = html;
}

function restartGame() {
    for (let i = 0; i < fields.length; i++) fields[i] = null;
    currentPlayer = 'circle';
    renderTable();
}

let currentPlayer = 'circle';

function cellClicked(index, td) {
    if (!fields[index]) {
        fields[index] = currentPlayer;
        if (currentPlayer === 'circle') {
            td.innerHTML = getCircleSVG();
        } else {
            td.innerHTML = getCrossSVG();
        }
        td.removeAttribute('onclick');
        const winLine = checkWin();
        if (winLine) {
            // Nach kurzem Timeout, damit SVG sichtbar wird
            setTimeout(() => renderTable(winLine), 200);
        } else {
            currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle';
        }
    }
}

function checkWin() {
    const winPatterns = [
        [0,1,2], [3,4,5], [6,7,8], // rows
        [0,3,6], [1,4,7], [2,5,8], // cols
        [0,4,8], [2,4,6]           // diagonals
    ];
    for (let pattern of winPatterns) {
        const [a,b,c] = pattern;
        if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
            return pattern;
        }
    }
    return null;
}

function getWinLineSVG(pattern) {
    // SVG Overlay für die Gewinnlinie
    // Koordinaten für die Mitte der Zellen (exakt mittig)
    const cellSize = 80;
    const offset = cellSize / 2;
    const coords = [
        [offset, offset], [cellSize + offset, offset], [2 * cellSize + offset, offset],
        [offset, cellSize + offset], [cellSize + offset, cellSize + offset], [2 * cellSize + offset, cellSize + offset],
        [offset, 2 * cellSize + offset], [cellSize + offset, 2 * cellSize + offset], [2 * cellSize + offset, 2 * cellSize + offset]
    ];
    const [a, b, c] = pattern;
    const [x1, y1] = coords[a];
    const [x2, y2] = coords[c];
    return `<svg width='240' height='240' style='position:absolute;top:0;left:0;pointer-events:none;z-index:10;'>
        <line x1='${x1}' y1='${y1}' x2='${x2}' y2='${y2}' stroke='white' stroke-width='10' stroke-linecap='round' />
    </svg>`;
}

function getCircleSVG() {
    return `
        <svg width="70" height="70" viewBox="0 0 70 70">
            <circle
                cx="35"
                cy="35"
                r="28"
                fill="none"
                stroke="#00B0EF"
                stroke-width="8"
                stroke-dasharray="175.93"
                stroke-dashoffset="175.93"
            >
                <animate
                    attributeName="stroke-dashoffset"
                    from="175.93"
                    to="0"
                    dur=".3s"
                    fill="freeze"
                />
            </circle>
        </svg>
    `;
}

function getCrossSVG() {
    return `
        <svg width="70" height="70" viewBox="0 0 70 70">
            <!-- Linie 1 -->
            <line x1="15" y1="15" x2="55" y2="55"
                stroke="#FFC000"
                stroke-width="8"
                stroke-linecap="round"
                stroke-dasharray="56.57"
                stroke-dashoffset="56.57">
                <animate
                    attributeName="stroke-dashoffset"
                    from="56.57"
                    to="0"
                    dur="0.15s"
                    fill="freeze" />
            </line>

            <!-- Linie 2 -->
            <line x1="55" y1="15" x2="15" y2="55"
                stroke="#FFC000"
                stroke-width="8"
                stroke-linecap="round"
                stroke-dasharray="56.57"
                stroke-dashoffset="56.57">
                <animate
                    attributeName="stroke-dashoffset"
                    from="56.57"
                    to="0"
                    dur="0.15s"
                    begin="0.2s"
                    fill="freeze" />
            </line>
        </svg>
    `;
}