function get_lead_to_send_mails() {
  
  /*
  @output : Liste de liste : info_lead [i] = [lead, vin, brand, model, info, license plate, start]
  */
  
  var sheet_inventory = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Achats');
  var inventory_values = sheet_inventory.getDataRange().getValues();

  var lead_info = []
  
  for (var i =3 ; i < inventory_values.length ; i ++){
  
    var lead = []
    
    if(inventory_values[i][32] == 0 && inventory_values[i][1]!=''){
      
      lead.push(inventory_values[i][1]) //lead
      lead.push(inventory_values[i][2]) //vin 
      lead.push(inventory_values[i][8]) //brand
      lead.push(inventory_values[i][9]) //model
      lead.push(inventory_values[i][10])//info about model
      lead.push(inventory_values[i][3])//license_plate
      lead.push(inventory_values[i][20])//start
      lead_info.push(lead)
      
    
    }
      
  }
  return lead_info
}
/*
function get_info_lead_start_end(){
  
  
  //@output : Liste de liste : info_lead[i] = [lead, vin, brand, model, info, plate, start]
  
  
  var info_lead = get_lead_to_send_mails()
  
  var sheet = SpreadsheetApp.openById('1IBmu7grQ3dcLcvpUPoJVnRm8CdLhUpzPS6I0-sOxGe4').getSheetByName('Inbound')
  
  var values = sheet.getDataRange().getValues()
  
  for (var j = 0 ; j < info_lead.length ; j++){
    
    for (var i =values.length-1; i>2   ; i--){
    
      if(info_lead[j][0]==values[i][1]){
        
        //License plate
        info_lead[j].push(values[i][3])
        //start point
        info_lead[j].push(values[i][8])
        //end point
        info_lead[j].push(values[i][9])
        
        break
      }
    
    }
  
  }
  return info_lead
}
*/
function add_mail_senders_recipients_to_leads(){
  
  /*
  @output : Liste de liste : info_lead[i] = [lead, vin, brand, model, info, plate, start, recipients, senders]
  */
  
  var sheet = SpreadsheetApp.openById('1liW-bXzySBRVOhBCSb4u-wWeI3byJzVmNx-ZbqmaD1c').getSheetByName('AGENCES')
  var values = sheet.getDataRange().getValues()
  
  var info_lead = get_lead_to_send_mails()
  
  for (var i = 0 ; i < info_lead.length ; i++){
    
    for (var j = 0 ; j < values.length ; j++){
    
      if(info_lead[i][6]==values[j][0]){
      
        var senders = values[j][2] + ',' + values[j][3]
        info_lead[i].push(values[j][1])//recipients
        info_lead[i].push(senders)//senders
        Logger.log(senders)
        break 
      }
      
    }
  }
  return info_lead
}

function send_mails_to_agences(){
  
  //include pop up to validate mails to send
  
  var confirmed = ask_confirmation();
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet_log = ss.getSheetByName('Log_email_sending');
  
  if(confirmed==1){
    
    var info_lead = add_mail_senders_recipients_to_leads()

    for (var i = 0 ; i < info_lead.length ; i++){
    
      var senders = info_lead[i][8]
      var recipient = info_lead[i][7]
    
      /*
      info to retrieve here from info_lead
      */
    
      var title = "Réservation AutoHero du lead " + info_lead[i][0].toString() + " : "+ info_lead[i][2].toString() + " " + info_lead[i][3].toString();
      var body = "Bonjour,\n \nLe lead "+ info_lead[i][0].toString() + " : " + info_lead[i][2].toString() + " " + info_lead[i][3].toString() + " a été réservé par AutoHero. Il sera enlevé d'ici 1 à 2 jours ouvrés par notre transporteur DriiveMe ou Hiflow, et vous serez tenus informés du jour et de l'heure exacte.\n \nPouvez-vous :\n- nous confirmer par retour de mail que le véhicule est bien dans votre agence\n- bloquer et garder ce véhicule afin qu'il reste en agence\n- scotcher sur le tableau de bord côté conducteur sous le parebrise le document en pièce jointe\n- le libérer au transporteur Hiflow ou DriiveMe qui se présentera (il aura avec lui un contrat et un état des lieux au nom de DriiveMe ou Hiflow)\n- répondre à ce mail et à tous ses destinataires quand le transporteur sera passé avec une copie de l'état des lieux d'enlèvement et le la CNI du convoyeur\n- laisser les factures et le carnet d'entretien dans le dossier destiné au service administratif\n \nNote: Merci de ne pas oublier de retirer les GPS amovibles / Carte SD de navigation et les intégrer au dossier du véhicule.\n \nEn cas de problème veuillez contacter Kanimana FERHOUH. \n \nemail : kanimana.ferhouh@auto1.com \ntel : +33 6 09 63 71 68\n\nMerci et bonne journée," 
      
      var file = DriveApp.getFileById("1sAINPTKLkGxLc7O4lH4w_CGsj7auMiQJ");
      
      GmailApp.sendEmail(
        recipient,
        title,
        body,
        {
          attachments: [file],
          cc : senders,
          name : "Team Logistique AutoHero",
        })

      sheet_log.appendRow([info_lead[i][0], 1]);
    }
    
  
  // fill_boolean_lead_for_mail_sent(info_lead);
    
  SpreadsheetApp.getActiveSpreadsheet().toast("Emails pushed to agences", 'Up !'); 
    
   
  }else{
    
    SpreadsheetApp.getActiveSpreadsheet().toast("Emails not pushed to agences", 'Up !');
  }
  
}


function ask_confirmation(){
  
  /*
  @output : boolean : Confirmation
  */
  
  
  var confirmed;
  
  var ui = SpreadsheetApp.getUi(); // Same variations.

  var result = ui.alert(
     'Please confirm',
     'Are you sure you want to send emails ?',
      ui.ButtonSet.YES_NO);

  // Process the user's response.
  if (result == ui.Button.YES) {
    // User clicked "Yes".
    ui.alert('Confirmation received.');
    confirmed = 1;
  } else {
    // User clicked "No" or X in the title bar.
    ui.alert('Permission denied.');
    confirmed = 0;
  }
  

  return confirmed
}

function fill_boolean_lead_for_mail_sent(info_lead){
  
  var lead = extract_lead_only(info_lead);
  
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Achats');
  var values = sheet.getDataRange().getValues();
  
  var index = get_last_row_achats();
  
  for(var j = 0 ; j < lead.length ;j ++){
    
    for (var i = index ; i > 2 ; i--){
      
      if(values[i-1][1]==lead[j]){
        
        sheet.getRange(i,33).setValue(1);
        
        break;
        
      }
      
    }
  
  }
  
  
}

function extract_lead_only(info_lead){
 
  var lead = [];
  
  for (var i = 0 ; i <info_lead.length ; i++){
   
    lead[i] = info_lead[i][0]
    
  }
  
 return lead
}

function get_last_row_achats(){
 
  
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Achats');
  var values = sheet.getDataRange().getValues()
  
  var index;
  
  for (var i = 3 ; i < values.length ; i++){
    
    if(values[i][1]==""){
      
      index = i;
      
      break;
    
    }
  
  }
  
  return index 
}

function get_aliases(){
  
  var me = Session.getActiveUser().getEmail();
  var aliases = GmailApp.getAliases();
  
  Logger.log(aliases)
  
}
