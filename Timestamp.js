function onEdit(e){
  var row = e.range.getRow();
  var col = e.range.getColumn();

  if (col === 10 && row > 1 && e.source.getActiveSheet().getName() === 'Exit Longueil'){
    var time_stamp = Utilities.formatDate(new Date(), "Europe/Paris", 'dd/MM/yyyy HH:mm:ss');
    e.source.getActiveSheet().getRange(row, 12).setValue(time_stamp);
  }
}
// dans la donnée "Col" tu mets la colonne qui servir de donnée qui définira le timestamp (dans cet exemple c'est la colonne n°10)
// dans la donnée "getRange(row, 12)" tu mets la colonne où sera écrit le timestamp (dans cet exemple c'est la colonne n°12)
