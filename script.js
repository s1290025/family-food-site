let section = "family";

const data = [

{
section:"family",
category:"牛肉",
title:"ガスト ビーフステーキ",
text:"手頃で満足感がある"
},

{
section:"family",
category:"ラーメン",
title:"バーミヤン 醤油ラーメン",
text:"あっさりして食べやすい"
},

{
section:"home",
category:"牛肉",
title:"肉じゃが",
text:"家庭料理の定番"
},

{
section:"home",
category:"麺",
title:"にゅうめん",
text:"やさしい味"
}

];

function switchSection(s){
section=s;
show();
}

function show(){

const items=document.getElementById("items");
items.innerHTML="";

const categories=[...new Set(data.filter(d=>d.section===section).map(d=>d.category))];

const catDiv=document.getElementById("category-buttons");

catDiv.innerHTML="";

categories.forEach(c=>{
const b=document.createElement("button");
b.innerText=c;
b.onclick=()=>showItems(c);
catDiv.appendChild(b);
});

showItems(categories[0]);
}

function showItems(category){

const items=document.getElementById("items");

items.innerHTML="";

data
.filter(d=>d.section===section && d.category===category)
.forEach(d=>{

const card=document.createElement("div");

card.className="card";

card.innerHTML=

"<h3>"+d.title+"</h3>"+
"<p>"+d.text+"</p>";

items.appendChild(card);

});
}

show();
