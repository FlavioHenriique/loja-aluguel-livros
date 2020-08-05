package io.github.aluguellivros.rest;

import io.github.aluguellivros.entity.LivroReserva;
import io.github.aluguellivros.service.LivroReservaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/reserva")
@CrossOrigin(origins = "*")
public class LivroReservaController {

    @Autowired
    private LivroReservaService service;

    @PostMapping
    public ResponseEntity<Object> realizaReserva(@RequestBody LivroReserva reserva){
        try {
            reserva = service.realizaReserva(reserva);
            return ResponseEntity.ok(reserva);
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping
    public ResponseEntity<Object> cancelaReserva(@RequestParam long id){
        try{
            service.cancelaReserva(id);
            return ResponseEntity.ok().build();
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<Object> listarTodos(){
        try{
            List<LivroReserva> lista = service.listar();
            return ResponseEntity.ok(lista);
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
