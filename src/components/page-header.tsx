interface PageHeaderProps {
  title: string;
  description: string;
}

const PageHeader = ({ title, description }: PageHeaderProps) => (
  <div>
    <h3 className="text-lg font-medium">{title}</h3>
    <p className="inline-block text-sm text-muted-foreground">{description}</p>
  </div>
);

export default PageHeader;
