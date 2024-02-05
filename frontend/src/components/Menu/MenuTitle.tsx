export const MenuTitle = ({
  title,
  description,
}: {
  title: string;
  description?: string;
}) => {
  return (
    <div>
      <h1 className="border-b border-b-gray-100 p-4 pb-8">{title}</h1>
      {description && <p className="text-sm text-gray-700">{description}</p>}
    </div>
  );
};
