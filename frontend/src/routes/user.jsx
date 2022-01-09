import WordList from "../word";

export default function User(data) {
  return (
    <div>
      <WordList {...data} />
    </div>
  );
}
