package io.github.aluguellivros.rest;

import io.github.aluguellivros.entity.Cliente;
import io.github.aluguellivros.service.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/cliente")
@CrossOrigin(origins = "*")
public class ClienteController {

    @Autowired
    private ClienteService service;

    @PostMapping
    public ResponseEntity<Object> salvar(@RequestBody Cliente cliente){
        try {
            cliente = service.salvar(cliente);
            return ResponseEntity.ok(cliente);
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping
    public ResponseEntity<Object> atualizar(@RequestBody Cliente cliente){
        try{
            cliente = service.salvar(cliente);
            return ResponseEntity.ok(cliente);
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
            Cliente cliente = service.buscar(id);
            if (cliente == null)
                throw new Exception("Cliente não encontrado");
            return ResponseEntity.ok(cliente);
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
