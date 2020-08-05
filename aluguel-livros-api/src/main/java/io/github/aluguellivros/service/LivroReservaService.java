package io.github.aluguellivros.service;

import io.github.aluguellivros.entity.Cliente;
import io.github.aluguellivros.entity.Livro;
import io.github.aluguellivros.entity.LivroReserva;
import io.github.aluguellivros.repository.LivroReservaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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

        if (!livro.isDisponivel())
            throw new Exception("Este livro não está disponível para reserva");

        if (reserva.getDataReserva().compareTo(LocalDate.now()) <=0)
            throw new Exception("Data para reserva inválida");

        livro.setDisponivel(false);
        livroService.salvar(livro);

        reserva.setLivro(livro);

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
        Livro livro = livroService.buscar(reserva.getLivro().getId());
        livro.setDisponivel(true);
        livroService.salvar(livro);
    }

    public List<LivroReserva> listar() throws Exception {
        try{
            return repository.findAll();
        }catch (Exception e){
            throw new Exception("Erro ao listar reservas: " + e.getMessage());
        }
    }

    public List<LivroReserva> listaPeriodoSemanal() throws Exception{
        return listar()
                .stream()
                .filter(l -> ChronoUnit.DAYS.between(l.getDataReserva(), LocalDate.now()) <= l.getQuantidadeDeDias())
                .collect(Collectors.toList());
    }
}
