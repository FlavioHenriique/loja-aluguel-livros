import React from 'react';
import axios from 'axios';
import { Button } from 'reactstrap';

const url = 'http://localhost:8081/aluguel';

export default class AlugaLivro extends React.Component {

    constructor() {
        super();
        this.state = {
            livro: {
                id: 0
            },
            cliente: {
                id: 0
            },
            valor: 0.0,
            id: 0,
            dias: 0,
            listaAlugueis: []
        };
        this.listaAlugueis();
    }

    limpaStateAluguel() {
        this.setState({
            livro: {
                id: 0
            },
            cliente: {
                id: 0
            },
            valor: 0.0,
            id: 0,
            dias: 0
        });
    }

    salvar() {
        axios.post(url, this.state)
            .then(res => {
                this.setState(res.data);
                alert('Aluguel realizado com sucesso');
                this.listaAlugueis();
                this.limpaStateAluguel();
            })
            .catch(err => {
                alert(err.response.data);
            });
    }

    deletar(id) {
        let urlDelete = url + '?id=' + id;
        axios.delete(urlDelete)
            .then(res => {
                this.listaAlugueis();
                this.limpaStateAluguel();
                alert('Aluguel deletado com sucesso');
            })
            .catch(err => {
                alert(err.res.data);
            })
    }


    listaAlugueis() {
        axios.get(url)
            .then(res => {
                let lista = Object.assign([], res.data);
                this.setState({ listaAlugueis: lista });
            })
            .catch(err => {
                alert(err.response.data);
            });
    }

    changeHandler = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    clienteChangeHandler = idCliente => {
        this.setState({
            cliente: {
                id: idCliente.target.value
            }
        });
    }

    livroChangeHandler = idLivro => {
        this.setState({
            livro: {
                id: idLivro.target.value
            }
        });
    }

    render() {
        return (
            <div>
                <h3>Aluguel de livros</h3>
                <form className="form-group col-md-8">
                    <label htmlFor="idCliente">Id do Cliente</label>
                    <input
                        className="form-control"
                        type="number"
                        name="idCliente"
                        value={this.state.cliente.id}
                        onChange={this.clienteChangeHandler.bind(this)}
                    />
                    <label htmlFor="idLivro">Id do Livro</label>
                    <input
                        className="form-control"
                        type="number"
                        name="idLivro"
                        value={this.state.livro.id}
                        onChange={this.livroChangeHandler.bind(this)}
                    />

                    <label htmlFor="dias">Quantidade de dias de uso</label>
                    <input
                        className="form-control"
                        type="number"
                        name="dias"
                        value={this.state.dias}
                        onChange={this.changeHandler.bind(this)}
                    />

                    <label htmlFor="valor">Valor do aluguel</label>
                    <input
                        className="form-control"
                        type="number"
                        name="valor"
                        value={this.state.valor}
                        onChange={this.changeHandler.bind(this)}
                    />

                    <Button color="primary" onClick={this.salvar.bind(this)}>Salvar</Button>
                </form>

                <br></br>
                <hr></hr>
                <h5>Aluguéis realizados</h5>

                <table className="table col-md-8">
                    <thead>
                        <tr>
                            <th>Id Aluguel</th>
                            <th>Id Cliente</th>
                            <th>Id livro</th>
                            <th>Deletar</th>
                        </tr>
                    </thead>
                    {
                        this.state.listaAlugueis.map((aluguel) => {
                            return <tbody key={aluguel.id}>
                                <tr>
                                    <td>{aluguel.id}</td>
                                    <td>{aluguel.cliente.id}</td>
                                    <td>{aluguel.livro.id}</td>
                                    <td><Button color="danger" onClick={() => this.deletar(aluguel.id)}>Devolve livro</Button></td>
                                </tr>
                            </tbody>;
                        })
                    }
                </table>
            </div>
        );
    };
}