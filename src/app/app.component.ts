import { LiquidacionComponent } from './liquidacion/liquidacion.component';
import { ApiService } from './services/api.service';
import { DialogComponent } from './dialog/dialog.component';
import { Component, OnInit,ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'AngularMaterialCrud';
  displayedColumns: string[] = ['personaName','surname','date','salud','afp', 'cargas', 'cargo', 'contrato','horas', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor( private dialog : MatDialog, private api : ApiService,) {

  }
  ngOnInit(): void {
    this.getAllPersonas();

  }
  openDialog() {
    this.dialog.open(DialogComponent, {
     width:'40%'
    }).afterClosed().subscribe(val=>{
      if(val ==='save'){
        this.getAllPersonas();
      }
    })
  }
  
  openLiquidacion(row : any) {
    this.dialog.open(LiquidacionComponent,{
      width:'40%',
      data:row
     })
     this.getAllPersonas();
  }

  getAllPersonas(){
    this.api.getPersona()
    .subscribe({
      next:(res)=>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error:(err)=>{
        alert("Usa el comando para ver los datos: \nnpx json-server --watch db.json ")
      }
    })
  }
//Comando en powershell:
//npx json-server --watch db.json

  editPersona(row : any){
    this.dialog.open(DialogComponent,{
      width: "40%",
      data:row 
    }).afterClosed().subscribe(val=>{
      if(val ==='update'){
        this.getAllPersonas();
      }
    })
  }
  deletePersona(id:number){
    this.api.deletePersona(id)
    .subscribe({
      next:(res)=>{
        this.getAllPersonas();
      },
      error:()=>{
        alert("Error mientras se borraban los datos!!")
      }
    }) 
  }
  applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();

      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
  }
