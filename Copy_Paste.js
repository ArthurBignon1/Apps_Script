function copyPaste(src_gs_id, src_s_name, tgt_gs_id, tst_s_name) {
var gs = SpreadsheetApp.openById(src_gs_id);
 var src_sheet = gs.getSheetByName(src_s_name);
    var range_src_sheet = src_sheet.getDataRange();
    var data = range_src_sheet.getValues();
    var src_last_row = range_src_sheet.getLastRow();
    var src_last_col = range_src_sheet.getLastColumn();

    var dest_gs = SpreadsheetApp.openById(tgt_gs_id);
    var target = dest_gs.getSheetByName(tst_s_name)
    target.clearContents() //clear old data. Remove this if you wanna stack your data.
    target.getRange(target.getLastRow() + 1, 1, src_last_row, src_last_col).setValues(data);
}

function gs_2_gs_copy_paste() {
    // Change the following values (Lines 18 to 21) according to your requirement.
    // src --> source, tgt --> target
    var src_gs_id = '1YAYaqSV4I7RRZ4XrANjtNxjQrpLFMyDPIeMlX-_WbdU'
    var src_s_name = 'RD2'
    var tgt_gs_id = '1liW-bXzySBRVOhBCSb4u-wWeI3byJzVmNx-ZbqmaD1c'
    var tst_s_name = 'RD2'
    copyPaste(src_gs_id, src_s_name, tgt_gs_id, tst_s_name)
}

// ATTENTION!!! -> il faut executer la fonction gs_2_gs_copy_paste dans le bouton "sélectionnez la fonction à exécuter", ça ne sert à rien d'exécuter la première fonction!!
