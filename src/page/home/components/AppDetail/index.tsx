import { Link,useParams } from "react-router-dom";

export function AppDetailPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="container mx-auto p-4">
      <Link to="/" className="inline-block mb-4 text-blue-600 hover:underline">
        ← ホームに戻る
      </Link>
      <p>このページのid:{id}</p>
    </div>
  );
}
