export interface CategoryPayload {
  description: string;
  name: string;
  sponsor: string;
}

export interface Category extends CategoryPayload {
  id: string;
}
