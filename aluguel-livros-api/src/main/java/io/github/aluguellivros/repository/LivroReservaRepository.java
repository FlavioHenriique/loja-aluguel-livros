package io.github.aluguellivros.repository;

import io.github.aluguellivros.entity.LivroReserva;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LivroReservaRepository extends JpaRepository<LivroReserva, Long> {
}
