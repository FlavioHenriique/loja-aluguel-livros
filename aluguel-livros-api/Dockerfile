FROM openjdk:8-jdk-alpine
ARG JAR_FILE=target/*.jar
COPY target/aluguel-livros-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
