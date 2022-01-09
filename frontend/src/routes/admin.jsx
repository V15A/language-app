import WordList from "../word";
import AddWord from "../addWord";

export default function Admin() {
  return (
    <div className="App">
      <h1>Admin view</h1>
      <AddWord />
      <WordList user="admin" tag="animal" />
    </div>
  );
}
