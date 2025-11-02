import { Injectable } from '@angular/core';
import { FormTemplate } from '../FormField';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormManagementServiceService {
private forms: FormTemplate[] = [];
  private formsSubject = new BehaviorSubject<FormTemplate[]>(this.forms);

  getForms(): Observable<FormTemplate[]> {
    return this.formsSubject.asObservable();
  }

  getFormById(id: string): Observable<FormTemplate | undefined> {
    const form = this.forms.find(f => f.id === id);
    return of(form);
  }

  saveForm(form: FormTemplate): Observable<FormTemplate> {
    const existingFormIndex = this.forms.findIndex(f => f.id === form.id);
    if (existingFormIndex > -1) {
      this.forms[existingFormIndex] = form;
    } else {
      form.id = `form_${Date.now()}`;
      this.forms.push(form);
    }
    this.formsSubject.next(this.forms); // Update all components subscribed to the forms list
    return of(form);
  }

  deleteForm(id: string): Observable<boolean> {
    const initialLength = this.forms.length;
    this.forms = this.forms.filter(f => f.id !== id);
    this.formsSubject.next(this.forms); // Update all components subscribed to the forms list
    return of(this.forms.length < initialLength);
  }
}
