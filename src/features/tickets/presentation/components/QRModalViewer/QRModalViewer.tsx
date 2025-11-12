import Button from "@/common/presentation/component/Button/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import QRCodeViewer from "@/features/tickets/presentation/components/QRCodeViewer/QRCodeViewer";
import type { DialogProps } from "@radix-ui/react-dialog";
import { navigate } from "astro:transitions/client";
import type { FC } from "react";

type Props = React.ComponentProps<FC<DialogProps>> & { qrBase64: string };

const QRModalViewer = ({ qrBase64, ...props }: Props) => {
  return (
    <Dialog {...props}>
      <DialogContent
        className="sm:max-w-[425px]"
        showCloseButton={props.onOpenChange !== undefined}
      >
        <DialogHeader>
          <DialogTitle>Your QR booking ticket</DialogTitle>
          <DialogDescription>
            Show your QR booking ticket to our staff
          </DialogDescription>
        </DialogHeader>
        <div className="flex w-full items-center justify-center gap-4">
          <QRCodeViewer qrBase64={qrBase64} />
        </div>
        <DialogFooter>
          <Button
            onClick={() => {
              navigate("/tickets");
            }}
            className="w-full"
          >
            Goto your tickets
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default QRModalViewer;
