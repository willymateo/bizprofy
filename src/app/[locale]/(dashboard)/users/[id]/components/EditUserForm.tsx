"use client";

import { EditUserPayload, User } from "@/services/users/interfaces";
import { UserForm } from "../../components/UserForm";
import { editUserById } from "@/services/users";

const EditUserForm = ({ id, ...props }: User) => {
  const handleSave = (payload: EditUserPayload) => editUserById({ id, payload });

  return <UserForm {...props} onSave={handleSave} saveButtonLabel="Save user" />;
};

export { EditUserForm };
