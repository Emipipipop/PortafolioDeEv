let isUpdating = false; 

function parseNumber(input) { 
    if (!input && input !== 0) return 0; 
     
    const inputStr = input.toString().trim(); 
    if (!inputStr) return 0; 
     
    let expression = inputStr 
        .replace(/sqrt\s*\(/gi, 'Math.sqrt(')  
        .replace(/pi\b/gi, 'Math.PI');         
     
    try { 
        const result = Function('"use strict"; return (' + expression + ')')(); 
         
        if (isNaN(result) || !isFinite(result)) { 
            return 0; 
        } 
        return result; 
} catch (error) { 
return 0; 
} 
} 

function parseAngle(input) { 
return parseNumber(input); 
} 

function angleToPI(angle) { 
    if (Math.abs(angle) < 1e-8) return "0"; 
     
    const piMultiples = [ 
        { value: Math.PI, text: "pi" }, 
        { value: Math.PI/2, text: "pi/2" }, 
        { value: Math.PI/3, text: "pi/3" }, 
        { value: Math.PI/4, text: "pi/4" }, 
        { value: Math.PI/6, text: "pi/6" }, 
        { value: 2*Math.PI, text: "2*pi" }, 
        { value: 3*Math.PI/2, text: "3*pi/2" }, 
        { value: 2*Math.PI/3, text: "2*pi/3" }, 
        { value: 3*Math.PI/4, text: "3*pi/4" }, 
        { value: 5*Math.PI/6, text: "5*pi/6" }, 
        { value: 5*Math.PI/4, text: "5*pi/4" }, 
        { value: 4*Math.PI/3, text: "4*pi/3" }, 
        { value: 5*Math.PI/3, text: "5*pi/3" }, 
        { value: 7*Math.PI/4, text: "7*pi/4" }, 
        { value: -Math.PI, text: "-pi" }, 
        { value: -Math.PI/2, text: "-pi/2" }, 
        { value: -Math.PI/3, text: "-pi/3" }, 
        { value: -Math.PI/4, text: "-pi/4" }, 
        { value: -Math.PI/6, text: "-pi/6" } 
    ]; 

     for (let pm of piMultiples) { 
        if (Math.abs(angle - pm.value) < 1e-8) { 
            return pm.text; 
        } 
    } 
 
    const ratio = angle / Math.PI; 
     
    if (Math.abs(ratio - Math.round(ratio)) < 1e-8) { 
        const intRatio = Math.round(ratio); 
        if (intRatio === 1) return "pi"; 
        if (intRatio === -1) return "-pi"; 
        if (intRatio === 0) return "0"; 
        return intRatio + "*pi"; 
    } 
 
    const denominators = [2, 3, 4, 6, 8, 12]; 
    for (let den of denominators) { 
        const num = ratio * den; 
        if (Math.abs(num - Math.round(num)) < 1e-8) { 
            const intNum = Math.round(num); 
            if (intNum === 0) return "0"; 
            if (den === 1) { 
                return intNum === 1 ? "pi" : intNum === -1 ? "-pi" : 
intNum + "*pi"; 
            } 
            if (intNum === 1) return "pi/" + den; 
            if (intNum === -1) return "-pi/" + den; 
            return intNum + "*pi/" + den; 
        } 
    } 
 
    return angle.toFixed(6); 
}

function formatNumber(num) { 
    if (Math.abs(num) < 1e-10) return "0"; 
     
    const sqrtValues = [ 
        { value: Math.sqrt(2), text: "√2" }, 
        { value: Math.sqrt(3), text: "√3" }, 
        { value: Math.sqrt(5), text: "√5" }, 
        { value: Math.sqrt(6), text: "√6" }, 
        { value: Math.sqrt(7), text: "√7" }, 
        { value: Math.sqrt(8), text: "2√2" }, 
        { value: Math.sqrt(2)/2, text: "√2/2" }, 
        { value: Math.sqrt(3)/2, text: "√3/2" }, 
        { value: Math.sqrt(3)/3, text: "√3/3" }, 
        { value: -Math.sqrt(2), text: "-√2" }, 
        { value: -Math.sqrt(3), text: "-√3" }, 
        { value: -Math.sqrt(2)/2, text: "-√2/2" }, 
        { value: -Math.sqrt(3)/2, text: "-√3/2" } 
    ]; 
 
    for (let sv of sqrtValues) { 
        if (Math.abs(num - sv.value) < 1e-8) { 
            return sv.text; 
        } 
    } 
 
    const fractions = [ 
        { value: 1/2, text: "1/2" }, 
        { value: 1/3, text: "1/3" }, 
        { value: 2/3, text: "2/3" }, 
        { value: 1/4, text: "1/4" }, 
        { value: 3/4, text: "3/4" }, 
        { value: 1/6, text: "1/6" }, 
         { value: 5/6, text: "5/6" }, 
        { value: -1/2, text: "-1/2" }, 
        { value: -1/3, text: "-1/3" }, 
        { value: -2/3, text: "-2/3" } 
    ]; 
 
    for (let frac of fractions) { 
        if (Math.abs(num - frac.value) < 1e-8) { 
            return frac.text; 
        } 
    } 
 
    if (Math.abs(num - Math.round(num)) < 1e-8) { 
        return Math.round(num).toString(); 
    } 
 
    return parseFloat(num.toFixed(6)).toString(); 
} 

function normalizeAngle(angle) { 
    while (angle > Math.PI) angle -= 2 * Math.PI; 
    while (angle <= -Math.PI) angle += 2 * Math.PI; 
    return angle; 
}

function updateFromCartesian() { 
    if (isUpdating) return; 
    isUpdating = true; 
 
    const real = parseNumber(document.getElementById('real').value) || 0; 
    const imag = parseNumber(document.getElementById('imag').value) || 0; 
 
    const modulus = Math.sqrt(real * real + imag * imag); 
    let angle = Math.atan2(imag, real); 
    angle = normalizeAngle(angle); 
 
    const modulusFormatted = formatNumber(modulus); 
    const angleFormatted = angleToPI(angle); 
     
    document.getElementById('modulus').value = modulusFormatted; 
    document.getElementById('angle').value = angleFormatted; 
    document.getElementById('angle2').value = angleFormatted; 
 
    document.getElementById('exp-modulus').value = modulusFormatted; 
    document.getElementById('exp-angle').value = angleFormatted; 
 
    updateResults(real, imag, modulus, angle); 
 
    isUpdating = false; 
} 

function updateFromPolar() { 
    if (isUpdating) return; 
    isUpdating = true; 
 
    const modulus = parseNumber(document.getElementById('modulus').value) || 0; 
    const angle = parseAngle(document.getElementById('angle').value) || 0; 
    const normalizedAngle = normalizeAngle(angle); 
 
    const angleFormatted = angleToPI(normalizedAngle); 
    document.getElementById('angle2').value = angleFormatted; 
 
    const real = modulus * Math.cos(normalizedAngle); 
    const imag = modulus * Math.sin(normalizedAngle); 
 
    document.getElementById('real').value = formatNumber(real); 
    document.getElementById('imag').value = formatNumber(imag); 
 
    document.getElementById('exp-modulus').value = formatNumber(modulus); 
    document.getElementById('exp-angle').value = angleFormatted; 
 
    updateResults(real, imag, modulus, normalizedAngle);
    isUpdating = false; 
  } 

function updateFromExponential() { 
    if (isUpdating) return; 
    isUpdating = true; 
 
    const modulus = parseNumber(document.getElementById('exp-modulus').value) || 0; 
    const angle = parseAngle(document.getElementById('exp-angle').value) || 0; 
    const normalizedAngle = normalizeAngle(angle); 
 
    const real = modulus * Math.cos(normalizedAngle); 
    const imag = modulus * Math.sin(normalizedAngle); 
 
    document.getElementById('real').value = formatNumber(real); 
    document.getElementById('imag').value = formatNumber(imag); 
 
    const angleFormatted = angleToPI(normalizedAngle); 
    document.getElementById('modulus').value = formatNumber(modulus); 
    document.getElementById('angle').value = angleFormatted; 
    document.getElementById('angle2').value = angleFormatted; 
 
    updateResults(real, imag, modulus, normalizedAngle); 
 
    isUpdating = false; 
}

function updateResults(real, imag, modulus, angle) { 
    const angleText = angleToPI(angle); 
     
    let cartesianText = ""; 
    if (real !== 0 || imag !== 0) { 
        if (real !== 0) { 
            cartesianText += formatNumber(real); 
        } 
        if (imag > 0) { 
            cartesianText += (real !== 0 ? " + " : ""); 
            if (imag === 1) { 
                cartesianText += "i"; 
            } else { 
                cartesianText += formatNumber(imag) + "i"; 
            } 
        } else if (imag < 0) { 
            cartesianText += " - "; 
            if (imag === -1) { 
                cartesianText += "i"; 
            } else { 
                cartesianText += formatNumber(-imag) + "i"; 
            } 
        } 
        if (cartesianText === "") cartesianText = "0"; 
    } else { 
        cartesianText = "0"; 
    } 
    document.getElementById('cartesian-result').textContent = "z = " + cartesianText; 
 
    let polarText = ""; 
    if (modulus !== 0) { 
        polarText = formatNumber(modulus) + "(cos(" + angleText + ") + i sin(" + angleText + "))"; 
    } else { 
        polarText = "0"; 
    } 
    document.getElementById('polar-result').textContent = "z = " + polarText; 
 
    let expText = ""; 
    if (modulus !== 0) { 
        expText = formatNumber(modulus) + "e^(i*" + angleText + ")"; 
    } else { 
        expText = "0"; 
    } 
    document.getElementById('exponential-result').textContent = "z = " + expText; 
}

function clearAll() { 
    const inputs = document.querySelectorAll('input[type="text"]'); 
    inputs.forEach(input => { 
        if (!input.readOnly) { 
            input.value = ''; 
        } 
    }); 
     
    const results = document.querySelectorAll('.result'); 
    results.forEach(result => result.textContent = 'Ingresa los valores arriba'); 
} 

document.addEventListener('DOMContentLoaded', function() { 
    document.getElementById('real').addEventListener('input', updateFromCartesian); 
    document.getElementById('imag').addEventListener('input', updateFromCartesian); 
     
    document.getElementById('modulus').addEventListener('input', updateFromPolar); 
    document.getElementById('angle').addEventListener('input', function() { 
        document.getElementById('angle2').value = this.value; 
        updateFromPolar(); 
    }); 
 
    document.getElementById('exp-modulus').addEventListener('input', updateFromExponential); 
    document.getElementById('exp-angle').addEventListener('input', updateFromExponential); 
     
    const inputs = document.querySelectorAll('input[type="text"]'); 
    inputs.forEach(input => { 
        if (!input.readOnly) { 
            input.addEventListener('keypress', function(e) { 
                if (e.key === 'Enter') { 
                    input.blur(); 
                } 
            }); 
        } 
    }); 
}); 