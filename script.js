// Objeto que define as unidades e seus fatores de conversão
const units = {
    length: {
        "Milímetros (mm)": 1, // Unidade base para comprimento
        "Centímetros (cm)": 10, // 1 cm = 10 mm
        "Metros (m)": 1000, // 1 m = 1000 mm
        "Quilômetros (km)": 1000000, // 1 km = 1000000 mm
        "Milhas (mi)": 1609344, // 1 mi = 1609344 mm
        "Jardas (yd)": 914.4, // 1 yd = 914.4 mm
        "Pés (ft)": 304.8, // 1 ft = 304.8 mm
        "Polegadas (in)": 25.4 // 1 in = 25.4 mm
    },
    temperature: {
        "Celsius (°C)": 'celsius', // Unidade para temperatura em Celsius
        "Fahrenheit (°F)": 'fahrenheit', // Unidade para temperatura em Fahrenheit
        "Kelvin (K)": 'kelvin' // Unidade para temperatura em Kelvin
    },
    pressure: {
        "Pascal (Pa)": 1, // Unidade base para pressão
        "Atmosfera (atm)": 0.0000098692, // 1 Pa = 0.0000098692 atm
        "Bar (bar)": 0.00001, // 1 Pa = 0.00001 bar
        "Torr (Torr)": 0.00750062 // 1 Pa = 0.00750062 Torr
    },
    volume: {
        "Mililitros (mL)": 1, // Unidade base para volume
        "Centímetros cúbicos (cm³)": 1, // 1 cm³ = 1 mL
        "Decímetros cúbicos (dm³)": 1000, // 1 dm³ = 1000 mL
        "Litros (L)": 1000, // 1 L = 1000 mL
        "Metros cúbicos (m³)": 1000000, // 1 m³ = 1000000 mL
        "Decâmetros cúbicos (dam³)": 1000000000, // 1 dam³ = 1000000000 mL
        "Hectômetros cúbicos (hm³)": 1000000000000, // 1 hm³ = 1000000000000 mL
        "Quilômetros cúbicos (km³)": 1000000000000000 // 1 km³ = 1000000000000000 mL
    },
    weight: {
        "Miligramas (mg)": 1, // Unidade base para peso
        "Gramas (g)": 1000, // 1 g = 1000 mg
        "Kilogramas (kg)": 1000000, // 1 kg = 1000000 mg
        "Toneladas (t)": 1000000000 // 1 t = 1000000000 mg
    }
};

// Função que atualiza os seletores de unidades com base na categoria selecionada
function updateUnits() {
    const category = document.getElementById('category').value; // Obtém a categoria selecionada
    const unitFrom = document.getElementById('unitFrom'); // Obtém o seletor de unidade de origem
    const unitTo = document.getElementById('unitTo'); // Obtém o seletor de unidade de destino
    unitFrom.innerHTML = ''; // Limpa o conteúdo atual do seletor de unidade de origem
    unitTo.innerHTML = ''; // Limpa o conteúdo atual do seletor de unidade de destino

    // Adiciona as opções de unidade aos seletores
    for (let unit in units[category]) {
        let optionFrom = document.createElement('option'); // Cria uma nova opção
        optionFrom.value = unit; // Define o valor da opção
        optionFrom.text = unit; // Define o texto da opção
        unitFrom.add(optionFrom); // Adiciona a opção ao seletor de unidade de origem

        let optionTo = document.createElement('option'); // Cria uma nova opção
        optionTo.value = unit; // Define o valor da opção
        optionTo.text = unit; // Define o texto da opção
        unitTo.add(optionTo); // Adiciona a opção ao seletor de unidade de destino
    }

    convert(); // Chama a função de conversão automaticamente quando a unidade é atualizada
}

// Função que realiza a conversão das unidades
function convert() {
    const category = document.getElementById('category').value; // Obtém a categoria selecionada
    const unitFrom = document.getElementById('unitFrom').value; // Obtém a unidade de origem selecionada
    const unitTo = document.getElementById('unitTo').value; // Obtém a unidade de destino selecionada
    const inputValue = parseFloat(document.getElementById('inputValue').value); // Obtém o valor de entrada e o converte para número
    let result = 0; // Inicializa a variável de resultado

    // Verifica se o valor de entrada é um número válido
    if (!isNaN(inputValue)) {
        if (category === 'temperature') {
            result = convertTemperature(inputValue, unitFrom, unitTo); // Converte temperatura
        } else {
            result = (inputValue / units[category][unitFrom]) * units[category][unitTo]; // Converte outras unidades
        }
    }

    document.getElementById('outputValue').value = result; // Exibe o resultado
}

// Função específica para converter entre unidades de temperatura
function convertTemperature(value, from, to) {
    let result = value;

    if (from === 'Celsius (°C)') {
        if (to === 'Fahrenheit (°F)') {
            result = (value * 9/5) + 32; // Converte de Celsius para Fahrenheit
        } else if (to === 'Kelvin (K)') {
            result = value + 273.15; // Converte de Celsius para Kelvin
        }
    } else if (from === 'Fahrenheit (°F)') {
        if (to === 'Celsius (°C)') {
            result = (value - 32) * 5/9; // Converte de Fahrenheit para Celsius
        } else if (to === 'Kelvin (K)') {
            result = ((value - 32) * 5/9) + 273.15; // Converte de Fahrenheit para Kelvin
        }
    } else if (from === 'Kelvin (K)') {
        if (to === 'Celsius (°C)') {
            result = value - 273.15; // Converte de Kelvin para Celsius
        } else if (to === 'Fahrenheit (°F)') {
            result = ((value - 273.15) * 9/5) + 32; // Converte de Kelvin para Fahrenheit
        }
    }

    return result; // Retorna o resultado da conversão
}

// Função para alternar entre modo claro e modo escuro
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode'); // Alterna a classe 'dark-mode' no elemento body
    const darkModeToggle = document.getElementById('darkModeToggle'); // Obtém o botão de modo noturno
    if (document.body.classList.contains('dark-mode')) {
        darkModeToggle.textContent = 'Modo Claro'; // Altera o texto do botão para "Modo Claro"
    } else {
        darkModeToggle.textContent = 'Modo Escuro'; // Altera o texto do botão para "Modo Escuro"
    }
}

// Inicializa as unidades ao carregar a página
window.onload = updateUnits;
