import { Component,OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { TagModule } from 'primeng/tag';
import { UserService } from '../../service/user.service';
import { Table } from 'primeng/table';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { SliderModule } from 'primeng/slider';
import { ProgressBarModule } from 'primeng/progressbar';
import { StyleClassModule } from 'primeng/styleclass';
import { DialogModule } from 'primeng/dialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { PanelModule } from 'primeng/panel';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { LoaderComponent } from '../loader/loader.component';
@Component({
  selector: 'app-users',
  standalone: true,
  imports: [TableModule, InputTextModule, TagModule,ButtonModule , IconFieldModule, InputIconModule,CommonModule,FormsModule,MultiSelectModule,DropdownModule,SliderModule,ProgressBarModule,StyleClassModule,DialogModule,FloatLabelModule,PanelModule,ReactiveFormsModule,ToastModule,LoaderComponent   ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
  providers: [MessageService]
})
export class UsersComponent implements OnInit {
  users: any = []
  selectedCustomers:  any = []
  visible: boolean = false;
  loading: boolean = true;
  searchValue: string | undefined;
  userForm: FormGroup; // Reactive form group
  displayDialog: boolean = false;
  userDetail:any={}
  title:string=''
  selectedUserId:any=null;
  hideToastr:boolean=false;
  toastrMsg:string='';
  severity:any=''
  constructor(
    private userService:UserService,
    private fb: FormBuilder,
    private messageService: MessageService
  ){
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      mobile: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.getLatestUser()
  }

  onSubmit() {
    if (this.userForm.valid && this.title=='Add User') {
      console.log(this.userForm.value);
      let obj={
        id:this.users.length+1,
        name:this.userForm.value.name,
        email:this.userForm.value.email,
        password:this.userForm.value.password,
        mobile:this.userForm.value.mobile
      }
        this.addNewUser(obj)
      this.displayDialog = false; // Close the dialog on successful submission
      this.userForm.reset(); // Reset the form after submission
      this.getLatestUser();
    }else{
      console.log(this.userForm.value);
      let obj={
        id:this.selectedUserId,
        name:this.userForm.value.name,
        email:this.userForm.value.email,
        password:this.userForm.value.password,
        mobile:this.userForm.value.mobile
      }
        this.updateUser(obj)
      this.displayDialog = false; // Close the dialog on successful submission
      this.userForm.reset(); // Reset the form after submission
      this.getLatestUser();
    }
  }

  addNewUser(val:any){
     this.userService.createUser(val).subscribe(res=>{
      console.log("add response", res)
      // this.messageService.add({ severity: 'error', summary: 'Error', detail: 'User Deleted Successfully' });
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User Added Successfully' });
     })
  }

  updateUser(val:any){
    console.log("dddddd",val)
    this.userService.updateUser(val).subscribe(res=>{
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User Updated Successfully' });
    })
 }



  clear(table: Table) {
    table.clear();
    this.searchValue = ''
}

  getLatestUser() {
    this.userService.getAllUser().subscribe(res => {
      this.loading = false;
      this.users = res
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User Fetched Data Successfully' });            
    })
  }

  
  openDialog(val:string) {
      if(val=='add'){
        this.title='Add User'
      }else{
        this.title='Update User'
      }
      this.displayDialog = true  
  }

  editUser(val:any,data:any,){
    this.selectedUserId=data.id
    this.getUserById(data)
  }

  getUserById(data:any){
     this.userService.getUserById(data).subscribe(data=>{
       console.log("nnnnn",data)
       this.userDetail=data
       this.openDialog('update');
     })
  }

  onClose() {
    this.displayDialog = false;
    this.userForm.reset(); // Reset the form when dialog closes
    this.userDetail={}
    this.selectedUserId=null
  }

  deleteUser(data:any){
      this.userService.deleteUser(data).subscribe(data=>{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'User Deleted Successfully' });
        this.getLatestUser()
      })
  }

  showToast1(serv:string,msg:string){
   this.toastrMsg=msg,
   this.severity=serv
  }

}
