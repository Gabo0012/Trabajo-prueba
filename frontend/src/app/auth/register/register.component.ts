import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from '../../services/auth.service';
import { UserI } from '../../user';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private authService: AuthService, private router: Router) {  }

  ngOnInit(): void {

  }

  onRegister(form): void{
    this.authService.register(form.value).subscribe(res => {
      this.router.navigateByUrl('/auth');
    });
}

}
