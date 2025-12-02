let patternsData = null;
let conversionHistory = [];
let stats = {
    totalConversions: 0,
    satisfactoryConversions: 0,
    totalPatterns: 0,
    fileSize: 0,
    lastUpdate: null
};

const defaultPatterns = {
    
  "patterns": [
    {
      "id": 1,
      "natural": "La suma de {var1} y {var2}",
      "algebraic": "{var1} + {var2}",
      "category": "operaciones_basicas"
    },
    {
      "id": 2,
      "natural": "La resta de {var1} y {var2}",
      "algebraic": "{var1} - {var2}",
      "category": "operaciones_basicas"
    },
    {
      "id": 3,
      "natural": "El producto de {var1} y {var2}",
      "algebraic": "{var1} × {var2}",
      "category": "operaciones_basicas"
    },
    {
      "id": 4,
      "natural": "{var1} dividido por {var2}",
      "algebraic": "{var1} ÷ {var2}",
      "category": "operaciones_basicas"
    },
    {
      "id": 5,
      "natural": "La diferencia entre el cuadrado de {var1} y el cuadrado de {var2}",
      "algebraic": "{var1}^2 - {var2}^2",
      "category": "combinadas"
    },
    {
      "id": 6,
      "natural": "La {var1} es igual al producto de la {var2} y la {var3}",
      "algebraic": "{var1} = {var2} × {var3}",
      "category": "física"
    },
    {
      "id": 7,
      "natural": "El área de un cuadrado de lado {var1}",
      "algebraic": "{var1}^2",
      "category": "geometria"
    },
    {
      "id": 8,
      "natural": "La raíz cuadrada de {var1}",
      "algebraic": "√{var1}",
      "category": "operaciones_avanzadas"
    },
    {
      "id": 9,
      "natural": "El triple de {var1} menos el doble de {var2}",
      "algebraic": "3{var1} - 2{var2}",
      "category": "combinadas"
    },
    {
      "id": 10,
      "natural": "La suma de los cubos de {var1} y {var2}",
      "algebraic": "{var1}^3 + {var2}^3",
      "category": "combinadas"
    },
    {
      "id": 11,
      "natural": "La hipotenusa de un triángulo rectángulo con catetos {var1} y {var2}",
      "algebraic": "√({var1}^2 + {var2}^2)",
      "category": "geometria"
    },
    {
      "id": 12,
      "natural": "El promedio de {var1} y {var2}",
      "algebraic": "({var1} + {var2}) ÷ 2",
      "category": "estadistica"
    },
    {
      "id": 13,
      "natural": "El cuádruple de {var1} aumentado en {var2}",
      "algebraic": "4{var1} + {var2}",
      "category": "combinadas"
    },
    {
      "id": 14,
      "natural": "La mitad de {var1} más la tercera parte de {var2}",
      "algebraic": "{var1}÷2 + {var2}÷3",
      "category": "fracciones"
    },
    {
      "id": 15,
      "natural": "El volumen de un cubo de arista {var1}",
      "algebraic": "{var1}^3",
      "category": "geometria"
    },
    {
      "id": 16,
      "natural": "La ecuación de la recta con pendiente {var1} y ordenada al origen {var2}",
      "algebraic": "y = {var1}x + {var2}",
      "category": "algebra"
    },
    {
      "id": 17,
      "natural": "El doble del cuadrado de {var1}",
      "algebraic": "2{var1}^2",
      "category": "combinadas"
    },
    {
      "id": 18,
      "natural": "La suma de {var1} al cuadrado y {var2} al cubo",
      "algebraic": "{var1}^2 + {var2}^3",
      "category": "combinadas"
    },
    {
      "id": 19,
      "natural": "La velocidad como distancia {var1} entre tiempo {var2}",
      "algebraic": "v = {var1} ÷ {var2}",
      "category": "física"
    },
    {
      "id": 20,
      "natural": "El perímetro de un rectángulo de largo {var1} y ancho {var2}",
      "algebraic": "2({var1} + {var2})",
      "category": "geometria"
    },
    {
      "id": 21,
      "natural": "La potencia como trabajo {var1} entre tiempo {var2}",
      "algebraic": "P = {var1} ÷ {var2}",
      "category": "física"
    },
    {
      "id": 22,
      "natural": "El producto de la suma y diferencia de {var1} y {var2}",
      "algebraic": "({var1} + {var2})({var1} - {var2})",
      "category": "algebra"
    },
    {
      "id": 23,
      "natural": "La fuerza como masa {var1} por aceleración {var2}",
      "algebraic": "F = {var1} × {var2}",
      "category": "física"
    },
    {
      "id": 24,
      "natural": "El área de un círculo de radio {var1}",
      "algebraic": "π{var1}^2",
      "category": "geometria"
    },
    {
      "id": 25,
      "natural": "La energía cinética de masa {var1} y velocidad {var2}",
      "algebraic": "Ec = ½{var1}{var2}^2",
      "category": "física"
    },
    {
      "id": 26,
      "natural": "La derivada de {var1} con respecto a x",
      "algebraic": "d{var1}÷dx",
      "category": "calculo"
    }
  ]
};

document.addEventListener('DOMContentLoaded', function() {
    loadPatterns(defaultPatterns);
    
    setupEventListeners();
    
    updateMetrics();
});

function setupEventListeners() {
    document.getElementById('convert-to-algebraic-btn').addEventListener('click', () => {
        convertNaturalToAlgebraic();
    });
    
    document.getElementById('convert-to-natural-btn').addEventListener('click', () => {
        convertAlgebraicToNatural();
    });
    
    document.getElementById('natural-satisfactory-btn').addEventListener('click', () => {
        markAsSatisfactory('natural');
    });
    
    document.getElementById('natural-improve-btn').addEventListener('click', () => {
        markForImprovement('natural');
    });
    
    document.getElementById('natural-add-pattern-btn').addEventListener('click', () => {
        showAddPatternDialog('natural');
    });
    
    document.getElementById('algebraic-satisfactory-btn').addEventListener('click', () => {
        markAsSatisfactory('algebraic');
    });
    
    document.getElementById('algebraic-improve-btn').addEventListener('click', () => {
        markForImprovement('algebraic');
    });
    
    document.getElementById('algebraic-add-pattern-btn').addEventListener('click', () => {
        showAddPatternDialog('algebraic');
    });
    
    document.getElementById('json-file-input').addEventListener('change', handleFileSelection);
    document.getElementById('load-json-btn').addEventListener('click', loadJSONFile);
    document.getElementById('reset-json-btn').addEventListener('click', resetToDefault);
    
    document.getElementById('clear-history-btn').addEventListener('click', clearHistory);
    document.getElementById('export-history-btn').addEventListener('click', exportHistory);
}

function convertNaturalToAlgebraic() {
    const input = document.getElementById('natural-input').value.trim();
    if (!input) {
        alert('Por favor, ingresa una expresión en lenguaje natural');
        return;
    }
    
    const result = processNaturalToAlgebraic(input);
    displayResult('natural', input, result);
    
    stats.totalConversions++;
    addToHistory('natural-to-algebraic', input, result);
    updateMetrics();
}

function convertAlgebraicToNatural() {
    const input = document.getElementById('algebraic-input').value.trim();
    if (!input) {
        alert('Por favor, ingresa una expresión algebraica');
        return;
    }
    
    const result = processAlgebraicToNatural(input);
    displayResult('algebraic', input, result);
    
    stats.totalConversions++;
    addToHistory('algebraic-to-natural', input, result);
    updateMetrics();
}

function processNaturalToAlgebraic(input) {
    if (!patternsData || !patternsData.patterns) {
        return "Error: No hay patrones cargados";
    }
    
    const normalizedInput = input.toLowerCase();
    
    for (let pattern of patternsData.patterns) {
        const match = matchNaturalPattern(normalizedInput, pattern.natural);
        if (match.isMatch) {
            return substituteVariables(pattern.algebraic, match.variables);
        }
    }
    
    return "No se encontró un patrón coincidente. Considera agregar este caso a los patrones.";
}

function processAlgebraicToNatural(input) {
    if (!patternsData || !patternsData.patterns) {
        return "Error: No hay patrones cargados";
    }
    
    const normalizedInput = normalizeAlgebraicExpression(input);
    
    for (let pattern of patternsData.patterns) {
        const match = matchAlgebraicPattern(normalizedInput, pattern.algebraic);
        if (match.isMatch) {
            return substituteVariables(pattern.natural, match.variables);
        }
    }
    
    return "No se encontró un patrón coincidente. Considera agregar este caso a los patrones.";
}

function matchNaturalPattern(input, pattern) {
    let regex = pattern.toLowerCase();
    const variables = {};
    let varCounter = 0;
    
    regex = regex.replace(/\{(\w+)\}/g, (match, varName) => {
        variables[varName] = varCounter++;
        return '([a-zA-Z0-9_]+)';
    });
    
    regex = regex.replace(/\s+/g, '\\s*');
    regex = '^\\s*' + regex + '\\s*$';
    
    const regexPattern = new RegExp(regex);
    const match = input.match(regexPattern);
    
    if (match) {
        const extractedVars = {};
        for (let [varName, index] of Object.entries(variables)) {
            extractedVars[varName] = match[index + 1];
        }
        return { isMatch: true, variables: extractedVars };
    }
    
    return { isMatch: false, variables: {} };
}

function matchAlgebraicPattern(input, pattern) {
    let normalizedInput = normalizeAlgebraicExpression(input);
    let normalizedPattern = normalizeAlgebraicExpression(pattern);
    
    let regex = normalizedPattern.replace(/[\+\-\*\^]/g, '\\$&');
    
    const variables = {};
    let varCounter = 0;
    
    regex = regex.replace(/\{(\w+)\}/g, (match, varName) => {
        variables[varName] = varCounter++;
        return '([a-zA-Z0-9_]+)';
    });
    
    regex = '^\\s*' + regex + '\\s*$';
    
    const regexPattern = new RegExp(regex);
    const match = normalizedInput.match(regexPattern);
    
    if (match) {
        const extractedVars = {};
        for (let [varName, index] of Object.entries(variables)) {
            extractedVars[varName] = match[index + 1];
        }
        return { isMatch: true, variables: extractedVars };
    }
    
    return { isMatch: false, variables: {} };
}

function normalizeAlgebraicExpression(expr) {
    return expr
        .replace(/\s+/g, '')
        .replace(/²/g, '^2')
        .replace(/³/g, '^3')
        .replace(/\*/g, '×')
        .replace(/\//g, '÷')
        .toLowerCase();
}

function substituteVariables(template, variables) {
    let result = template;
    for (let [varName, value] of Object.entries(variables)) {
        const regex = new RegExp(`\\{${varName}\\}`, 'g');
        result = result.replace(regex, value);
    }
    return result;
}

function displayResult(column, input, result) {
    const resultSection = document.getElementById(`${column}-result`);
    const outputElement = document.getElementById(`${column}-output`);
    
    outputElement.textContent = result;
    resultSection.style.display = 'block';
}

function markAsSatisfactory(column) {
    stats.satisfactoryConversions++;
    updateMetrics();
    
    showFeedback(`Marcado como satisfactorio`, 'success');
    
    setTimeout(() => {
        document.getElementById(`${column}-result`).style.display = 'none';
    }, 2000);
}

function markForImprovement(column) {
    showFeedback('Marcado para mejora. Considera agregar un nuevo patrón.', 'warning');
}

function showAddPatternDialog(column) {
    const input = document.getElementById(`${column === 'natural' ? 'natural' : 'algebraic'}-input`).value;
    const output = document.getElementById(`${column}-output`).textContent;
    
    const naturalText = column === 'natural' ? input : output;
    const algebraicText = column === 'natural' ? output : input;
    
    const newNatural = prompt('Expresión en lenguaje natural:', naturalText);
    if (!newNatural) return;
    
    const newAlgebraic = prompt('Expresión algebraica:', algebraicText);
    if (!newAlgebraic) return;
    
    const category = prompt('Categoría (opcional):', 'personalizado') || 'personalizado';
    
    addNewPattern(newNatural, newAlgebraic, category);
}

function addNewPattern(natural, algebraic, category = 'personalizado') {
    if (!patternsData) {
        patternsData = { patterns: [] };
    }
    
    const newId = Math.max(...patternsData.patterns.map(p => p.id || 0), 0) + 1;
    const newPattern = {
        id: newId,
        natural: natural,
        algebraic: algebraic,
        category: category
    };
    
    patternsData.patterns.push(newPattern);
    stats.totalPatterns = patternsData.patterns.length;
    updateMetrics();
    
    showFeedback(`Nuevo patrón agregado: "${natural}" - "${algebraic}"`, 'success');
}

function loadPatterns(data) {
    patternsData = data;
    stats.totalPatterns = data.patterns ? data.patterns.length : 0;
    stats.lastUpdate = new Date().toLocaleString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
    updateMetrics();
}

function handleFileSelection() {
    const fileInput = document.getElementById('json-file-input');
    const fileName = document.getElementById('file-name');
    const loadButton = document.getElementById('load-json-btn');
    
    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        fileName.textContent = file.name;
        stats.fileSize = Math.round(file.size / 1024);
        loadButton.disabled = false;
    } else {
        fileName.textContent = 'Ningún archivo seleccionado';
        stats.fileSize = 0;
        loadButton.disabled = true;
    }
    updateMetrics();
}

function loadJSONFile() {
    const fileInput = document.getElementById('json-file-input');
    if (fileInput.files.length === 0) {
        alert('Por favor, selecciona un archivo JSON');
        return;
    }
    
    const file = fileInput.files[0];
    const reader = new FileReader();
    
    reader.onload = function(e) {
        try {
            const jsonData = JSON.parse(e.target.result);
            
            if (!jsonData.patterns || !Array.isArray(jsonData.patterns)) {
                throw new Error('El archivo JSON debe tener una propiedad "patterns" que sea un array');
            }
            
            loadPatterns(jsonData);
            showFeedback(`Archivo cargado exitosamente: ${file.name}`, 'success');
            
        } catch (error) {
            alert(`Error al cargar el archivo: ${error.message}`);
        }
    };
    
    reader.readAsText(file);
}

function resetToDefault() {
    if (confirm('¿Estás seguro de que quieres resetear a los patrones por defecto?')) {
        loadPatterns(defaultPatterns);
        stats.fileSize = 0;
        document.getElementById('file-name').textContent = 'Ningún archivo seleccionado';
        document.getElementById('json-file-input').value = '';
        showFeedback('Patrones reseteados a valores por defecto', 'info');
    }
}

function addToHistory(type, input, output) {
    const historyItem = {
        timestamp: new Date().toLocaleString('es-ES'),
        type: type,
        input: input,
        output: output
    };
    
    conversionHistory.unshift(historyItem);
    if (conversionHistory.length > 50) {
        conversionHistory.pop();
    }
    
    updateHistoryDisplay();
}

function updateHistoryDisplay() {
    const historyContainer = document.getElementById('conversion-history');
    
    if (conversionHistory.length === 0) {
        historyContainer.innerHTML = '<p class="no-history">No hay conversiones realizadas aún</p>';
        return;
    }
    
    const historyHTML = conversionHistory.map(item => `
        <div class="history-item">
            <div class="history-header">
                <span class="history-type">${item.type === 'natural-to-algebraic' ? 'Natural a Algebraico' : 'Algebraico a Natural'}</span>
                <span class="history-timestamp">${item.timestamp}</span>
            </div>
            <div class="history-content">
                <div><strong>Entrada:</strong> ${item.input}</div>
                <div><strong>Resultado:</strong> ${item.output}</div>
            </div>
        </div>
    `).join('');
    
    historyContainer.innerHTML = historyHTML;
}

function clearHistory() {
    if (confirm('¿Estás seguro de que quieres limpiar el historial?')) {
        conversionHistory = [];
        updateHistoryDisplay();
        showFeedback('Historial limpiado', 'info');
    }
}

function exportHistory() {
    if (conversionHistory.length === 0) {
        alert('No hay historial para exportar');
        return;
    }
    
    const dataStr = JSON.stringify(conversionHistory, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `historial_conversiones_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    showFeedback('Historial exportado exitosamente', 'success');
}

function updateMetrics() {
    document.getElementById('total-patterns').textContent = stats.totalPatterns;
    document.getElementById('file-size').textContent = stats.fileSize > 0 ? `${stats.fileSize} KB` : '0 KB';
    document.getElementById('conversions-count').textContent = stats.totalConversions;
    
    const satisfactionRate = stats.totalConversions > 0 
        ? Math.round((stats.satisfactoryConversions / stats.totalConversions) * 100)
        : 0;
    document.getElementById('satisfaction-rate').textContent = `${satisfactionRate}%`;
    
    document.getElementById('last-update').textContent = stats.lastUpdate || '--';
    
    const avgComplexity = calculateAverageComplexity();
    document.getElementById('avg-complexity').textContent = avgComplexity;
}

function calculateAverageComplexity() {
    if (!patternsData || !patternsData.patterns || patternsData.patterns.length === 0) {
        return 0;
    }
    
    const totalWords = patternsData.patterns.reduce((sum, pattern) => {
        const wordCount = pattern.natural.split(' ').length;
        return sum + wordCount;
    }, 0);
    
    return Math.round(totalWords / patternsData.patterns.length);
}

function showFeedback(message, type = 'info') {
    let feedbackElement = document.getElementById('feedback-message');
    if (!feedbackElement) {
        feedbackElement = document.createElement('div');
        feedbackElement.id = 'feedback-message';
        feedbackElement.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem;
            border-radius: 4px;
            color: white;
            font-weight: 600;
            z-index: 1000;
            transition: opacity 0.3s ease;
        `;
        document.body.appendChild(feedbackElement);
    }
    
    const colors = {
        'success': '#10b981',
        'error': '#ef4444',
        'warning': '#f59e0b',
        'info': '#3b82f6'
    };
    
    feedbackElement.style.backgroundColor = colors[type] || colors['info'];
    feedbackElement.textContent = message;
    feedbackElement.style.opacity = '1';
    
    setTimeout(() => {
        feedbackElement.style.opacity = '0';
    }, 3000);
}