import { Button } from "./button";

interface InputCoverProps {
  value?: string | null;
  onToggle: (value: boolean) => void;
  controllerState: boolean;
  inputVariant: string;
  children?: React.ReactNode;
}

const InputCover = ({
  value,
  onToggle,
  controllerState,
  inputVariant,
  children,
}: InputCoverProps) => {
  const variant =
    inputVariant === "input"
      ? "overflow-hidden h-9"
      : inputVariant === "text-area"
        ? "h-fit min-h-9"
        : "";
  return (
    <>
      <div
        aria-roledescription="field value, click to edit"
        className={`${variant} flex w-full rounded-md border border-input bg-transparent px-3 items-center text-base shadow-sm md:text-sm`}
      >
        {children || value}
      </div>
      <Button
        className="w-fit"
        type="button"
        onClick={() => onToggle(!controllerState)}
      >
        Edit
      </Button>
    </>
  );
};

export default InputCover;
