package io.github.aluguellivros.repository;

import io.github.aluguellivros.entity.Livro;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LivroRepository extends JpaRepository<Livro, Long> {
}
