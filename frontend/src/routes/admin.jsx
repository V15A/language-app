import WordList from "../word";
import AddWord from "../addWord";

export default function Admin(data) {
  return (
    <div>
      <AddWord />
      <WordList {...data} />
    </div>
  );
}
