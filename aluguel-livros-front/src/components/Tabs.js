import React, { useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import CadastroLivro from './CadastroLivro';
import CadastroCliente from './CadastroCliente';
import ReservaLivro from './ReservaLivro';
import AlugaLivro from './AlugaLivro';
import Dashboard from './Dashboard';

const Tabs = (props) => {
    const [activeTab, setActiveTab] = useState('1');

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }

    return (
        <div>
            <Nav tabs>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '1' })}
                        onClick={() => { toggle('1'); }}>
                        Livro
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '2' })}
                        onClick={() => { toggle('2'); }}>
                        Cliente
                    </NavLink>
                </NavItem>

                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '2' })}
                        onClick={() => { toggle('3'); }}>
                        Reserva de Livros
                    </NavLink>
                </NavItem>

                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '2' })}
                        onClick={() => { toggle('4'); }}>
                        Aluguel de Livros
                    </NavLink>
                </NavItem>


                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '2' })}
                        onClick={() => { toggle('5'); }}>
                        Dashboards
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                    <CadastroLivro />
                </TabPane>
                <TabPane tabId="2">
                    <CadastroCliente />
                </TabPane>
                <TabPane tabId="3">
                    <ReservaLivro />
                </TabPane>
                <TabPane tabId="4">
                    <AlugaLivro />
                </TabPane>
                <TabPane tabId="5">
                    <Dashboard />
                </TabPane>
            </TabContent>
        </div>
    );
}

export default Tabs;
