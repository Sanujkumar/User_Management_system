import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";

type ConfirmToastProps = {
  message: string;
  onConfirm: () => void;
};

export const confirmToast = ({ message, onConfirm }: ConfirmToastProps) => {
  toast(
    (t) => (
      <div className="flex flex-col gap-3">
        <p className="font-medium">{message}</p>
        <div className="flex gap-2 justify-end">
          <Button
            size="sm"
            variant="outline"
            onClick={() => toast.dismiss(t.id)}
          >
            Cancel  
          </Button>

          <Button
            size="sm"
            variant="destructive"
            onClick={() => {
              onConfirm();
              toast.dismiss(t.id);
            }}
          >
            Confirm
          </Button>
        </div>
      </div>
    ),
    {
      duration: 6000,
    }
  );
};
