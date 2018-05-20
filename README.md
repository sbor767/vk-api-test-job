# Тестовое задание для Webim.ru 17.05.2018

## Условия

Сделать веб приложение, на выбранном вами языке, при открытии должно показать кнопку «авторизоваться» по нажатию делает oauth авторизацию ВКонтакте, и показывает имя авторизованного пользователя и 5 любых друзей пользователя.

При последующих запусках/заходах на страницу сразу показывает всю информацию т.к. уже понимает, что авторизовано и авторизация запоминается. 

Бекенд если потребуется, на любой технологии на ваш выбор.

## Выбрано

- React.js, бекенд не используется, поскольку в рамках задачи это не требуется. В похожих сценариях работы с различными Web-API может требоваться скрывать ключи доступа к API, и в этом случае бекенд будет необходим, но в данном частном случае apiID приложения ВК не содержит уязвимости.' 

## Dependencies

- NodeJS
- NPM
- YARN

## Environment Variables

Certain environment variables are required to run the server and access data. These should be provided for you and you should place them in a file called `.env` in the root of the repository.

## Working with the Server and Data Locally

In order to run the server locally, you must follow these steps:

- Clone the repository
- Run `yarn install` once you've installed any global dependencies above.
- Add any environment variables above.
- Run `yarn start` - to develop locally.
- Verify it's working by visiting `http://localhost:8080/`.

## Working with the Production

In order to merge changes and restart the server, follow these steps:
- Run `yarn build` - to build for the production (!).

- Next instructions located in build/readme.md
- `cd build`
- `git push origin master`

- `ssh` into the server


## Setup production server

In order to proper work it needs to configure apache to proxy requests and use serve (or node) to run app in production.

- Add any production environment variables above.
- Use *Static server* if appropriate:
  - `npm install -g serve`
  - `serve -s build` // Used port 5000 by default
- More variants see in the https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#deployment
- Setup apache virtual host: (see https://www.1and1.com/cloud-community/learn/application/misc/set-up-a-nodejs-app-for-a-website-with-apache-on-ubuntu-1604/)
  - `sudo a2enmod proxy`
  - `sudo a2enmod proxy_http`
  - `sudo service apache2 restart`
  - add webim-test-job.stripway.ru.conf to /etc/apache2/sites-available/example.com.conf on Ubuntu.
  - Adjust it to right folders, etc.
  - Add the following to VirtualHost command block:
```
     ProxyRequests Off
     ProxyPreserveHost On
     ProxyVia Full
     <Proxy *>
        Require all granted
     </Proxy>
  
     # or /nodejs if node used.
     <Location /serve>  
        # or :8080 if node used.
        ProxyPass http://127.0.0.1:5000
        ProxyPassReverse http://127.0.0.1:5000
     </Location>
```
  - `sudo a2ensite webim-test-job.stripway.ru.conf`
  - `sudo service apache2 restart`
  - Test https://www.webim-test-job.stripway.ru
