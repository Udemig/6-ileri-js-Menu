// html'den çağrılan elemanlar
var menuArea = document.querySelector('.menu-area');

// sayfanın yükleme anını izler
document.addEventListener('DOMContentLoaded', getMenu);

// ürünler verisini bütün fonksiyonlar erişebilecek
var globalMenu = [];

// ürün verilerini alır
function getMenu() {
  fetch('db.json')
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      globalMenu = data;
      renderMenu(data.menu);
    })
    .catch(function (err) {
      console.log(err);
    });
}

// ürünleri ekran basıcak fonksiyon
function renderMenu(data) {
  // her bir ürün için html kartını diziye gönderir
  var menuHTML = data.map(function (item) {
    return `
       <div id="card">
        <img src="${item.img}" />
        <div class="card-info">
          <div class="name">
            <h3>${item.title}</h3>
            <p>$ ${item.price}</p>
          </div>
          <p class="desc">
             ${item.desc}
          </p>
        </div>
      </div>`;
  });

  // diziyi stringe çevirme fonksiyonu
  menuHTML = menuHTML.join(' ');

  // htmle'e hazırladığımız kartları gönderme
  menuArea.innerHTML = menuHTML;
}

// bütün butonları çağırma
var buttons = document.querySelectorAll('.filter-btn');

// bütün butonlara olay izleyicisi ekleme
buttons.forEach(function (button) {
  button.addEventListener('click', filterCategory);
});

//  ürünleri filtreler
function filterCategory(e) {
  // butonun temsil ettiği kategoriyi alma
  var selected = e.target.dataset.category;

  // seçilen kategoriyle eşleşen bütün ürünleri alma
  var filtredMenu = globalMenu.menu.filter(function (item) {
    return item.category === selected;
  });

  if (selected === 'all') {
    // hepsi seçildiyse bütün menüyü ekrana bas
    renderMenu(globalMenu.menu);
  } else {
    // filtrlenmiş diziyi ekrana bas
    renderMenu(filtredMenu);
  }
}
