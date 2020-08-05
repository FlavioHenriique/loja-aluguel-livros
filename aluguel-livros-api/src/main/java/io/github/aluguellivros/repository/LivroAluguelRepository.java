package io.github.aluguellivros.repository;

import io.github.aluguellivros.entity.Livro;
import io.github.aluguellivros.entity.LivroAluguel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface LivroAluguelRepository extends JpaRepository<LivroAluguel, Long> {
}
