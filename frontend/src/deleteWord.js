async function DeleteWord(props) {
  try {
    let res = await fetch(`http://localhost:3050/words/delete/${props.id}`, {
      method: "DELETE",
    });
    console.log(res.status);
    props.update();
  } catch (err) {
    console.log(err.message);
  }
}

export default DeleteWord;
