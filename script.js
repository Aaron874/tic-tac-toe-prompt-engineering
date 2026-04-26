let fields = [
    null,
    "circle",
    null,
    null,
    null,
    "cross",
    "circle",
    null,
    "cross"
];

function init() {
        renderTable();
}

function renderTable() {
    let content = document.getElementById("content");

    let html = "<table border='1'>";

    for (let i = 0; i < 3; i++) {
        html += "<tr>";

        for (let j = 0; j < 3; j++) {
            let index = i * 3 + j;
            let value = fields[index];

            if (value === "circle") {
                value = getCircleSVG(); 
            } else if (value === "cross") {
                value = getCrossSVG();
            } else {
                value = "";
            }

            html += `<td>${value}</td>`;
        }

        html += "</tr>";
    }

    html += "</table>";

    content.innerHTML = html;
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