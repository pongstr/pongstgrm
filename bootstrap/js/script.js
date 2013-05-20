

$(window).load(function(){
  
  "use strict";

  var $id = '39666111',
      $tk = '39666111.1fb234f.c3901000b4944a549fd5fd2310c63780';
  
  $('#recent').pongstgrm({
    accessId: $id,
    accessToken: $tk,
    count: 4
  });

  $('#liked').pongstgrm({
    accessId: $id,
    accessToken: $tk,
    show: 'liked',
    count: 4
  });

  $('#feed').pongstgrm({
    accessId: $id,
    accessToken: $tk,
    show: 'feed',
    count: 4
  });
  
});