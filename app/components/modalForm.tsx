import { Form, Link } from "@remix-run/react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

export default function ModalForm({
  formId,
  cancelRoute,
  children,
}: {
  formId: string;
  cancelRoute: string;
  children: React.ReactNode;
}) {
  return (
    <Modal isOpen={true}>
      <ModalHeader>Recipe</ModalHeader>
      <ModalBody>
        <Form method="post" id={formId}>
          {children}
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button type="submit" color="primary" form={formId}>
          Save
        </Button>
        <Link to={cancelRoute}>
          <Button type="button" color="secondary">
            Cancel
          </Button>
        </Link>
      </ModalFooter>
    </Modal>
  );
}
