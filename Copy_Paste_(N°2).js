function CopyDataToNewFile() {
  var sss = SpreadsheetApp.openById('1K5dZpH1dxQy5CXzJLo0TQ1u3zYS4b1u3j-gZPWVIlOM'); // sss = source spreadsheet
  var ss = sss.getSheetByName('Notes annonces'); // ss = source sheet
  //Get full range of data
  var SRange = ss.getDataRange();
  //get A1 notation identifying the range
  var A1Range = SRange.getA1Notation();
  //get the data values in range
  var SData = SRange.getValues();

  var tss = SpreadsheetApp.openById('1RHz-OOz43WWcJJ8yd6YDY0Wnh6hOKD0dT-MEtLE7FNA'); // tss = target spreadsheet
  var ts = tss.getSheetByName('Feuille 1'); // ts = target sheet
  //set the target range to the values of the source data
  ts.getRange(A1Range).setValues(SData);

}  
