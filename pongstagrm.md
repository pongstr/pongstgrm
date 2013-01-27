pongstagrm namespace
====================

  ## Options:
  1. user_id
  2. access_token
  3. show
  4. media_count
  
  ## Functions:
  1. load_content
  2. load_more
  3. ajx
  
  ### Function Details
  1. load_content
     - this function basically loads the specified display type
       set on the options 'display_type'.
     - the switch function determines the specific 'endpoint' that
       will be requested.
  2. ajx 
     - this function lives inside load_content.
     - it is responsible for requesting data using the
       'endpoint' specified by the load_content's content_type variable.