import 'bootstrap';
import json from '../commons/products.json'
const openModal = document.getElementById('open_modal');
const closeModal = document.getElementById('close_modal');
const openMobMenu = document.getElementById('open_mob_menu');
const closeMobMenu = document.getElementById('close_mob_menu');
const overlay = document.getElementById('page_overlay');

window.onload = creatProdList(json);
function creatProdList(json){
    let html = '';
    for(let i=0;i<json.length;i++){
        html += `
        <li class="item"><a href="#" class="item_link">
            <div class="image"><img src="${json[i].image}" alt="product image"></div>
            <div class="text_wrap">
                <p class="text">${json[i].description}</p>
                <div class="rait_wrap">
                    <div class="${json[i].rait}"></div>
                    <span class="qty">${json[i].qtyRev}</span>
                </div>
            </div>
        </a></li>`;
    }
    document.getElementById('prod_list').innerHTML = html;
}

openModal.addEventListener('click', ()=>{
    document.body.classList.add('open_modal_menu');
});
closeModal.addEventListener('click', ()=>{
    document.body.classList.remove('open_modal_menu');
});
openMobMenu.addEventListener('click', ()=>{
    document.body.classList.add('open');
});
closeMobMenu.addEventListener('click', ()=>{
    document.body.classList.remove('open');
});
overlay.addEventListener('click', ()=>{
    document.body.classList.remove('open');
    document.body.classList.remove('open_modal_menu')
})
