// Получаем текущий скрипт и значение data-id
const scriptTag = document.currentScript;
const id = scriptTag.getAttribute('data-id');

// URL скрипта PHP через cors-anywhere пропущенный чтобы cors не кибербулил
const url = `https://cors-anywhere.herokuapp.com/https://profi.ru/backoffice/widget.php?id=${id}&type=210x190`;

// Отправляем запрос
fetch(url)
.then(response => {
    if (!response.ok) {
        throw new Error('Статус не 200 :(');
    }
    return response.arrayBuffer(); // Получаем ответ как ArrayBuffer
})
.then(buffer => {
    // Декодируем ArrayBuffer в текст с нужной кодировкой
    const decoder = new TextDecoder('windows-1251');  // windows-1251 -> utf-8
    const html = decoder.decode(buffer);
    
    // Создаем DOM-парсер (отловить из всей html нужные элементы)
    const parser = new DOMParser();
    // Парсим HTML-текст в DOM-структуру
    const doc = parser.parseFromString(html, 'text/html');
    // Выбираем все элементы с классом profi-widget__value(это отзывы и оценка)
    const values = doc.querySelectorAll('.profi-widget__value');
    // Получаем контейнер, куда будем вставлять выбранные элементы
    const container = document.getElementById('target-container');
    // Вставляем каждый выбранный элемент в контейнер
    values.forEach(value => {
        container.appendChild(value.cloneNode(true));
    });
})
.catch(error => {
    console.error('трабл с fetch:', error);
});
