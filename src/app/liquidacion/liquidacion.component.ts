import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from './../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
  selector: 'app-liquidacion',
  templateUrl: './liquidacion.component.html',
  styleUrls: ['./liquidacion.component.scss']
})
export class LiquidacionComponent implements OnInit {

	salud!:Number;
	afp!:Number;
	sueldo!:number;
	liquido!:number;
	descuentos!:number;
	personaForm !: FormGroup;
  	actionBtn : string ="Guardar";
  	constructor(private formBuilder : FormBuilder,
    	 private api : ApiService,
     @Inject(MAT_DIALOG_DATA) public editData : any,
    	private MatDialogRef : MatDialogRef<LiquidacionComponent>) { }


  ngOnInit(): void {
	this.personaForm = this.formBuilder.group({
		personaName : ['',Validators.required],
		surname : ['',Validators.required],
		date : ['', Validators.required],
		salud : ['',Validators.required],
		afp : ['',Validators.required],
		sueldo : ['',Validators.required],
		cargas : ['', Validators.required],
		cargo : ['', Validators.required],
		contrato : ['', Validators.required],
		liquido : ['', Validators.required],
		descuentos : ['', Validators.required],
		horas : ['', Validators.required]
		
  
	  });
	  
	  if(this.editData){
		this.actionBtn = "Actualizar"
		this.personaForm.controls['personaName'].setValue(this.editData.personaName);
		this.personaForm.controls['surname'].setValue(this.editData.surname);
		this.personaForm.controls['date'].setValue(this.editData.date);
		this.personaForm.controls['salud'].setValue(this.editData.salud);
		this.personaForm.controls['cargas'].setValue(this.editData.cargas);
		this.personaForm.controls['cargo'].setValue(this.editData.cargo);
		this.personaForm.controls['contrato'].setValue(this.editData.contrato);
		this.personaForm.controls['horas'].setValue(this.editData.horas);
  
		
	  }
  }

  calcularLiquidacion(){

	let sueldox = this.sueldo
	let diez = sueldox * 0.1;
	let afpx = sueldox * Number(this.afp) + diez;
	let saludx = sueldox *  Number(this.salud);

	this.descuentos = afpx + saludx;
	this.liquido = sueldox - this.descuentos

	console.log(Math.trunc(afpx))
	console.log(Math.trunc(saludx));
	console.log(this.sueldo);
  }
  
}



  
  

