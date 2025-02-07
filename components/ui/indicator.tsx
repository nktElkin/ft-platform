interface IndocatorProps {
  state: boolean;
  data: [string, string];
}
const Indicator = ({ state, data }: IndocatorProps) => {
  return (
    <span
      className={`inline-block items-center text-zinc-500 text-xs lowercase px-2 py-1 rounded-lg ${state ? "bg-green-200" : "bg-slate-200"}`}
    >
      {state ? data[0] : data[1]}
    </span>
  );
};

export default Indicator;
