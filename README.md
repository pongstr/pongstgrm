Pongstagr.am
==============================================
by Pongstr [twiz.tickler@gmail.com | www.pongstr.com ]

Pongstagr.am is a jquery plugin that lets you display your instagram media to your website.


---------

#### Plugin Requirements

1. jQuery 1.8+
2. bootstrap-modal.js (or bootstrap.js || bootstrap.min.js )


---------

#### Usage:

1. User ID - If you have zero idea what your user id is, you may head to this 
   [link](http://jelled.com/instagram/lookup-user-id).

2. Access Token - If you have zero idea what your access token is, you may head to this
   [link](http://jelled.com/instagram/access-token) make sure you follow the instructions 
   on the ***How do I get my client id?*** link. 

3. **jquery** must be initialised first and so as **bootstrap.js** plugins:

```html
<script src='//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js'></script>
<script src='path/to/js/bootstrap.min.js'></script>  
<script src='path/to/js/pongstagr.am.js'></script>  
```



Display recently uploaded media (displays 8 images):
  
```javascript
$('div#selector').pongstgrm({
    accessId     : YourAccessID,
    accessToken  : YourAccessToken
});
  ```

---------

#### Other options:
  
  
```javascript
show       : null,    // string,  options: 'recent', 'feed', 'liked', 'user'
count      : null,    // integer, options: 1(min) - 40(max), instagram limits the maximum number of photos to 40
pager      : null     // boolean, options:  true or false (enables/disable load more button)
```


---------

#### Usage Example:

```html
<script src='//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js'></script>
<script src='path/to/js/bootstrap-modal.js'></script>  
<script src='path/to/js/pongstagr.am.js'></script>

<script>
  $(document).ready(function(){
    
    $('selector').pongstgrm({
      accessId    : YourAccessID,
      accessToken : YourAccessToken,
      show        : 'liked',
      count       : 8,
      pager       : true
    });
    
  });
</script>
```

---------

#### Acknowledgements 
  
  - **[Bootstrap](http://twitter.github.io/bootstrap/)** is created by [@mdo](http://twitter.com/mdo) & [@fat](http://twitter.com/fat)

---------

**License:**

Free to use, Code license under [Apache v2.0](http://www.apache.org/licenses/LICENSE-2.0).

```
Copyright 2013 &copy; Pongstr Ordillo

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```
