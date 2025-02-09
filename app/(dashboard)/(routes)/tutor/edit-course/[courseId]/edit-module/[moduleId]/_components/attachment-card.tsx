"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Attachment } from "@prisma/client";
import { CircleX, Link } from "lucide-react";
import { toast } from "sonner";

const AttachmentCard = ({ attachment }:{attachment : Attachment}) => {
  return (
    <div
      className="container text-base flex flex-col sm:flex-row sm:justify-between sm:items-center"
      key={attachment.id}
    >
      <div className="mb-2 sm:mb-0">
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2 mb-2 sm:mb-0">
          <Label className="">Alternative text:</Label>
          <span>{attachment?.altText}</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2">
          <Label className="">Description:</Label>
          <span>{attachment?.description}</span>
        </div>
        <Button
          variant="link"
          className="m-0 p-0"
          onClick={() => {
            navigator.clipboard.writeText(`![${attachment.description || 'image'}](${attachment.url} "${attachment.altText}")`);
            toast.info("Link copied to clipboard");
          }}
        >
          <Link /> Link to image
        </Button>
      </div>
      <div className="sm:m-0 mt-3">
        <Button
          type="button"
          aria-description="Delete course button"
          onClick={async () => {
            await fetch(`/api/attachments/${attachment.id}`, {
              method: "DELETE",
            });
          }}
          className="font-bold top-0 right-0 px-3 py-2 sm:hidden"
        >
          Remove attachment
          <CircleX />
        </Button>
        <button
          type="button"
          aria-description="Delete course button"
          onClick={async () => {
            await fetch(`/api/attachments/${attachment.id}`, {
              method: "DELETE",
            });
          }}
          className="font-bold top-0 right-0 px-3 py-2 hidden sm:block"
        >
          <CircleX />
        </button>
      </div>
    </div>
  );
};

export default AttachmentCard;
