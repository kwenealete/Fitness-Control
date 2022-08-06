import UpdateMeasurement from '../components/UpdateMeasurement';

export default function UpdatePage({ query }) {
  console.log(query);
  return (
    <div>
      <UpdateMeasurement id={query.id} />
    </div>
  );
}