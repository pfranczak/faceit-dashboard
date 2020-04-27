# faceit-dashboard
Project scope:
https://docs.google.com/document/d/1p1qc_U-KFX6IqyKMmMTsbVo78aznNfLPhrvPueTVBVI/edit?usp=sharing
## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Login flows in application

![alt text](login-flow.png)

#### There are two ways for user to login

1.Using faceit api

    - User is redirected to facte it website
    - After succesfull authetication user is redirected back to the website

2.Using Steam api

    -  User is redirected to steam api by cutom backend server
    -  After succesfull authetication user is redirected back to backend server, which created a cookie and redirects user back to the SPA frontend application with the cookie.


After one of the above methods is used requests to the api can be made on behalf of the user.



