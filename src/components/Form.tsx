import { FormEventHandler } from "react";
import RegularButton from "./RegularButton";

type FormProps = {
  handleSubmit: FormEventHandler<HTMLFormElement>;
};
export default function Form({ handleSubmit }: FormProps) {
  return (
    <form className="wrapper" onSubmit={handleSubmit}>
      <RegularButton>Start Game</RegularButton>
    </form>
  );
}
