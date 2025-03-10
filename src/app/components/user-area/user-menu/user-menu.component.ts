import { Component, inject } from '@angular/core';
import { UserStore } from '../../../storage/user-store';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/user.service';
import { NotifyService } from '../../../services/notify.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-menu',
  imports: [CommonModule, RouterLink],
  templateUrl: './user-menu.component.html',
  styleUrl: './user-menu.component.css'
})
export class UserMenuComponent {

    public userStore = inject(UserStore);
    public userService = inject(UserService);
    public notifyService = inject(NotifyService);


    public logMeOut(): void {
        this.userService.logout();
        this.notifyService.success("Bye Bye");
    }

}
