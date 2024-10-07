function isValidInput(input, base) {
    // Определяем допустимые символы для данной системы счисления
    const validChars = [];
    for (let i = 0; i < base; i++) {
        if (i < 10) {
            validChars.push(i.toString());
        } else {
            validChars.push(String.fromCharCode(55 + i)); // 55 + 10 = 65 -> 'A', 55 + 11 = 'B', и т.д.
        }
    }
    
    // Проверяем каждый символ во введенном числе
    for (const char of input.toUpperCase()) {
        if (!validChars.includes(char)) {
            return false; // Если символ недопустимый, возвращаем false
        }
    }
    return true; // Все символы действительны
}

function convertNumber(input, fromBase, toBase) {
    // 1) Переводим число в десятичную систему
    const decimalNumber = parseInt(input, fromBase);
    
    // Проверяем, корректно ли конвертировалось число
    if (isNaN(decimalNumber)) {
        throw new Error('Невозможно перевести число из заданной системы счисления.');
    }

    // 2) Переводим из десятичной в заданную систему счисления
    if (toBase < 2 || toBase > 16) {
        throw new Error('Целевая система счисления должна быть от 2 до 16.');
    }

    // Если decimalNumber равен 0, сразу возвращаем '0'
    if (decimalNumber === 0) {
        return '0';
    }

    let result = '';
    let number = decimalNumber;

    // Стандартный алгоритм перевода
    while (number > 0) {
        const remainder = number % toBase; // Находим остаток
        number = Math.floor(number / toBase); // Делим на основание

        // Преобразуем остаток в строку (для 10-16 используем буквы)
        if (remainder < 10) {
            result = remainder.toString() + result; // Остаток меньше 10
        } else {
            result = String.fromCharCode(55 + remainder) + result; // Остаток 10 и больше (A-F)
        }
    }

    return result;
}


function outputText(result) {
    // Получаем элемент текстового блока
    const textBlock = document.getElementById('resultblock');
    // Добавляем текст к существующему содержимому
    resultblock.innerHTML += result + '<br>';
    //label.textContent += ' Привет, мир!';
}

// Функция для обработки нажатия на кнопку "перевести"
document.getElementById('convertButton').addEventListener('click', function() {
    const label = document.getElementById('resultblock');
    label.textContent = ''; // Очищает текст в label

    const input = document.getElementById('numberInput').value;
    const fromBase = parseInt(document.getElementById('fromBase').value);
    const toBase = parseInt(document.getElementById('toBase').value);

    // // Проверка корректности баз
    // if (fromBase < 2 || fromBase > 16 || toBase < 2 || toBase > 16) {
    //     alert('Системы счисления могут быть только от 2 до 16.');
    //     return;
    // }

    // Проверка на корректность ввода
    if (!isValidInput(input, fromBase)) {
        alert('Неверный ввод числа для выбранной системы счисления.');
        return;
    }

    // Конвертация числа и вывод результата
    const result = convertNumber(input, fromBase, toBase);
    //alert(`Результат перевода: ${result}`);
    outputText(result); // Вызываем функцию
});



