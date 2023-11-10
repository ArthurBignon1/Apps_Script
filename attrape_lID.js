function extractSheetIdsByKeywords() {
  const FOLDER_ID = "1msXZRA_J-T5XBkzMQPRn-xNomcKV-5Kx"; // ID du dossier contenant les fichiers Google Sheets
  const KEYWORD_COLUMN_INDEX = 3; // Colonne D
  const OUTPUT_COLUMN_INDEX = 5; // Colonne E
  
  var folder = DriveApp.getFolderById(FOLDER_ID);
  var files = folder.getFilesByType(MimeType.GOOGLE_SHEETS);
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName('Leads'); // Remplace getActiveSheet() par getSheetByName('Leads')
  
  // Efface les données des colonnes E à H (plage E2:H)
  sheet.getRange('E2:H').clearContent();
  
  var data = sheet.getDataRange().getValues();
  
  // Stockez tous les noms des fichiers et leurs ID dans un tableau pour éviter de rappeler l'API à chaque itération
  var allFileNames = [];
  while (files.hasNext()) {
    var file = files.next();
    allFileNames.push({
      name: file.getName(),
      id: file.getId()
    });
  }
  
  for (var i = 1; i < data.length; i++) { 
    var keyword = data[i][KEYWORD_COLUMN_INDEX];
    var sheetIds = [];
    
    for (var j = 0; j < allFileNames.length; j++) {
      if (allFileNames[j].name.includes(keyword)) {
        sheetIds.push(allFileNames[j].id);
      }
    }
    
    if (sheetIds.length > 0) {
      sheet.getRange(i + 1, OUTPUT_COLUMN_INDEX, 1, sheetIds.length).setValues([sheetIds]);
    } else {
      sheet.getRange(i + 1, OUTPUT_COLUMN_INDEX).setValue("Aucun fichier trouvé avec le mot clé '" + keyword + "'");
    }
  }
}
