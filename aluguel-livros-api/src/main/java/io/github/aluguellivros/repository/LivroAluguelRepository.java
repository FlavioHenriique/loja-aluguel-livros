package io.github.aluguellivros.repository;

import io.github.aluguellivros.entity.LivroAluguel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LivroAluguelRepository extends JpaRepository<LivroAluguel, Long> {
}
