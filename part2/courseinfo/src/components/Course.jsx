const Header = ({name}) => <h1>{name}</h1>

const Content = ({parts}) => {
  const total = parts.reduce((s, p) =>  {
    return s + p.exercises
  }, 0)

  return (
    <div>
      {parts.map(part => 
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      )}
      <p><b>total of {total}</b></p>
    </div>
  )
}

const Part = ({name, exercises}) => {
  return (
    <p>{name} {exercises}</p>
  )
}

const Course = ({course}) => {
  const {name, parts} = course

  return (
    <div>
      <Header name={name}/>
      <Content  parts={parts}/>
    </div>
  )
}

export default Course