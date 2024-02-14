export interface CreateCategoryCommand {
  name: string;
  description: string;
  isPopular: boolean;
  tokens: string[];
}
