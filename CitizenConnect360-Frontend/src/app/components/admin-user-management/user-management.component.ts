import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user';
import { NotificationService } from '../../services/notification/notification.service';
import { UserManagementService } from '../../services/userManagement/user-management.service';

export interface Request {
  user: User;
  requestedAt: Date;
}

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  notifications: Request[] = []
  users:User[] = []
  deletedUsers: User[] = []
  governmentOfficialRequests: Request[] = []

  selectedUser!: string; 
  selectedRole!: string;
  roles: string[] = ['Citizen', 'Government Official'];

  constructor(private notificationService: NotificationService, private userService: UserManagementService) {}

  ngOnInit(): void {
    this.loadNotifications();
    this.fetchUsers()
  }

  loadNotifications(): void {
    this.notificationService.getNotifications().subscribe((notifications: Request[]) => {
      this.notifications = notifications;
    });
  }


  fetchUsers(): void {
    this.userService.getUsers().subscribe((users: User[]) => {
      this.users = users;
    });
  }


  deleteUser(user: User): void {
    console.log('Deleting user:', user)
    this.userService.deleteUser(user.userId).subscribe(() => {
      this.fetchUsers();
    });
  }


  // restoreUser(user: User): void {
  //   this.userService.restoreUser(user.userId).subscribe(() => {
  //     this.fetchUsers();
  //   });
  // }


  // approveUser(request: Request): void {
  //   this.userService.approveGovernmentOfficial(request.user.userId).subscribe(() => {
  //     this.governmentOfficialRequests = this.governmentOfficialRequests.filter(req => req !== request);
  //     this.loadNotifications()
  //   })
  // }

  // clearNotifications(): void {
  //   this.userService.clearNotifications().subscribe(() => {
  //     this.notifications = [];
  //   });
  // }

  // assignRole(): void {
  //   this.userService.assignRole(this.selectedUser, this.selectedRole).subscribe(() => {
  //     console.log(`Assigned role ${this.selectedRole} to user with ID ${this.selectedUser}`);
  //     this.fetchUsers();
  //   });
  // }

  

}
