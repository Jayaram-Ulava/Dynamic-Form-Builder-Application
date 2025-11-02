import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Field, FieldType,  FormField,  FormTemplate } from 'src/app/FormField';
import { FormManagementServiceService } from 'src/app/Services/form-management-service.service';
import { CdkDragDrop,  copyArrayItem, moveItemInArray } from '@angular/cdk/drag-drop';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MockApiService } from 'src/app/Services/mock-api.service';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css']
})
export class FormBuilderComponent implements OnInit {
templateId: string | null = null;
  templateName = '';
  fields: FormField[] = [];
  fieldForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private api: MockApiService
  ) {
    this.fieldForm = this.fb.group({
      label: ['', Validators.required],
      type: ['text', Validators.required],
      required: [false]
    });
  }

  ngOnInit() {
    this.templateId = this.route.snapshot.paramMap.get('id');
    if (this.templateId && this.templateId !== 'new') {
      this.api.getTemplates().subscribe(templates => {
        const template = templates.find(t => t.id === this.templateId);
        if (template) {
          this.templateName = template.name;
          this.fields = template.fields;
        }
      });
    }
  }

  addField() {
    const newField: FormField = {
      id: uuidv4(),
      label: this.fieldForm.value.label,
      type: this.fieldForm.value.type,
      required: this.fieldForm.value.required
    };
    this.fields.push(newField);
    this.fieldForm.reset({ type: 'text', required: false });
  }

  removeField(index: number) {
    this.fields.splice(index, 1);
  }

  saveForm() {
    const template: FormTemplate = {
      id: this.templateId && this.templateId !== 'new' ? this.templateId : uuidv4(),
      name: this.templateName,
      fields: this.fields
    };
    this.api.saveTemplate(template).subscribe(() => {
      this.router.navigate(['/forms']);
    });
  }
}

function uuidv4(): string {
  // Simple UUID generator
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

