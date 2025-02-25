import * as THREE from "three";
import React from "react";

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
  coverImage: string | null;
  setLoading: (loading: boolean) => void;
}

export interface OpenLibSearchProps {
  setCoverImage: (image: string | null) => void;
}

export interface BookData {
  title: string;
  author: string;
  publishDate: string;
  isbn: string;
  olid: string;
  thumbnail: {
    small: string;
    large: string;
  } | null;
}

export interface SvgProps {
  className: string;
  onClick?: () => void;
  style?: React.CSSProperties;
};

export interface AnimatedDivProps {
  children: React.ReactNode;
  baseStyle?: React.CSSProperties;
}
