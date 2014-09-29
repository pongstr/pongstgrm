pongstagram.js
--------------

pongstagram.js is a jQuery plguin that lets you display instagram media to your website.

### Here's how:

Download latest here or install via Bower `$ bower install pongstagr.am`

```html
<!doctype html>
<html lang="en">
<head>

  <meta charset="utf-8">
  <title>My Website</title>

  <!-- IMPORTANT: Add pongstagram.js stylesheet -->
  <link href="/path/to/pongstagram.css" rel="stylesheet">

</head>
<body>

  <div id="selector"></div>

  <!-- IMPORTANT: Add jQuery Library -->
  <script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>

  <!-- IMPORTANT: Add pongstagram.js plugin -->
  <script src="/path/to/pongstagram.js"></script>

  <!-- Now let's call on the plugin: -->
  <script>
    $(document).ready(function () {

      $('#selector').pongstagrm({
        accessId:     'YOUR-ACCESS-ID',
        accessToken:  'YOUR-ACCESS-TOKEN'   //
      });

    });
  </script>
</body>
</html>
```

### Pre-requisite

Well, of course you need an Instagram Account, you can sign up [here](https://instagram.com/accounts/login/).

Once you're set with an account, you'll need to register a new client [here](http://instagram.com/developer/clients/register/)
fill up the necessary fields and jump on to this [link](http://jelled.com/instagram/access-token)
and follow the steps to acquire an `access_token`.

### Basic Usage

> Basic usage displays 4 of your recent media.

```javascript
$('#selector').pongstagrm({
  accessId:     'YOUR-ACCESS-ID',
  accessToken:  'YOUR-ACCESS-TOKEN'
});
```

### Default Options

```javascript
{
    // display options
    , count:       8              // integer: default number of media to be displayed initially
    , likes:       true           // boolean: show/hide likes count
    , comments:    true           // boolean: show/hide comments
    , timestamp:   true           // boolean: show/hide media timestamp
    , show:       'recent'        // string:  possible options are feed, likes, media, profile and tag

    // plugin components
    , btn_like:           true      // boolean: show/hide like button
    , btn_mute:           true      // boolean: show/hide mute button (for video)
    , btn_comment:        true      // boolean: show/hide comment field
    , profile_bg_img:     null      // string:  valid image uri
    , profile_picture:    64        // integer: profile picture dimensions e.g., (128 == 128x128 pixels)
    , profile_bg_color:   '#d9534f' // string: hex value of profile's background-color
}
```
