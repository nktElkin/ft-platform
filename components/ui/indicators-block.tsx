interface IndicatorsBlockProps {
  type: "course" | "module";
  object: any;
  categoryName?: string;
}

const IndicatorsBlock = ({
  type,
  object,
  categoryName,
}: IndicatorsBlockProps) => {
  return (
    <div
      className={`flex flex-row justify-start space-x-2 text-zinc-500 text-xs *:lowercase *:px-2 *:py-1 *:rounded-lg`}
    >
      {type === "course" && (
        <span className="bg-slate-200">{categoryName}</span>
      )}
      <span
        className={`${object.isPublished ? "bg-green-200" : "bg-slate-200"}`}
      >
        {object?.isPublished ? "Published" : "Draft"}
      </span>
    </div>
  );
};

export default IndicatorsBlock;
