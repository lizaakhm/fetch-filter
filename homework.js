/* დავალება 
https://api.escuelajs.co/api/v1/products/ _დან წამოვიღოთ პროდუქტები, გამოვიტანოთ ფეიჯზე ცხრილის სახით.
ცხრილში უნდა იყოს შემდეგი ველები: id, title, price, category, createdAt.
გვერდზე უნდა გვქონდეს ფილტრის ინფუთიც (დღეს როგორც გავაკეთეთ, გაფილტრვა თუ გინდათ იყოს ღილაკის კლიკზე), გაფილტრვა მოხდეს title პარამეტრით. და განახლებული ლისტი უნდა მივიღოთ api_დან;
ცხრილში თითოეული სვეტის ჰედერზე კლიკით უნდა შევძლით წამოსული მონაცემების დალაგება ზრდადობით ან კლებადობით. ყველა სვეტზე თუ ვერ იზავთ 1_ზე მაინც აუცილებლად გააკეთეთ.
*/

const Url = 'https://api.escuelajs.co/api/v1/products/';
const filterInput = document.getElementById('filterInput');
const tableBody = document.getElementById('tableBody');

async function fillTable() {
  tableBody.innerHTML = '';
  const response = await fetch(Url);
  const data = await response.json();

  data.forEach(product => {
    const row = tableBody.insertRow();
    row.innerHTML = `<td>${product.id}</td>
                     <td>${product.title}</td>
                     <td>${product.price}</td>
                     <td>${product.category.name}</td>
                     <td>${product.creationAt}</td>`;
  });
}

 function filter() {
  const filterValue = filterInput.value.toLowerCase();
  const rows = tableBody.getElementsByTagName('tr');

  for (let i = 0; i < rows.length; i++) {
    const title = rows[i].getElementsByTagName('td')[1];

    if (title) {
      const titleText = title.textContent || title.innerText;

      if (titleText.toLowerCase().includes(filterValue)) {
        rows[i].style.display = '';
      } else {
        rows[i].style.display = 'none';
      }
    }
  }
}

function sortTable(columnIndex) {
  const table = document.getElementById('productTable');
  const rows = table.getElementsByTagName('tr');
  const switching = true;
  let shouldSwitch, i;

  while (switching) {
    switching = false;
    for (i = 1; i < rows.length - 1; i++) {
      const currentCell = rows[i].getElementsByTagName('td')[columnIndex];
      const nextCell = rows[i + 1].getElementsByTagName('td')[columnIndex];

      shouldSwitch = compareCells(currentCell, nextCell);
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
      }
    }
  }
}

function compareCells(cell1, cell2) {
  const value1 = cell1.textContent || cell1.innerText;
  const value2 = cell2.textContent || cell2.innerText;

  return value1.localeCompare(value2) > 0;
}

function newTable() {
  fillTable();
  filter();
}

fillTable();
filterInput.addEventListener('input', fillTable);