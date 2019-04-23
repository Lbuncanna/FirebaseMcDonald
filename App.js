var CARD_CONTAINER = document.getElementsByClassName('card-container')[0];
 var cards = [];
 var ref = firebase.database().ref('Pedidos');

 function Adicionar() {
 	var Pedido = {
 		nome: document.getElementById("txtNome").value,
 		inform: document.getElementById("txtInfo").value,


  	};

  	ref.push(Pedido).then(snapshot=>{
  		alert('pedido adicionado')
      
  	})

 }




function deletar (id) {
  console.log(id)

    
     ref.child(id).remove().then(()=>{
     var pedi = document.getElementById(id)
    pedi.remove() 
    })
  
    
	}


document.addEventListener("DOMContentLoaded", function(){

ref.on('value',snapshot =>{
  snapshot.forEach(value =>{
    var container = document.getElementsByClassName('card-container')
    adicionarCardATela(value.val(),value.key)
  })
})
 
});




function Pronto (id) {
	console.log(id)
}


 function adicionarCardATela(informacao, snapKey) {
  


  //header
  
  let header = document.createElement("h2");
  header.innerText = informacao.nome;
  header.classList.add('ped-title');

  //Content

  let content = document.createElement("p");
  content.innerText = informacao.inform; 
  content.classList.add('ped-text');

  let inner = document.createElement("div");
  inner.classList.add('row');


	let button_del= document.createElement("button");
  button_del.classList.add('btn', 'btn-link', 'col-3');
  button_del.setAttribute('onclick', 'deletar("' + snapKey + '")');
  button_del.innerText = 'X'; 
  inner.appendChild(button_del);
//--------------------------------------------------------------------------
	let inner2 = document.createElement("div");
  inner2.classList.add('row');


	let button_pronto= document.createElement("button");
  button_pronto.classList.add('btn', 'btn-link', 'col-3');
  button_pronto.setAttribute('onclick', 'Pronto("' + snapKey + '")');
  button_pronto.innerText = 'Pronto'; 
  inner2.appendChild(button_pronto);
  
//--------------------------------------------------------------------------
	let ped = document.createElement("div");
  ped.classList.add('ped');
  ped.id = snapKey;
  let ped_body = document.createElement("div");
  ped_body.classList.add('ped-body');

 	

  ped_body.appendChild(header);
  ped_body.appendChild(content);
  ped_body.appendChild(inner);
  ped_body.appendChild(inner2);
  ped.appendChild(ped_body)
  
  //insere no container
  CARD_CONTAINER.appendChild(ped);

};