(function () {
  var names = ["Bill", "John", "Jen", "Jason", "Paul", "Frank", "Steven", "Larry", "Paula", "Laura", "Jim"];

  console.log("--- Основне завдання: перевірка на літеру 'J' ---");
  for (var i = 0; i < names.length; i++) {
    var firstLetter = names[i].charAt(0).toLowerCase();

    if (firstLetter === 'j') {
      byeSpeaker.speak(names[i]);
    } else {
      helloSpeaker.speak(names[i]);
    }
  }

  console.log("\n--- Додаткове завдання: перевірка за останньою літерою ---");
  console.log("Анотація: Якщо ім'я закінчується на 'a' або 'n', виводимо особливе повідомлення.");
  
  for (var i = 0; i < names.length; i++) {
    var lastLetter = names[i].charAt(names[i].length - 1).toLowerCase();
    
    if (lastLetter === 'a' || lastLetter === 'n') {
      console.log("Special welcome for " + names[i]);
    } else {
      console.log("Regular hello for " + names[i]);
    }
  }
})();
