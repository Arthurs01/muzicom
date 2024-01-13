const express = require('express')
const router = express.Router()
const connection = require('./database/db')

router.get('/', (req, res) =>{    
    res.render('index')
})

router.get('/register', (req, res) =>{
    res.render('register')
})

router.post('/add', (req, res) =>{
    const {name, lastname, age, phone, email, school, plan, birthdate, school_level, familiar, direccion, tipo_clases, curso, disponibilidad, experiencia, personajes_fav, canciones, referencias, comentarios, cond_serv_priv} = req.body    
    connection.query('INSERT INTO students SET ?',{name:name, lastname:lastname, age:age, phone:phone, email:email, school:school, plan:plan, birthdate:birthdate, school_level: school_level, familiar: familiar, direccion:direccion, tipo_clases: tipo_clases, curso:curso, disponibilidad:disponibilidad, experiencia:experiencia, personajes_fav: personajes_fav, canciones, referencias, comentarios, cond_serv_priv}, async (error, result) => {
        if(error){
            console.log(error);
        }  else{
            res.render('register')        
        }      
    }
  )    
})

router.get('/students', (req, res) =>{
    connection.query("SELECT * FROM students", (error, result) => {
        res.render('students', {students:result})    
    })    
})

router.get('/students/:id', (req, res) => {
    const id = req.params.id;
    
    connection.query(
        "SELECT * FROM students WHERE id = ?",
        [id],
        (error, results) => {
          if (error) {
            throw error;
          } else {
            res.render("info",{students: results, info: true});
          }
        }
      );
    
})

router.get("/delete/:id", (req, res) => {
    const id = req.params.id;
      connection.query("DELETE FROM students WHERE id = ?",[id],(error, results) =>{
            if (error) {
              throw error;
            } else {
                res.redirect('/students') 
            }
          }
        );    
    });





















module.exports = router