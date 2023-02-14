function copySheet()
{
var sourceTable = SpreadsheetApp.openById("1F1Z1ne8wmPaXbpYTzKXJqNsU5vxy5awPaUu44xKlOfU"); // Source file
var srcSheet = sourceTable.getSheetByName("RD2");
var targetTable = SpreadsheetApp.openById("1FyDA830qRJ4OdxuKS3iIMIf3mcSEqpXMkXXloHCfWKY"); // Target file
var tarSheet = targetTable.getSheetByName("Feuille 1");
var srcValues = srcSheet.getDataRange().getValues()
var trimmedValues = srcValues.map(function(row){return[row[0],row[1],row[2],row[9],row[10],row[18],row[27],row[28]];})
tarSheet.getRange("A:Z").clearContent()
tarSheet.getRange(1,1,trimmedValues.length,8).setValues(trimmedValues);
}

___________________

// avec les commentaires :

function copySheet()

{

// Opens the spreadsheet where the data is stored

var sourceTable = SpreadsheetApp.openById("1F1Z1ne8wmPaXbpYTzKXJqNsU5vxy5awPaUu44xKlOfU"); // Source file

//Defines source sheet

var srcSheet = sourceTable.getSheetByName("RD2");

// Opens the destination spreadsheet

var targetTable = SpreadsheetApp.openById("1FyDA830qRJ4OdxuKS3iIMIf3mcSEqpXMkXXloHCfWKY"); // Target file

//Defines destination target sheet

var tarSheet = targetTable.getSheetByName("Feuille 1");

//Retrieves all values from source

var srcValues = srcSheet.getDataRange().getValues()

//For each row in source values,creates new array containing columns A(0), D(3) & E(4) inside of trimedValues array

var trimmedValues = srcValues.map(function(row){return[row[0],row[1],row[2],row[9],row[10],row[18],row[27],row[28]];})

// Save trimmedValues array to destination

tarSheet.getRange("A:Z").clearContent()

tarSheet.getRange(1,1,trimmedValues.length,8).setValues(trimmedValues);

}
