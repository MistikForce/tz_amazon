import 'bootstrap';
import json from '../commons/products.json'

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