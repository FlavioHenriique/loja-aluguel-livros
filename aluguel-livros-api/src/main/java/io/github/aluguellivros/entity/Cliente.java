package io.github.aluguellivros.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Getter
@Setter
public class Cliente {
    @Id
    @GeneratedValue
    private long id;
    private String nome;
    private int idade;
    private String sexo;
}
