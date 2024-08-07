# To Run application

## Start and SSH into Vagrant VM 

```
vagrant up
vagrant ssh servidorWeb
```

## Run consul

```
consul agent -ui -dev -bind=192.168.80.3 -client=0.0.0.0
```

## Run the webApp

```
cd /home/vagrant/frontend
export FLASK_APP=run.py
/usr/local/bin/flask run --host=0.0.0.0 --port 5001
```

## Run the Users Microservice

```
cd /home/vagrant/microUsers
export FLASK_APP=run.py
/usr/local/bin/flask run --host=0.0.0.0 --port 5002
```

## Run the Products Microservice

```
cd /home/vagrant/microProducts
export FLASK_APP=run.py
/usr/local/bin/flask run --host=0.0.0.0 --port 5003
```