function extractDataFromSheets() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName("Leads");
  
  var data = sheet.getDataRange().getValues();
  var destinationSheet = spreadsheet.getSheetByName("Colle pièces bis");
  
  // Efface toutes les données de "Colle pièces bis" SAUF la ligne 1
  var lastRow = destinationSheet.getLastRow();
  if (lastRow > 1) {
    destinationSheet.getRange(2, 1, lastRow - 1, destinationSheet.getLastColumn()).clearContent();
  }
  
  var destinationData = [];

  for (var i = 0; i < data.length; i++) {
    var sheetId = data[i][8];

    if (sheetId !== "" && i > 0) {
      try {
        var targetSpreadsheet = SpreadsheetApp.openById(sheetId);
        var magasinSheet = targetSpreadsheet.getSheetByName("Magasin");

        if (magasinSheet) {
          var magasinData = magasinSheet.getDataRange().getValues();
          var filteredMagasinData = magasinData.slice(1).filter(row => !isEmptyRow(row)).map(row => {
            row.splice(2, 1);  // Supprime la colonne C
            row.splice(0, 1);  // Supprime la colonne A
            return row;
          });
          destinationData = destinationData.concat(filteredMagasinData);
          Logger.log("Données extraites avec succès pour l'ID : " + sheetId);
        } else {
          Logger.log("La feuille 'Magasin' n'existe pas dans le fichier Google Sheets avec l'ID : " + sheetId);
        }
      } catch (error) {
        Logger.log("Une erreur s'est produite pour l'ID : " + sheetId + " - " + error);
      }
    }
  }

  // Ajuster chaque ligne de destinationData pour qu'elle ait 11 colonnes
  for (var i = 0; i < destinationData.length; i++) {
    while (destinationData[i].length < 12) {
      destinationData[i].push("");  // Ajouter des cellules vides pour combler les colonnes manquantes
    }
  }

  if (destinationData.length > 0) {
    // Écrire les données ajustées dans "Colle pièces bis" à partir de la ligne 2 (sans toucher à la ligne 1)
    destinationSheet.getRange(2, 1, destinationData.length, 12).setValues(destinationData);
    Logger.log("Toutes les données ont été extraites et cumulées dans Colle pièces bis.");
  } else {
    Logger.log("Aucune donnée n'a été trouvée pour extraire.");
  }
}

function isEmptyRow(row) {
  return row.slice(1, 14).every(cell => !cell || cell === "");
}
