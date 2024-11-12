export type ServiceCardProps = {
  id?: number;
  title: string;
  description: string;
  features: string[];
  buttons: string[];
};

export type CardProps = {
  id?: number;
  description?: string;
  title: string;
};

export type ReviewProps = {
  id?: number;
  content?: string;
  title?: string;
  author?: string;
};

export type ServicesSectionProps = {
  isSmallScreen: boolean;
};

export interface CardItemProps {
  id?: number;
  title: string;
  description?: string;
  content?: string;
  author?: string;
}

export type CardVariant = "benefits" | "reviews" | "workflow";

export interface ContainerProps {
  mt?: number;
  gap?: number;
  maxWidth?: string | number;
  display?: Record<string, string>;
}

export interface ButtonProps {
  text?: string;
  sx?: Record<string, unknown>;
}

export interface UniversalCardLayoutProps {
  variant: CardVariant;
  data: CardItemProps[] | Record<string, CardItemProps[]>;
  CardItemComponent: React.ComponentType<CardItemProps>;
  containerProps?: ContainerProps;
  buttonProps?: ButtonProps;
}
