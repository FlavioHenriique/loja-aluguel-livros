package io.github.aluguellivros.service;

import io.github.aluguellivros.entity.Cliente;
import io.github.aluguellivros.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.ConcurrentLinkedDeque;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository repository;

    public Cliente salvar(Cliente cliente) throws Exception {
        try {

            repository.save(cliente);
            return cliente;
        }catch (Exception e){
            throw new Exception("Erro ao salvar cliente: " + e.getMessage());
        }
    }

    public Cliente buscar(long id){
        Optional<Cliente> optional = repository.findById(id);
        return optional.isPresent() ? optional.get() : null;
    }

    public void deletar(long id) throws Exception {
        try{
            Cliente cliente = buscar(id);
            if (cliente == null)
                throw new Exception("Cliente de código " + id + " não encontrado!");

            repository.delete(cliente);
        }catch (Exception e){
            throw new Exception("Erro ao deletar cliente: " + e.getMessage());
        }
    }

    public List<Cliente> listar() throws Exception{
        try{
            return repository.findAll();
        }catch (Exception e){
            throw new Exception("Erro ao consultar clientes: " + e.getMessage());
        }
    }
}
