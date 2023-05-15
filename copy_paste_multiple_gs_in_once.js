function scrapeDataFromMultipleSheets() {
  var sourceSheetId = "10DGWktrJcYz-8zl-CdUK8DIlOBBPO-r0zkicXVkRiHQ"; // ID de la feuille contenant les IDs des autres feuilles
  var sourceColumn = "B"; // Colonne contenant les IDs des feuilles
  var startingRow = 2; // Numéro de la première ligne contenant les IDs (en supposant que la première ligne soit l'en-tête)
  var destinationSheetId = "10DGWktrJcYz-8zl-CdUK8DIlOBBPO-r0zkicXVkRiHQ"; // ID de la feuille de destination
  var destinationCell = "A1"; // Cellule pour coller les données

  var destinationSheet = SpreadsheetApp.openById(destinationSheetId).getSheetByName("Feuille 2");
  var sourceSheet = SpreadsheetApp.openById(sourceSheetId).getSheetByName("Control_board");
  var lastRow = sourceSheet.getLastRow();
  var sourceIds = sourceSheet.getRange(sourceColumn + startingRow + ":" + sourceColumn + lastRow).getValues();

  for (var i = 0; i < sourceIds.length; i++) {
    var sourceId = sourceIds[i][0];
    var sheet = SpreadsheetApp.openById(sourceId).getSheetByName("All Categories");
    var data = sheet.getRange("E4").getValue();
    destinationSheet.getRange(destinationCell).offset(i, 0).setValue(data);
  }
}
