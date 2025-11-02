// src/app/models/form.model.ts
export type FieldType = 'text' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'date';

export interface FieldOption {
  label: string;
  value: string;
}

export interface FieldValidation {
  minLength?: number;
  maxLength?: number;
  pattern?: string;
}

export interface Field {
  value: string;
  id: string;
  type: FieldType;
  label: string;
  required?: boolean;
  help?: string;
  validations?: FieldValidation;
  options?: FieldOption[]; 
}

export interface FormField {
  id: string;
  label: string;
  type: 'text' | 'textarea' | 'dropdown' | 'checkbox' | 'radio' | 'date';
  required: boolean;
  value?: any;
  options?: string[]; // for dropdown, checkbox, radio
}

export interface FormTemplate {
  id: string;
  name: string;
  fields: FormField[];
  createdAt?: string;
}


