export default async function Todos(props: any) {
  const res = await fetch(`http://127.0.0.1:9999/todos/${props.params.id}`).then(resp=>resp.json())

  return (
    <>
      <p>id:{res.id}</p>
      <p>content:{res.content}</p>
      <p>completed:{res.completed ? 'done!' : 'yet!'}</p>
    </>
  );
}
