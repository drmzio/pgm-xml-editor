export interface FieldProps {
  name: string;
  value: any;
  onUpdate: (name: string, value: any) => void;
}
