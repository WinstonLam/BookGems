import * as THREE from "three";

export interface InputFieldProps {
  value: string;
  label: string;
  id: string;
  required: boolean;
  submitted?: boolean;
  onChange?: (value: any) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  sensitive?: boolean;
  limit?: number;
  strict?: string;
  disbabled?: boolean;
  span?: string;
}

export interface BookModelProps {
  text: {
    title: string;
    author: string;
  };
  color: string;
  rotation: number[];
}


export interface OpenLibSearchProps {
  search: string;
  setSearch: (search: string) => void;
}

export interface BookData {
  title: string;
  author: string;
  publishDate: string;
  isbn: string;
  olid: string;

}