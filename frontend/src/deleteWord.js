async function DeleteWord(id) {
  try {
    let res = await fetch(`http://localhost:3050/words/delete/${id}`, {
      method: "DELETE",
    });
    console.log(res.status);
  } catch (err) {
    console.log(err.message);
  }
}

export default DeleteWord;
