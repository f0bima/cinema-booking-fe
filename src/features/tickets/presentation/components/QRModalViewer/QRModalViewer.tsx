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
import { navigate } from "astro:transitions/client";

type Props = { isOpen: boolean; qrBase64: string };

const QRModalViewer = (props: Props) => {
  return (
    <Dialog open={props.isOpen}>
      <DialogContent className="sm:max-w-[425px]" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Your QR booking ticket</DialogTitle>
          <DialogDescription>
            Show your QR booking ticket to our staff
          </DialogDescription>
        </DialogHeader>
        <div className="flex w-full items-center justify-center gap-4">
          <QRCodeViewer qrBase64={props.qrBase64} />
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
