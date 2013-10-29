Pongstagr.am
============

![v3.0 Home Screen](http://pongstr.com/projects/pongstagr.am/v3.0-screen.png)

Pongstagr.am is a jquery plugin that lets you display your instagram media to your website with the help of Bootstrap Front-end.

-----------

#### REQUIREMENTS:

1. Instagram Account [```user id``` &amp; ```access token`` ]
2. Jquery 1.10.x
3. Bootstrap v3.x [plugin-only coming in the future]


#### USAGE:

```html
<!-- Initialize stylesheets to header -->
<link rel="stylesheet" href="/path/to/css/bootstrap.css">
<link rel="stylesheet" href="/path/to/css/pongstagr.am.css">
 
<!-- Initialize Javascripts to footer -->
<script href="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.js"></script>
<script href="/path/to/js/boostrap.js"></script>
<script href="/path/to/js/pongstagr.am.js"></script>
```

```html
<script>
$(document).ready(function () {
 
  $('#selector').pongstgrm({
    accessId:     'YOUR-ACCESS-ID',
    accessToken:  'YOUR-ACCESS-TOKEN'
  });
 
});
</script>
```

#### OTHER OPTIONS:

```javascript
  show   : null, // string,  options: 'recent', 'feed', 'liked', 'user', 'any tags'
  count  : null, // integer, options: 1(min) - 40(max), instagram limits the maximum number of photos to 40
  pager  : null  // boolean, options:  true or false (enables/disable load more button)
```


-----------

1. **[Bootstrap](http://github.com/twbs/bootstrap/)** was created by [@mdo](http://twitter.com/mdo/) &amp; [@fat](http://twitter.com/fat) licensed under [Apache 2 License](https://github.com/twbs/bootstrap/blob/master/LICENSE).
2. **[Bootstrap-sass](https://github.com/thomas-mcdonald/bootstrap-sass)** was created by [Thomas McDonald](https://github.com/thomas-mcdonald/) licensed under [Apache 2 License](https://github.com/thomas-mcdonald/bootstrap-sass/blob/master/LICENSE).
