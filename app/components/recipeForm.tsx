import type { Recipe } from "@prisma/client";
import { FormGroup, Label } from "reactstrap";
import ModalForm from "./modalForm";

export default function RecipeForm({
  formId,
  defaultValues,
  children,
}: {
  formId: string;
  defaultValues: Partial<Omit<Recipe, "id">>;
  children?: React.ReactNode;
}) {
  return (
    <ModalForm formId={formId} cancelRoute="/recipes">
      <FormGroup>
        <Label for="title" className="required">
          Title
        </Label>
        <input
          id="title"
          name="title"
          type="text"
          className="form-control"
          required
          defaultValue={defaultValues?.title ?? ""}
        />
      </FormGroup>
      <FormGroup>
        <Label for="notes">Notes</Label>
        <input
          id="notes"
          name="notes"
          type="textarea"
          className="form-control"
          defaultValue={defaultValues?.notes ?? ""}
        />
      </FormGroup>
      {children}
    </ModalForm>
  );
}
