Pongstagr.am - jQuery Instagram Plugin v1.0
===========================================
by Pongstr [twiz.tickler@gmail.com | www.pongstr.com ]
Free to use under the MIT license.
http://www.opensource.org/licenses/mit-license.php

Pongstagr.am is a jQuery plugin that lets you display your Instagram photos to your website.
It uses Instagram API and Zurb's Reveal Modal.

## How to Use ##

 + Step 1: Open the file js/pongstagr.am.js and begin modifying values on line: 31

           If you have zero idea what your user id is, you may head to this link
           http://jelled.com/instagram/lookup-user-id 

           e.g.,  user_id  =  "39666111";

 + Step 2: On Line: 42, add your Instagram Accesss Token

           If you have zero idea what your access token is, you may head to this
           link: http://jelled.com/instagram/access-token make sure you follow 
           the instructions on the " How do I get my client id?" link.

           e.g., access_token = "39666111.1fb234f.c3901000b4944a549fd5fd2310c63780";

 + Step 3: On Line: 52, you must set how many pictures you would like to display. This also 
           depends on how many pictures you have in your instagram account.

           e.g., display_count = "200"; 

 + Step 4: On Line: 62, you may set your Target Placeholder. This is the Target 
           selector of your div in your html where the images will appear. 
           You must include the '#' or '.' before the selector name.

           e.g., placeholder = "#instagram";

 + Step 5: On Line: 74, you may set each image's container css class. This is the selector 
           where each image and image info will be placed this must be a pseudo selector 
           ( it will be a wrong markup if it was an ID selector), No need to include 
           the '.' at the beginning of the selector name. 

           e.g.,   divClass = "imageBlock";

 + Step 6: On Line: 84, you may decide whether or not to display your Instagram user info,
           by setting the value 'True' or 'False'.

           e.g., displayUserInfo = true;


And that's it! You're all set. You may change the stylesheet ( css/style.css ), anyway you
want, if you'd like to extend it further just start playing on Line: 87


### Special Thanks to: ### 
 + Benjamin Bjurstrom [ http://jelled.com/ ] for providing awesome tools to get your Instagram ID and Access Tokens
 + GAPiangco          [ http://www.gapiangco.com/ ] for the Javascript assistance.

I'm still learning about Javascript and jQuery and this is my first time to publish my 
work for public use, so I may learn how to do things the right way and improve on these. 
Thanks a lot! Cheers!


