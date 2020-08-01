package io.github.aluguellivros.repository;

import io.github.aluguellivros.entity.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {
}
