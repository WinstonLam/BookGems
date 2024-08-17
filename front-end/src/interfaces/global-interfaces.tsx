import * as THREE from 'three';

export interface InputFieldProps {
  value: string;
  label: string;
  id: string;
  required: boolean;
  submitted?: boolean;
  onChange?: (value: any) => void;
  sensitive?: boolean;
  limit?: number;
  strict?: string;
  disbabled?: boolean;
  span?: string;
}

export interface BookModelProps {
  text: string;
}