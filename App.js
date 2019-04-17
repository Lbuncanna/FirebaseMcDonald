var CARD_CONTAINER = document.getElementsByClassName('card-container')[0];
 var cards = [];
 var ref = firebase.database().ref('Pedidos');

 function Adicionar() {
 	var Pedido = {
 		nome: "mesa 2",
 		inform: "McLanche",


  	};
  	ref.push(Pedido).then(snapshot=>{
  		adicionarCardATela(Pedido, snapshot.Key)
  		console.log(Pedido)
  	})
 }
function deletar (id) {
		ref.child(id).remove().then(()=>{
			var ped = document.getElementById(id)
			ped.remove()
		})
	}
 document.addEventListener("DOMContentLoaded", function(){
  ref.once('value').then(snapshot=>{
    console.log("chave: ", snapshot.key)
    snapshot.forEach(value =>{
      console.log('chave. ', value.key)
      adicionarCardATela(value.val(), value.key);
    });
  });
});

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


	let button_del2= document.createElement("button");
  button_del2.classList.add('btn', 'btn-link', 'col-3');
  button_del2.setAttribute('onclick', 'deletar("' + snapKey + '")');
  button_del2.innerText = 'A'; 
  inner2.appendChild(button_del2);
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