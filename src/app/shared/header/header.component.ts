import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MenubarModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  items: MenuItem[] | undefined;

  ngOnInit() {
      this.items = [
          {
              label: 'Home',
              icon: 'pi pi-home'
          },
        //   {
        //       label: 'Features',
        //       icon: 'pi pi-star'
        //   },
       
        //   {
        //       label: 'Contact',
        //       icon: 'pi pi-envelope'
        //   }
      ]
  }
}

