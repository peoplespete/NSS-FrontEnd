test( "piglatinize", function() {

  deepEqual(piglatinize("rover"),'overra',"Rover was piglatinized");
});

test( "piggythem", function() {

  deepEqual(piggythem(["rover","dog","man"]),['overra','ogda','anma'],"Rover, dog, and man were piggied");
});