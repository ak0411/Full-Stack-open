import { CoursePart } from "../types";

const Part = ({ part }: { part: CoursePart }) => {

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  switch (part.kind) {
    case "basic":
      return (
        <p>
          <div><b>{part.name} {part.exerciseCount}</b></div>
          <div><i>{part.description}</i></div>
        </p>
      );
    case "group":
      return (
        <p>
          <div><b>{part.name} {part.exerciseCount}</b></div>
          <div>group projects: {part.groupProjectCount}</div>
        </p>
      );
    case "background":
      return (
        <p>
          <div><b>{part.name} {part.exerciseCount}</b></div>
          <div><i>{part.description}</i></div>
          <div>material: {part.backgroundMaterial}</div>
        </p>
      );
    case "special":
      return (
        <p>
          <div><b>{part.name} {part.exerciseCount}</b></div>
          <div><i>{part.description}</i></div>
          <div>required skills: {part.requirements.join(', ')}</div>
        </p>
      );
    default:
      return assertNever(part);
  }
};

export default Part;