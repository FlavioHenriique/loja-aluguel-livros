package io.github.aluguellivros.service;

import io.github.aluguellivros.entity.Livro;
import io.github.aluguellivros.repository.LivroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LivroService {

    @Autowired
    private LivroRepository repository;

    public Livro salvar(Livro livro) throws Exception {
        try {
            if ("".equals(livro.getNome()) || "".equals(livro.getNomeAutor())
                    || livro.getAnoPublicacao() == 0){
                throw new Exception("É necessário preencher todos os dados para cadastar um livro.");
            }
            repository.save(livro);
            return livro;
        }catch (Exception e){
            throw new Exception("Erro ao salvar Livro: " + e.getMessage());
        }
    }

    public Livro buscar(long id){
        Optional<Livro> optional = repository.findById(id);
        return optional.isPresent() ? optional.get() : null;
    }

    public void deletar(long id) throws Exception {
        try{
            Livro livro = buscar(id);
            if (livro == null)
                throw new Exception("Livro de código " + id + " não encontrado!");

            repository.delete(livro);
        }catch (Exception e){
            throw new Exception("Erro ao deletar Livro: " + e.getMessage());
        }
    }

    public List<Livro> listar() throws Exception{
        try{
            return repository.findAll();
        }catch (Exception e){
            throw new Exception("Erro ao consultar Livros: " + e.getMessage());
        }
    }
}
