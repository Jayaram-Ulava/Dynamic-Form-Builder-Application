import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormTemplate } from 'src/app/FormField';
import { MockApiService } from 'src/app/Services/mock-api.service';

@Component({
  selector: 'app-form-filler',
  templateUrl: './form-filler.component.html',
  styleUrls: ['./form-filler.component.css']
})
export class FormFillerComponent implements OnInit {
  templateId!: string;
  template!: FormTemplate;
  dynamicForm!: FormGroup;
  submitted = false;

  constructor(private route: ActivatedRoute, private api: MockApiService, private fb: FormBuilder) {}

  ngOnInit() {
    this.templateId = this.route.snapshot.paramMap.get('id')!;
    this.api.getTemplates().subscribe(templates => {
      this.template = templates.find(t => t.id === this.templateId)!;
      this.dynamicForm = this.fb.group({});
      this.template.fields.forEach(f => {
        this.dynamicForm.addControl(f.id, this.fb.control(f.value || '', f.required ? Validators.required : []));
      });
    });
  }

  onSubmit() {
    if (this.dynamicForm.invalid) return;
    this.api.submitForm(this.templateId, this.dynamicForm.value).subscribe(() => {
      this.submitted = true;
      alert('Form submitted successfully!');
    });
  }}
