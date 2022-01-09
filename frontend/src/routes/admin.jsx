import WordList from "../word";
import AddWord from "../addWord";

export default function Admin() {
  return (
    <div>
      <AddWord />
      <WordList user="admin" tag="animal" />
    </div>
  );
}
