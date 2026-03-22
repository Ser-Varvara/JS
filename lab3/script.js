(function () {
  var names = ["Bill", "John", "Jen", "Jason", "Paul", "Frank", "Steven", "Larry", "Paula", "Laura", "Jim"];

  console.log("Анотація: Якщо ім'я починається на літеру 'j' або 'J', виводимо Goodbye SomeName, інакше – Hello SomeName.");
  for (var i = 0; i < names.length; i++) {
    var firstLetter = names[i].charAt(0).toLowerCase();

    if (firstLetter === 'j') {
      byeSpeaker.speak(names[i]);
    } else {
      helloSpeaker.speak(names[i]);
    }
  }

  console.log("Анотація: Якщо ім'я закінчується на 'a' або 'n', виводимо Special welcome for SomeName, інакше - Regular hello for SomeName.");
  
  for (var i = 0; i < names.length; i++) {
    var name = names[i];
    var asciiSum = 0;

    for (var j = 0; j < name.length; j++) {
      asciiSum += name.charCodeAt(j);
    }

    if (asciiSum > 400) {
      console.log("High-value name: " + name + " (Sum: " + asciiSum + ")");
    } else {
      console.log("Standard name: " + name + " (Sum: " + asciiSum + ")");
    }
  }
})();
