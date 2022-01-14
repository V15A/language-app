/**
 * A component for deleting wordpairs from database.
 *
 * props.update function should update parent component.
 * props.id is the id of the word pair to delete.
 *
 * @param {*} props requires id and update funtion trough props.
 */
async function DeleteWord(props) {
  try {
    let res = await fetch(`/words/delete/${props.id}`, {
      method: "DELETE",
    });
    console.log(res.status);
    props.update();
  } catch (err) {
    console.log(err.message);
  }
}

export default DeleteWord;
