package io.github.aluguellivros.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Getter
@Setter
public class Livro {
    @Id
    @GeneratedValue
    private long id;
    private String nome;
    private String nomeAutor;
    private int anoPublicacao;
    private boolean disponivel;
}
