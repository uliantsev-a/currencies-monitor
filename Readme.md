## Currencies monitor
The simple apps for periodic upload last prices currencies from https://api.binance.com/
You can familiarize with this api [here](https://github.com/binance-exchange/binance-official-api-docs/)

App include next option:   
- Through Celery worker periodic upload prices (by default each 30 seconds)
- backend app (from Django) with API endpoinds for getting history prices and admin panel for turnoff monitoring one currency.
- web client from Vue.
- Docker config for running the applications together

**Fast way for running:**
```sh 
docker-compose build  
docker-compose up  
```
#### Configure
Fill the `.env` file in project root directory.  
Next variables is example for settings:
```sh
DEBUG=TRUE
POSTGRES_DB=curr_mon
POSTGRES_USER=ps_user
POSTGRES_PASSWORD=ps_user
POSTGRES_HOST=postgres
POSTGRES_PORT=5432
```
If you have outside instance with DB, can disable _postgres_ image in docker-compose.yml  

#### Manual start upload rates
`./manage.py uploadrates`  
_before need set environment variables_  

#### Disable monitoring currency 
For disable some currency from monitoring we have two way:  
1) open admin panel on `/admin/Trade/currency/` URL and unset `monitored` on need currency.  
    _for login you may neeed create user  `./manage.py createsuperuser`_  

2) Upload filled fixture with any currencies with flag `monitores` is False.  
    ```sh 
    python manage.py loaddata Trade/fixtures/initial_currencies.json
    ```  
