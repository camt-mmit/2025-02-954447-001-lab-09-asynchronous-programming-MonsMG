export interface DynamicSectionItem {
  id: string;
  value: number;
}

export interface DynamicSectionGroup {
  id: string;
  numbers: DynamicSectionItem[];
}

// Type หลักที่จะเอาไปใช้ใน signal
export type DynamicSection = DynamicSectionGroup[];
