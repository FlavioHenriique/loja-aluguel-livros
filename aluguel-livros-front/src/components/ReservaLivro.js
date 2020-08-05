import React from 'react';
import axios from 'axios';
import { Button } from 'reactstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const url = 'http://localhost:8080/reserva';

export default class ReservaLivro extends React.Component {

    constructor() {
        super();

        this.state = {
            livro: {
                id: 0
            },
            cliente: {
                id: 0
            },
            quantidadeDeDias: 0,
            valor: 0.0,
            dataReserva: '',
            id: 0,
            listaReservas: []
        };
        this.listaReservas();
    }

    limpaStateReserva() {
        this.setState({
            livro: {
                id: 0
            },
            cliente: {
                id: 0
            },
            quantidadeDeDias: 0,
            valor: 0.0,
            dataReserva: '',
            id: 0
        });
    }

    dateChangeHandler = date => {
        this.setState({ dataReserva: date.target.value });
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

    listaReservas() {
        axios.get(url)
            .then(response => {
                let lista = Object.assign([], response.data);
                this.setState({ listaReservas: lista });
            })
            .catch(err => {
                alert(err.response.data);
            });
    }

    salvar() {
        axios.post(url, this.state)
            .then(res => {
                this.setState(res.data);
                alert('Reserva realizada com sucesso');
                this.listaReservas();
                this.limpaStateReserva();
            })
            .catch(err => {
                alert(err.response.data);
            });
    }

    deletar(id) {
        let urlDelete = url + '?id=' + id;
        axios.delete(urlDelete)
            .then(res => {
                this.listaReservas();
                this.limpaStateReserva();
                alert('Reserva deletada com sucesso');
            })
            .catch(err => {
                alert(err.res.data);
            })
    }

    atualizar(reserva) {
        this.setState(reserva);
        this.setState({ dataReserva: reserva.dataReserva });
    }

    render() {
        return (
            <div>
                <h3>Reserva de livros</h3>
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
                    <label htmlFor="dias">Quantidade de dias de utilização</label>
                    <input
                        className="form-control"
                        type="number"
                        name="quantidadeDeDias"
                        value={this.state.quantidadeDeDias}
                        onChange={this.changeHandler.bind(this)}
                    />
                    <label htmlFor="valor">Valor da reserva</label>
                    <input
                        className="form-control"
                        type="number"
                        name="valor"
                        value={this.state.valor}
                        onChange={this.changeHandler.bind(this)}
                    />

                    <label htmlFor="dataReserva">Data da reserva</label>
                    <br></br>
                    <input type="date"
                        value={this.state.dataReserva}
                        className="form-control"
                        name="dataReserva"
                        onChange={this.dateChangeHandler}
                    />
                    <br></br>
                    <Button color="primary" onClick={this.salvar.bind(this)}>Salvar</Button>
                    <br></br>
                    <hr></hr>
                    <h5>Reservas realizadas</h5>

                    <table className="table col-md-8">
                        <thead>
                            <tr>
                                <th>Id Reserva</th>
                                <th>Id Cliente</th>
                                <th>Id livro</th>
                                <th>Deletar</th>
                            </tr>
                        </thead>
                        {
                            this.state.listaReservas.map((reserva) => {
                                return <tbody key={reserva.id}>
                                    <tr>
                                        <td>{reserva.id}</td>
                                        <td>{reserva.cliente.id}</td>
                                        <td>{reserva.livro.id}</td>
                                        <td><Button color="danger" onClick={() => this.deletar(reserva.id)}>Cancela reserva</Button></td>
                                    </tr>
                                </tbody>;
                            })
                        }
                    </table>

                </form>
            </div>
        );

    }
}