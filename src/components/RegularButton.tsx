import {  MouseEventHandler } from "react";

type RegularButtonProps = {
  children: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>
} 

export default function RegularButton({ children, handleClick } : RegularButtonProps) {
  return (
      <button
          className="btn btn--text"
          onClick={handleClick}
          type="submit"
      >
          {children}
      </button>
  )
}