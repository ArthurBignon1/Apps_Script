function sendEmailsOnEdit(e) {
  var editedSheet = e.range.getSheet().getName();
  var columnToWatch = 9;  // Colonne I = 9ème colonne
  var email = "arthur.bignon@autohero.com";
  
  if (editedSheet == "Suivi Service Client" && e.range.getColumn() == columnToWatch) {
    var cellValue = e.range.getValue();
    if (cellValue == "") {
        return;
    }

    var message = "Le service client a besoin d'infos concernant un véhicule en SAV à Longueil !";
    var subject = "Le service client a besoin d'infos !" ;
    MailApp.sendEmail(email, subject, message);
  }
}
