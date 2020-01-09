import { Component, OnInit } from '@angular/core';
import { User } from '../register/user';
import { RegisterService } from '../register.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  userData : User[];

  constructor(private registerService: RegisterService, private route: ActivatedRoute,) { }

  ngOnInit() {
    // tslint:disable-next-line: radix
    const id = parseInt(this.route.snapshot.paramMap.get('userId'));
    this.registerService.getUsers()
  .subscribe((res:User[]) => {
    console.log(res);
    this.userData = res;
    console.log('dataaaaaaa', this.userData);
  });
  }

}
