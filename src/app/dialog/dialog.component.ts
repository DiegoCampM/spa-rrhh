import { ApiService } from './../services/api.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  saludList = ["Fonasa", "prevencion"]
  personaForm !: FormGroup;
  actionBtn : string ="Guardar";
  constructor(private formBuilder : FormBuilder,
     private api : ApiService,
     @Inject(MAT_DIALOG_DATA) public editData : any,
      private MatDialogRef : MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.personaForm = this.formBuilder.group({
      personaName : ['',Validators.required],
      surname : ['',Validators.required],
      date : ['', Validators.required],
      salud : ['',Validators.required],
      afp : ['',Validators.required],
      cargas : ['', Validators.required],
      cargo : ['', Validators.required],
      contrato : ['', Validators.required],
      horas : ['', Validators.required]
      

    });
    
    if(this.editData){
      this.actionBtn = "Actualizar"
      this.personaForm.controls['personaName'].setValue(this.editData.personaName);
      this.personaForm.controls['surname'].setValue(this.editData.surname);
      this.personaForm.controls['date'].setValue(this.editData.date);
      this.personaForm.controls['salud'].setValue(this.editData.salud);
      this.personaForm.controls['afp'].setValue(this.editData.afp);
      this.personaForm.controls['cargas'].setValue(this.editData.cargas);
      this.personaForm.controls['cargo'].setValue(this.editData.cargo);
      this.personaForm.controls['contrato'].setValue(this.editData.contrato);
      this.personaForm.controls['horas'].setValue(this.editData.horas);

      
    }

  }
  addPersona(){
    if(!this.editData){
      if(this.personaForm.valid){
        this.api.postPersona(this.personaForm.value)
        .subscribe({
          next:(res)=>{
            console.log(this.personaForm);
            this.personaForm.reset();
            this.MatDialogRef.close('Guardar');
          },
          error:()=>{
            alert("Ocurrio un Error al Añadir una Persona")
          }
        })
      }
    }else{
      this.updatePersona()
    }
  }
updatePersona(){
  this.api.putPersona(this.personaForm.value,this.editData.id)
  .subscribe({
    next:(res)=>{
      this.personaForm.reset();
      this.MatDialogRef.close('Actualizar');
    },
    error:()=>{
      alert("Error mientras se obtenian los datos!!");
    }
  })
}
}
