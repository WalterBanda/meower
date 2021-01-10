const form = document.querySelector('.mew-form');
const API_URL = 'http://localhost:5000/mews';
const mewsElement = document.querySelector('.mews')
const loadingElement = document.querySelector('.loading');

loadingElement.style.display = '';

listAllMews();

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const name = formData.get('name');
  const content = formData.get('content');
  const mew = {
    name,
    content,
  };

  loadingElement.style.display = '';
  form.style.display = 'none';

  fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify(mew),
    headers: {
      'content-type': 'application/json',
    },
  }).then(response => response.json()).then(createdMew => {
    console.log(createdMew);
    form.reset();
    setTimeout(() => {
     form.style.display = 'none';
     loadingElement.style.display = ''
    },10000);
    listAllMews();
    form.style.display = '';
    loadingElement.style.display = 'none';
  });
});

function listAllMews() {
  mewsElement.innerHTML = '';
  fetch(API_URL)
      .then(response => response.json())
      .then(mews => {
        console.log(mews);
        mews.reverse();
        mews.forEach(mew => {
          const div = document.createElement('div');
          div.className = 'card';
          const header = document.createElement('h3');
          const content = document.createElement('p');
          const date = document.createElement('date');

          header.textContent = mew.name;
          content.textContent = mew.content;
          date.textContent = new Date(mew.created);

          div.appendChild(header);
          div.appendChild(content);
          div.appendChild(date)

          mewsElement.appendChild(div);
        });
        loadingElement.style.display = 'none';
      })
}
