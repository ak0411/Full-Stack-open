import { CoursePart } from "../types";

const Part = ({ part }: { part: CoursePart }) => {

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  const style = {
    marginBottom: 10
  };

  switch (part.kind) {
    case "basic":
      return (
        <div style={style}>
          <div><b>{part.name} {part.exerciseCount}</b></div>
          <div><i>{part.description}</i></div>
        </div>
      );
    case "group":
      return (
        <div style={style}>
          <div><b>{part.name} {part.exerciseCount}</b></div>
          <div>group projects: {part.groupProjectCount}</div>
        </div>
      );
    case "background":
      return (
        <div style={style}>
          <div><b>{part.name} {part.exerciseCount}</b></div>
          <div><i>{part.description}</i></div>
          <div>material: {part.backgroundMaterial}</div>
        </div>
      );
    case "special":
      return (
        <div style={style}>
          <div><b>{part.name} {part.exerciseCount}</b></div>
          <div><i>{part.description}</i></div>
          <div>required skills: {part.requirements.join(', ')}</div>
        </div>
      );
    default:
      return assertNever(part);
  }
};

export default Part;