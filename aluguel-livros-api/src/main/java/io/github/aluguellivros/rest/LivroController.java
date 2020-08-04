package io.github.aluguellivros.rest;

import ch.qos.logback.core.pattern.util.RegularEscapeUtil;
import io.github.aluguellivros.entity.Livro;
import io.github.aluguellivros.service.LivroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/livro")
@CrossOrigin(origins = "*")
public class LivroController {

    @Autowired
    private LivroService service;

    @PostMapping
    public ResponseEntity<Object> salvar(@RequestBody Livro livro){
        try {
            livro = service.salvar(livro);
            return ResponseEntity.ok(livro);
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping
    public ResponseEntity<Object> atualizar(@RequestBody Livro livro){
        try{
            livro = service.salvar(livro);
            return ResponseEntity.ok(livro);
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("todos")
    public ResponseEntity<Object> listarTodos(){
        try{
            return ResponseEntity.ok(service.listar());
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<Object> buscar(@RequestParam long id){
        try{
            Livro livro = service.buscar(id);
            if (livro == null)
                throw new Exception("Livro não encontrado");
            return ResponseEntity.ok(livro);
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping
    public ResponseEntity<Object> deletar(@RequestParam long id){
        try {
            service.deletar(id);
            return ResponseEntity.ok("");
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
