let idCount = 0;
let errorCount = 0;

const imgHolder = document.querySelector('[data-holder=imgHolder]');
const inputFieldUrl = document.querySelector('[data-input=urlInput]');
const inputFieldAlt = document.querySelector('[data-input=altInput]');
const submitBtn = document.querySelector('[type=submit]');

function remove() {
  if (this.parentNode) {
    this.parentNode.removeChild(this);
  }
};

function addImg(){
  const imgEl = document.createElement('div');
  imgEl.className = 'imgHolder';
  imgEl.id = idCount;

  const img = document.createElement('img');
  img.src = inputFieldUrl.value;
  img.alt = inputFieldAlt.value;
  //img.setAttribute("alt", inputFieldAlt);

  img.onload = function() { // если всё загрузилось, то тогда создаётся
    console.log(`Image loaded`);
    inputFieldUrl.value = '';
    inputFieldAlt.value = '';
    imgEl.innerHTML = `<div data-btn="delete" class="deleteBtn"></div>`;

    idCount++;
    
    imgHolder.appendChild(imgEl);
    imgEl.appendChild(img);

    if (imgHolder.getElementsByClassName('error').length != 0){
      imgHolder.querySelector('[data-error=error]').style.display = 'none';
      errorCount = 0;
    }
  };
  img.onerror = function() {
    if (errorCount === 0){
      imgHolder.querySelector('[data-error=error]').style.display = 'block';
      errorCount++;
    }
  };
}

inputFieldUrl.addEventListener('keypress', function(e) { 
  let key = e.which || e.keyCode;
  if (key === 13) { // 13 is enter
    e.preventDefault();
    addImg()
  }
});

submitBtn.addEventListener('click', (event) => {
  event.preventDefault();
  addImg();
});

imgHolder.addEventListener('click', (event) => {
  if (event.toElement.className === "deleteBtn"){
    const img = document.getElementById(event.toElement.parentElement.id);
    img.remove();
  }
});