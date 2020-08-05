package io.github.aluguellivros.entity;

import ch.qos.logback.core.net.server.Client;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Getter
@Setter
public class LivroReserva {

    @Id
    @GeneratedValue
    private long id;
    @ManyToOne(cascade = CascadeType.MERGE)
    private Livro livro;
    @ManyToOne
    private Cliente cliente;
    private int quantidadeDeDias;
    private BigDecimal valor;
    private LocalDate dataReserva;
}