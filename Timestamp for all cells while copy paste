function onEdit(e) {
  var s = SpreadsheetApp.getActiveSheet();
  var r = e.range;
  var firstRow = r.getRow();
  var numRows = r.getNumRows();
  var firstCol = r.getColumn();
  var lastCol = r.getLastColumn();
  if((firstCol <= 3 || lastCol >= 3) && s.getName() == 'Sheet1') {
    var emptyRange = r.getValues().every(row => row.every(value => value === ""));
    var destRange = s.getRange(firstRow, 6, numRows);
    if (emptyRange) destRange.clearContent();
    else {
      var dates = new Array(numRows).fill([new Date()]);
      destRange.setValues(dates).setNumberFormat("MM/dd/yyyy hh:mm");
    }
  }
}
