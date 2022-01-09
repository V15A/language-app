import WordList from "../word";

export default function User() {
  return (
    <div className="App">
      <h1>User view</h1>
      <WordList user="user" tag="animal" />
    </div>
  );
}
