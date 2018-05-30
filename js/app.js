const privateKey="259279b0dd433761f346bc98d286bc0e06de12a4";
const publicKey="ada647d813f1c5a4815a7bb77e50db1a";

const content = document.getElementById('content');
const search = document.getElementById('search');

// metodo fetch de conectio
const getConnection = () => {
  const ts = Date.now();
  const hash = MD5(ts+privateKey+publicKey);
  const URL= `http://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`
  fetch(URL)
    .then(response => response.json())
    .then(response => {
      console.log(response);
      response.data.results.forEach(e => {
        drawHero(e);
      });
    })
    .catch(e => console.log(e));

};

const drawHero = e =>{
  const image=`${e.thumbnail.path}/portrait_uncanny.${e.thumbnail.extension}`;
  const hero = `
  <div class="col-md-3 center">
    <h3 class="center">${e.name}</h3><br>
    <div class="img-txt">
    <img class="img" src="${image}">
    <p class="txt">${e.description}</p>
    </div>
  </div>`;

  content.innerHTML += hero;
  // content.insertAdjacentHTML('beforeEnd',hero);
};

const searchHero = name =>{
  const ts = Date.now(),
  hero= encodeURIComponent(name),
  hash = MD5(ts+privateKey+publicKey),
  URL= `http://gateway.marvel.com/v1/public/characters?name=${hero}&ts=${ts}&apikey=${publicKey}&hash=${hash}`
  fetch(URL)
    .then(response => response.json())
    .then(response => {
      console.log(response);
      response.data.results.forEach(e => {
        drawHero(e);
      });
    })
    .catch(e => console.log(e));

};


search.addEventListener('keyup', e =>{
  if(e.keyCode === 13){
    content.innerHTML='';
    searchHero(e.target.value.trim());
  }
})


getConnection();

