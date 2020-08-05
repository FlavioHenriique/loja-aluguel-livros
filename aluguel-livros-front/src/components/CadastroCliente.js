import React from 'react';
import axios from 'axios';
import { Button } from 'reactstrap';

const url = 'http://localhost:8080/cliente';

export default class CadastroCliente extends React.Component {

    constructor() {
        super();
        this.state = {
            nome: '',
            idade: 0,
            sexo: '',
            id: 0,
            listaClientes: []
        };
        this.listaClientes();
    }

    limpaStateCliente() {
        this.setState({
            nome: '',
            idade: 0,
            sexo: '',
            id: 0
        });
    }

    changeHandler = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    salvar() {
        if (this.state.id > 0) {
            axios.put(url, this.state)
                .then(response => {
                    this.setState(response.data);
                    alert('Cliente atualizado com sucesso');
                    this.listaClientes();
                    this.limpaStateCliente();
                })
                .catch(err => {
                    alert(err.response.data);
                })
        } else {
            // Caso não possua id, deve criar um novo registro
            axios.post(url, this.state)
                .then(response => {
                    this.setState(response.data);
                    alert("Cliente cadastrado com sucesso");
                    this.listaClientes();
                    this.limpaStateCliente();
                })
                .catch(err => {
                    alert(err.response.data);
                });
        }
    }

    listaClientes() {
        axios.get(url + '/todos')
            .then(response => {
                let lista = Object.assign([], response.data);
                this.setState({ listaClientes: lista });
            });
    }

    deletar(id) {
        let urlDelete = url + '?id=' + id;
        axios.delete(urlDelete)
            .then(response => {
                alert('Cliente deletado com sucesso');
                this.listaClientes();
                this.limpaStateCliente();
            })
            .catch(err => {
                alert(err.response.data);
            });
    }

    atualizar(cliente) {
        this.setState(cliente);
    }

    render() {
        return (
            <div>

                <h3>Cadastro de cliente</h3>

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
                        placeholder="Idade"
                        name="idade"
                        value={this.state.idade}
                        onChange={this.changeHandler.bind(this)}
                    />
                    <br></br>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Sexo"
                        name="sexo"
                        value={this.state.sexo}
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
                            <th>Idade</th>
                            <th>Deletar</th>
                            <th>Atualizar</th>
                        </tr>
                    </thead>
                    {
                        this.state.listaClientes.map((cliente) => {
                            return <tbody key={cliente.id}>
                                <tr>
                                    <td>{cliente.id}</td>
                                    <td>{cliente.nome}</td>
                                    <td>{cliente.idade}</td>
                                    <td><Button color="danger" onClick={() => this.deletar(cliente.id)}>Deletar</Button></td>
                                    <td><Button color="primary" onClick={() => this.atualizar(cliente)}>Atualizar</Button></td>
                                </tr>
                            </tbody>;
                        })
                    }
                </table>
            </div>
        );
    }
}