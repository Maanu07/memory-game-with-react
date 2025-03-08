import { FormEventHandler } from "react";
import RegularButton from "./RegularButton";

type FormProps = {
  handleSubmit: FormEventHandler<HTMLFormElement>;
};
export default function Form({ handleSubmit }: FormProps) {
  return (
    <form className='wrapper' onSubmit={handleSubmit}>
      {/* <h2>Select Difficulty level</h2>
      <div>
        <input type='radio' id='easy' name='level' value='easy' />
        <label htmlFor='easy'>Easy</label>
      </div>
      <div>
        <input type='radio' id='medium' name='level' value='medium' />
        <label htmlFor='medium'>Medium</label>
      </div>
      <div>
        <input type='radio' id='hard' name='level' value='hard' />
        <label htmlFor='hard'>Hard</label>
      </div> */}
      <RegularButton>Start Game</RegularButton>
    </form>
  );
}
