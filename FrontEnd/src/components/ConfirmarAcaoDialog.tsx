import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface ConfirmarAcaoDialogProps {
  aberto: boolean;
  titulo: string;
  descricao: string;
  textoConfirmar?: string;
  carregando?: boolean;
  onConfirmar: () => void;
  onCancelar: () => void;
}

export function ConfirmarAcaoDialog({
  aberto,
  titulo,
  descricao,
  textoConfirmar = "Confirmar",
  carregando = false,
  onConfirmar,
  onCancelar,
}: ConfirmarAcaoDialogProps) {
  return (
    <AlertDialog open={aberto} onOpenChange={(novoAberto) => !novoAberto && onCancelar()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{titulo}</AlertDialogTitle>
          <AlertDialogDescription>{descricao}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={carregando} onClick={onCancelar}>
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction disabled={carregando} onClick={onConfirmar}>
            {carregando ? "A processar..." : textoConfirmar}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
