export const MenuTitle = ({
  title,
  description,
}: {
  title: string;
  description?: string;
}) => {
  return (
    <div className="border-b">
      <h1 className="p-4 pb-0 text-xl ">{title}</h1>
      {description && (
        <p className="text-sm border-b-gray-100 text-gray-700 p-4 pt-0">
          {description}
        </p>
      )}
    </div>
  );
};
