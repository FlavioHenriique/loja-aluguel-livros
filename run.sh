cd aluguel-livros-api;
mvn clean package;
mvn install;
cd ..;
sudo docker-compose build;
sudo docker-compose up -d;
cd aluguel-livros-front;
npm install;
npm start
