import React from 'react';
import axios from 'axios';
import { Button } from 'reactstrap';

const url = 'http://localhost:8081/livro';

export default class CadastroLivro extends React.Component {

    constructor() {
        super();
        this.state = {
            nome: '',
            anoPublicacao: 0,
            nomeAutor: '',
            id: 0,
            listaLivros: []
        };
        this.listaLivros();
    }

    changeHandler = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    listaLivros() {
        axios.get(url + '/todos')
            .then(response => {
                let lista = Object.assign([], response.data);
                this.setState({ listaLivros: lista });
            });
    }

    salvar() {
        // Se possui id, então deve atualizar o livro
        if (this.state.id > 0) {
            axios.put(url, this.state)
                .then(response => {
                    this.setState(response.data);
                    alert('Livro atualizado com sucesso');
                    this.listaLivros();
                    this.limpaStateLivro();
                })
                .catch(err => {
                    alert(err.response.data);
                });
        } else {
            // Caso não possua id, deve criar um novo registro
            axios.post(url, this.state)
                .then(response => {
                    this.setState(response.data);
                    alert("Livro cadastrado com sucesso");
                    this.listaLivros();
                    this.limpaStateLivro();
                })
                .catch(err => {
                    alert(err.response.data);
                });
        }
    }

    deletar(id) {
        let urlDelete = url + '?id=' + id;
        axios.delete(urlDelete)
            .then(response => {
                alert('Livro deletado com sucesso');
                this.listaLivros();
                this.limpaStateLivro();
            })
            .catch(err => {
                alert(err.response.data);
            });
    }

    atualizar(livro) {
        this.setState(livro);
    }

    limpaStateLivro() {
        console.log("limpando state");
        this.setState({
            nome: '',
            anoPublicacao: 0,
            nomeAutor: '',
            id: 0
        });
    }

    render() {
        return (
            <div>

                <h3>Cadastro de Livro</h3>
                <form className="form-group col-md-8">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Nome"
                        name="nome"
                        value={this.state.nome}
                        onChange={this.changeHandler.bind(this)}
                    />
                    <br></br>
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Ano de publicação"
                        name="anoPublicacao"
                        value={this.state.anoPublicacao}
                        onChange={this.changeHandler.bind(this)}
                    />
                    <br></br>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Nome do autor"
                        name="nomeAutor"
                        value={this.state.nomeAutor}
                        onChange={this.changeHandler.bind(this)}
                    />
                    <br></br>
                    <Button color="primary" onClick={this.salvar.bind(this)}>Salvar</Button>
                </form>
                <br></br>

                <h3>Livros cadastrados</h3>
                <table className="table col-md-8">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nome</th>
                            <th>Nome Autor</th>
                            <th>Deletar</th>
                            <th>Atualizar</th>
                        </tr>
                    </thead>
                    {
                        this.state.listaLivros.map((livro) => {
                            return <tbody key={livro.id}>
                                <tr>
                                    <td>{livro.id}</td>
                                    <td>{livro.nome}</td>
                                    <td>{livro.nomeAutor}</td>
                                    <td><Button color="danger" onClick={() => this.deletar(livro.id)}>Deletar</Button></td>
                                    <td><Button color="primary" onClick={() => this.atualizar(livro)}>Atualizar</Button></td>
                                </tr>
                            </tbody>;
                        })
                    }
                </table>
            </div >
        );
    };
}