/*Si clicamos en el botón del sol, borrarémos la clase css modoOscuro del div 
con id modo y se aplicará el estilo modoClaro al sol*/
document.getElementById('sol').onclick = function(){
  document.getElementById('modo').classList.remove('modoOscuro')
//   document.getElementById('luna').classList.remove('modoClaro')
  this.classList.add('modoClaro')
}
/*Si clicamos en el botón de la luna, añadiremos la clase css modoOscuro del div 
con id modo y se aplicará el estilo modoClaro a la luna*/
document.getElementById('luna').onclick = function(){
  document.getElementById('modo').classList.add('modoOscuro')
//   document.getElementById('sol').classList.remove('modoClaro')
  this.classList.add('modoOscuro')
}

/*CAMBIAR THIS POR ALGO, POR ESO NO FUNCIONA */