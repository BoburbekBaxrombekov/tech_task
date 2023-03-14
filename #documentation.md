# Source Code on GitHub
https://github.com/BoburbekBaxrombekov/tech_task

# Auth Serive API
1. [ POST ] Sign In       => /signin
    # Body
    {
        "login": "test10",
        "password": "test"
    }

2. [ POST ] Refresh Token => /signin/new_token
3. [ POST ] Sign Up       => /signup
    # Body
    {
        "login": "test10",
        "password": "test"
    }

4. [ GET ]  Info          => /info
5. [ GET ]  Log out       => /logout

# File Service API
1. [ POST ]   File Upload        => /file/upload
    # Form-Data
    [ file ] : [ image ]

2. [ GET ]    Get File List      => /file/list/:list_size?/:page?
3. [ DELETE ] Delete File        => /file/delete/:id
4. [ GET ]    Get One File by ID => /file/:id
5. [ GET ]    Download File      => /file/download/:id
6. [ PUT ]    Update File        => /file/update/:id
    # Form-Data
    [ file ] : [ image ]