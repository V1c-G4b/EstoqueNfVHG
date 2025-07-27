import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/shared/components/ui/card";
import type { ReactNode } from "react";

export interface CardChartContainerProps {
  title: string;
  description: string;
  children?: ReactNode;
  colSpan?: number | string; 
}

export default function CardChartContainer({
  title,
  description,
  children,
  colSpan = 4, 
}: CardChartContainerProps) {
  return (
    <Card className={`col-span-${colSpan}`}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="pl-2">{children}</CardContent>
    </Card>
  );
}
