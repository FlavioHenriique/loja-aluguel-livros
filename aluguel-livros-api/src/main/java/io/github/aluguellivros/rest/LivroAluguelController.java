package io.github.aluguellivros.rest;

import io.github.aluguellivros.entity.LivroAluguel;
import io.github.aluguellivros.service.LivroAluguelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/aluguel")
@CrossOrigin(origins = "*")
public class LivroAluguelController {

    @Autowired
    private LivroAluguelService service;

    @PostMapping
    public ResponseEntity<Object> alugaLivro(@RequestBody LivroAluguel aluguel){
        try{
            aluguel = service.alugarLivro(aluguel);
            return ResponseEntity.ok(aluguel);
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping
    public ResponseEntity<Object> devolveLivro(@RequestParam long id){
        try{
            service.devolveLivro(id);
            return ResponseEntity.ok().build();
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<Object> listaTodos(){
        try{
            return ResponseEntity.ok(service.listaTodos());
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("dashboard")
    public ResponseEntity<Object> dashboardSemanal(){
        try{
            return ResponseEntity.ok(service.listaPeriodoSemanal());
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
