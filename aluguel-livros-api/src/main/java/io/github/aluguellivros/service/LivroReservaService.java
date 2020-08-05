package io.github.aluguellivros.service;

import io.github.aluguellivros.entity.Cliente;
import io.github.aluguellivros.entity.Livro;
import io.github.aluguellivros.entity.LivroReserva;
import io.github.aluguellivros.repository.LivroReservaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LivroReservaService {

    @Autowired
    private LivroReservaRepository repository;
    @Autowired
    private ClienteService clienteService;
    @Autowired
    private LivroService livroService;

    public LivroReserva realizaReserva(LivroReserva reserva) throws Exception {
        Cliente cliente = clienteService.buscar(reserva.getCliente().getId());
        if (cliente== null){
            throw new Exception("Cliente não encontrado para a reserva");
        }
        Livro livro = livroService.buscar(reserva.getLivro().getId());
        if (livro == null)
            throw new Exception("Livro não encontrado para a reserva");

        repository.save(reserva);
        return reserva;
    }

    public LivroReserva buscar(long id){
        Optional<LivroReserva> optional = repository.findById(id);
        return optional.isPresent() ? optional.get() : null;
    }

    public void cancelaReserva(long id) throws Exception{
        LivroReserva reserva = buscar(id);
        if (reserva == null)
            throw new Exception("Reserva não encontrada com id " + id);
        repository.delete(reserva);
    }

    public List<LivroReserva> listar() throws Exception {
        try{
            return repository.findAll();
        }catch (Exception e){
            throw new Exception("Erro ao listar reservas: " + e.getMessage());
        }
    }
}
