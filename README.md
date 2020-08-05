## Loja de aluguel de livros

O projeto foi desenvolvido com as seguintes tecnologias:
- Banco de dados Postgresql;
- API Rest com Spring Boot;
- Front-end com ReactJS;
- Docker para separação em containers e build do projeto;

### Executando a aplicação

Para executar o projeto, é necessário ter instalado o docker, docker-compose e o react na sua máquina.

Execute o seguinte comando:
> sudo sh run.sh

O arquivo run.sh contém os scripts para inicializar toda a aplicação. 
Primeiro, ele irá compilar o projeto Spring Boot. 
Após isso, irá criar dois containers Docker, um para o banco de dados e outro para a API Rest.
Após isso, será construido o projeto do front-end com React, em seguida será executado.

Para abrir o front-end, deve ser aberto o  seguinte host no browser:
localhost:3000
