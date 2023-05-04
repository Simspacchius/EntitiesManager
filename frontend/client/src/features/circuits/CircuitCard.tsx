import { Circuit } from "../../app/models/circuit";

interface Props {
    circuit: Circuit;
}

export default function CircuitCard({ circuit }: Props) {

  return (
    <div className="em-card">
      <div className="em-card-header">Circuit Info</div>
      <div className="em-card-field">
        <b>Name</b>: {circuit.name}
      </div>
      <div className="em-card-field">
        <b>Installation Date</b>: {new Date(circuit.installation_date).toLocaleDateString()}
      </div>
      <div className="em-card-field">
        <b>Created At</b>: {new Date(circuit.created_at).toLocaleDateString()}
      </div>
      <div className="em-card-field">
        <b>Updated At</b>: {new Date(circuit.updated_at).toLocaleDateString()}
      </div>
    </div>
  );
}
