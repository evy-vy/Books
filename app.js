const bookList = document.querySelector('.book-list');
const bookForm = document.querySelector('.book-form');
const container = document.querySelector('.container');

class Book {
  constructor(titre, auteur, annee) {
    this.titre = titre;
    this.auteur = auteur;
    this.annee = annee;
  }

  addBookToList(book) {

    const row = document.createElement('tr');

    row.innerHTML = `
    <td>${book.titre}</td>
    <td>${book.auteur}</td>
    <td>${book.annee}</td>
    <td><button class='delete'>X</button></td>`;

    bookList.appendChild(row);
  }

  //méthode permettant de supprimer les champs une fois le livre envoyé dans la liste
  clearFields() {
    document.getElementById('titre').value = "";
    document.getElementById('auteur').value = "";
    document.getElementById('annee').value = "";
  }

  showAlert(message, className) {

    const alert = document.createElement('div');
    alert.className = `alert ${className}`;
    alert.appendChild(document.createTextNode(message)); //creation d'un noeud avec du text à l'interieur
    container.insertBefore(alert, bookForm);

    setTimeout(() => {
      document.querySelector('.alert').remove()
    }, 2500)
  }
}

//class utilitaire avec méthode permettant de supprimer les livres
//cible l'élément donc la class est delete
//supprime la 'tr' créée dans addBookToList le parent étant td et le grand parent tr
class Interface {

  deleteBook(target) {

    if (target.className === 'delete') {
      target.parentElement.parentElement.remove();
    }
  }

}

bookForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const titre = document.getElementById('titre').value;
  const auteur = document.getElementById('auteur').value;
  const annee = document.getElementById('annee').value;

  const book = new Book(titre, auteur, annee);

  if (titre === "" || auteur === "" || annee === "") {
    book.showAlert('Veuillez remplir les champs.', 'error');
  } else {

    book.addBookToList(book);
    book.clearFields();
    book.showAlert('Livre ajouté.', 'success');

  }


})

bookList.addEventListener('click', (e) => {

  const ui = new Interface();
  ui.deleteBook(e.target);
})