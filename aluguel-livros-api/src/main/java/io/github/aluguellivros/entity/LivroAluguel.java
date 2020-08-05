package io.github.aluguellivros.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Getter
@Setter
public class LivroAluguel {

    @Id
    @GeneratedValue
    private long id;
    @ManyToOne
    private Cliente cliente;
    @ManyToOne
    private Livro livro;
    private LocalDate data;
    private BigDecimal valor;
}