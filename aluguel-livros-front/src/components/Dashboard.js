import React from 'react';
import axios from 'axios';
import { Button } from 'reactstrap';

const urlAluguel = 'http://localhost:8081/aluguel';
const urlReserva = 'http://localhost:8081/reserva';

export default class Dashboard extends React.Component {

    constructor() {
        super();
        this.state = {
            alugueis: [],
            reservas: []
        };

        this.consultaAlugueis();
        this.consultaReservas();
    }

    atualiza() {
        this.consultaAlugueis();
        this.consultaReservas();
    }

    consultaAlugueis() {
        axios.get(urlAluguel + '/dashboard')
            .then(res => {
                let lista = Object.assign([], res.data);
                this.setState({ alugueis: lista });
            })
            .catch(err => {
                alert(err.response.data);
            });
    }

    consultaReservas() {
        axios.get(urlReserva)
            .then(res => {
                let lista = Object.assign([], res.data);
                this.setState({ reservas: lista });
            })
            .catch(err => {
                alert(err.response.data);
            });
    }

    render() {
        return (
            <div>
                <h4>Dashboard de aluguéis semanal</h4>
                <table className="table col-md-8">
                    <thead>
                        <tr>
                            <th>Data de aluguel</th>
                            <th>Valor</th>
                            <th>Livro</th>
                        </tr>
                    </thead>
                    {
                        this.state.alugueis.map((aluguel) => {
                            return <tbody key={aluguel.id}>
                                <tr>
                                    <td>{aluguel.data}</td>
                                    <td>{aluguel.valor}</td>
                                    <td>{aluguel.livro.nome}</td>
                                </tr>
                            </tbody>;
                        })
                    }
                </table>

                <br></br>
                <h4>Dashboard de reservas semanal</h4>
                <table className="table col-md-8">
                    <thead>
                        <tr>
                            <th>Data de reserva</th>
                            <th>Valor</th>
                            <th>Livro</th>
                        </tr>
                    </thead>
                    {
                        this.state.reservas.map((reserva) => {
                            return <tbody key={reserva.id}>
                                <tr>
                                    <td>{reserva.dataReserva}</td>
                                    <td>{reserva.valor}</td>
                                    <td>{reserva.livro.nome}</td>
                                </tr>
                            </tbody>;
                        })
                    }
                </table>

                <br></br>
                <Button color="primary" onClick={this.atualiza.bind(this)}>Atualizar tudo</Button>
            </div>
        );
    }
}
