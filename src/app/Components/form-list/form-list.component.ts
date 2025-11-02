import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FormTemplate } from 'src/app/FormField';
import { AuthService } from 'src/app/Services/auth.service';
import { FormManagementServiceService } from 'src/app/Services/form-management-service.service';
import { MockApiService } from 'src/app/Services/mock-api.service';

@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.component.html',
  styleUrls: ['./form-list.component.css']
})
export class FormListComponent implements OnInit {
 templates$: Observable<FormTemplate[]>;

  constructor(private api: MockApiService, public auth: AuthService) {
    this.templates$ = this.api.getTemplates();
  }

  ngOnInit() {
  // Optionally refresh templates on init
  this.templates$ = this.api.getTemplates();
  }

  deleteForm(id: string) {
    this.api.deleteTemplate(id).subscribe(() => {
      this.templates$ = this.api.getTemplates();
    });
  }
}
