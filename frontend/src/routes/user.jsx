import WordList from "../word";

export default function Admin(data) {
  return (
    <div>
      <WordList {...data} />
    </div>
  );
}
