sudo docker-compose build;
sudo docker-compose up -d;
cd aluguel-livros-api;
mvn clean package;
mvn install;
java -jar target/aluguel-livros-0.0.1-SNAPSHOT.jar 

