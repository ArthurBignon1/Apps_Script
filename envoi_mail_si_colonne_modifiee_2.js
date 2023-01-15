//fonctionne beaucoup mieux que le 1, parce que la au moins ça prend que si la colonne i est modifiée

function sendEmailsOnEdit(e) {
  var sheet = SpreadsheetApp.getActive().getSheetByName("Suivi Service Client");
  var editedColumn = e.range.getColumn();
  var columnToWatch = 9;  // Colonne I = 9ème colonne
  var email = "calvyn.creantor@autohero.com";
  
  if (editedColumn == columnToWatch) {
    var message = "Le service client a besoin d'infos concernant un véhicule en SAV à Longueil !";
    var subject = "Le service client a besoin d'infos !" ;
    MailApp.sendEmail(email, subject, message);
  }
}
