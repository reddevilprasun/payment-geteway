import Link from "next/link";

const products = [
  { id: 1, name: "iPhone 15", price: 999 },
  { id: 2, name: "Samsung Galaxy S24", price: 899 },
  { id: 3, name: "OnePlus 12", price: 799 },
];

export default function Products() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Products</h1>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            <Link href={`/products/${p.id}`}>
              {p.name} - ${p.price}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
