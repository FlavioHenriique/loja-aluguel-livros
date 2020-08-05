package io.github.aluguellivros.service;

import io.github.aluguellivros.entity.Cliente;
import io.github.aluguellivros.entity.Livro;
import io.github.aluguellivros.entity.LivroAluguel;
import io.github.aluguellivros.repository.LivroAluguelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class LivroAluguelService {

    @Autowired
    private LivroAluguelRepository repository;
    @Autowired
    private ClienteService clienteService;
    @Autowired
    private LivroService livroService;

    public LivroAluguel alugarLivro(LivroAluguel aluguel) throws Exception {
        Cliente cliente = clienteService.buscar(aluguel.getCliente().getId());
        if (cliente== null){
            throw new Exception("Cliente não encontrado para a reserva");
        }
        Livro livro = livroService.buscar(aluguel.getLivro().getId());
        if (livro == null)
            throw new Exception("Livro não encontrado para a reserva");

        if (!livro.isDisponivel())
            throw new Exception("Este livro não está disponível para aluguel");

        livro.setDisponivel(false);
        livroService.salvar(livro);

        aluguel.setData(LocalDate.now());
        repository.save(aluguel);
        return aluguel;
    }

    public void devolveLivro(long id) throws Exception{
        Optional<LivroAluguel> optional = repository.findById(id);
        if (!optional.isPresent())
            return;
        LivroAluguel livroAluguel = optional.get();
        repository.delete(livroAluguel);
    }

    public List<LivroAluguel> listaTodos(){
        return repository.findAll();
    }
}
