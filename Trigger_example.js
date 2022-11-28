--- exemple facile :

function createTimeDrivenTriggers(){

ScriptApp.newTrigger("gs_2_gs_copy_paste")
  .timeBased()
  .everyMinutes(5)
  .create();
}

__________________________________________________________

--- exemple plus difficile :

function createTimeTriggerAtSpecificHourMinute() {
 ScriptApp.newTrigger("gs_2_gs_copy_paste")
   .timeBased()
   .atHour(10)
   .nearMinute(45)
   .everyDays(1)
   .inTimezone("Europe/Paris")
   .create();

 ScriptApp.newTrigger("gs_2_gs_copy_pastea")
   .timeBased()
   .atHour(10)
   .nearMinute(55)
   .everyDays(1)
   .inTimezone("Europe/Paris")
   .create();
}
