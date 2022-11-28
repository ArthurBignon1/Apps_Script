function onEdit(e) {
var s = e.source.getActiveSheet(),
    sheets = ["A", "B", "C"],
    stampCell = e.range.offset(0, -5);
if (sheets.indexOf(s.getName()) == -1 || e.range.columnStart !== 6 || !e.value || stampCell.getValue()) return;
stampCell.setValue(new Date()).setNumberFormat("MM/dd HH:mm:ss")
}
