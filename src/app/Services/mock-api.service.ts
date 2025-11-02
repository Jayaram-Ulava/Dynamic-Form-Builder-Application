import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { FormTemplate } from '../FormField';

const TEMPLATES_KEY = 'df_templates';
const SUBMISSIONS_KEY = 'df_submissions';
@Injectable({
  providedIn: 'root'
})
export class MockApiService {
  private simulateDelay = 600;

  getTemplates(): Observable<FormTemplate[]> {
    const raw = localStorage.getItem(TEMPLATES_KEY);
    const templates: FormTemplate[] = raw ? JSON.parse(raw) : [];
    return of(templates).pipe(delay(this.simulateDelay));
  }

  saveTemplate(t: FormTemplate): Observable<FormTemplate> {
    const raw = localStorage.getItem(TEMPLATES_KEY);
    const templates: FormTemplate[] = raw ? JSON.parse(raw) : [];
    let template = { ...t };
    if (!template.id) {
      template.id = uuid();
      template.createdAt = new Date().toISOString();
      templates.push(template);
    } else {
      const idx = templates.findIndex(x => x.id === template.id);
      if (idx >= 0) templates[idx] = template;
      else templates.push(template);
    }
    localStorage.setItem(TEMPLATES_KEY, JSON.stringify(templates));
    return of(template).pipe(delay(this.simulateDelay));
  }

  deleteTemplate(id: string): Observable<boolean> {
    const raw = localStorage.getItem(TEMPLATES_KEY);
    let templates: FormTemplate[] = raw ? JSON.parse(raw) : [];
    templates = templates.filter(t => t.id !== id);
    localStorage.setItem(TEMPLATES_KEY, JSON.stringify(templates));
    return of(true).pipe(delay(this.simulateDelay));
  }

  submitForm(templateId: string, data: any): Observable<{ ok: boolean; id: string }> {
    const raw = localStorage.getItem(SUBMISSIONS_KEY);
    const submissions = raw ? JSON.parse(raw) : [];
    const id = uuid();
    submissions.push({ id, templateId, data, submittedAt: new Date().toISOString() });
    localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(submissions));
    return of({ ok: true, id }).pipe(delay(this.simulateDelay));
  }

  getSubmissions(): Observable<any[]> {
    const raw = localStorage.getItem(SUBMISSIONS_KEY);
    const submissions = raw ? JSON.parse(raw) : [];
    return of(submissions).pipe(delay(this.simulateDelay));
  }
}
function uuid(): string {
  throw new Error('Function not implemented.');
}

